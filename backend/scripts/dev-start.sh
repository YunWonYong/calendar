#!/bin/bash

echo "Starting local docker compose..."

if ! command -v docker &> /dev/null
    then
        echo "not found docker command."
        exit 1
fi

echo "Creating storage directories..."
mkdir -p ../storage/postgres
mkdir -p ../storage/redis

docker compose -f ../docker/docker-compose.yml up -d

echo "ready!"