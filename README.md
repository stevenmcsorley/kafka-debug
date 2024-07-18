# Kafka WebSocket Demo

This project demonstrates a simple Kafka setup with WebSocket communication using Docker. The setup includes Zookeeper, Kafka, a simple web application, and `kafkacat` for message consumption.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for running the web application locally, if necessary)

## Running the Project

1. **Clone the Repository**  
   Clone this repository to your local machine to get started.

2. **Start the Services**  
   Navigate to the project directory and start all services using Docker Compose:

   ```bash
   docker-compose up -d
   ```

This command will start all the services defined in your `docker-compose.yml`, including Kafka, Zookeeper, the web application, and kafkacat.

## Access the Web Application

Open your web browser and go to `http://localhost:8080` to access the web application. This interface allows you to send messages to the Kafka topic via a WebSocket connection.

## Sending Messages

Use the web interface to send messages. These messages will be produced to the Kafka topic and can be viewed in real-time.

## Consuming Messages with kafkacat

To see the messages being consumed from the Kafka topic, you can use the following `kafkacat` command:

```bash
docker exec -it kafka-websocket-demo-kafkacat-1 kafkacat -b kafka:9092 -t test -C
```

This command executes kafkacat within the kafkacat Docker container, connecting to the Kafka broker and consuming messages from the test topic.

## Checking Logs

Kafka Logs: To view the logs of the Kafka service, you can use the following Docker command:

```bash
docker logs kafka-websocket-demo-kafka-1
```

### Web Application Logs: To check the logs of the web application to see the output of produced and consumed messages:

```bash
docker logs kafka-websocket-demo-webapp-1
```
