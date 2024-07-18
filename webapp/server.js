const WebSocket = require("ws");
const express = require("express");
const { KafkaClient, Producer, Consumer } = require("kafka-node");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const client = new KafkaClient({ kafkaHost: "kafka:9092" });

// Handle client errors
client.on("error", function (err) {
  console.error("Client Error:", err);
});

const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: "test", partition: 0 }], {
  autoCommit: true,
});

// Handle producer errors
producer.on("error", function (err) {
  console.error("Producer Error:", err);
});

// Handle consumer errors and retry logic
consumer.on("error", function (err) {
  console.error("Consumer Error:", err);
  // Retry mechanism to add topic if not found or any error occurs
  setTimeout(() => {
    console.log("Attempting to recover the consumer...");
    consumer.addTopics(
      [{ topic: "test", partition: 0 }],
      function (error, added) {
        if (error) {
          console.error("Error adding topics on recovery:", error);
        } else {
          console.log("Recovered and added topics:", added);
        }
      },
      true
    ); // true to add from the offset if not already subscribed
  }, 5000); // retry after 5 seconds
});

app.use(express.static("public"));

wss.on("connection", function (ws) {
  consumer.on("message", function (message) {
    ws.send(message.value);
  });

  ws.on("message", function (message) {
    producer.send(
      [{ topic: "test", messages: [message] }],
      function (err, data) {
        if (err) {
          console.error("Error producing", err);
        } else {
          console.log("Message produced:", data);
        }
      }
    );
  });
});

server.listen(8080, function () {
  console.log("Server started on http://localhost:8080");
});
