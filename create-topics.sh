#!/bin/bash
# create-topics.sh

# Wait for Kafka to be ready
echo "Waiting for Kafka to be ready..."
sleep 10

# Create topics
kafka-topics --create --if-not-exists --bootstrap-server kafka:9092 --topic test --partitions 1 --replication-factor 1
