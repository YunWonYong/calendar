#!/bin/bash

set -e

echo "Starting local docker compose..."

if ! command -v docker &> /dev/null
    then
        echo "not found docker command."
        exit 1
fi

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
WORK_DIR=$(cd "$SCRIPT_DIR/.." && pwd)
ROOT_DIR=$(cd "$WORK_DIR/.." && pwd)

echo "ROOT_DIR: $ROOT_DIR"
echo "WORK_DIR: $WORK_DIR"
echo "SCRIPT_DIR: $SCRIPT_DIR"


COMPOSE_FILE="$WORK_DIR/docker/docker-compose.yml"
echo "docker compose file: $COMPOSE_FILE"

## docker-compose.yml 파일이 없거나 못 찾는 경우 에러 처리.
if [[ ! -f "$COMPOSE_FILE" ]]
then
    echo "not found docker compose file: $COMPOSE_FILE"
    exit 1
fi

check_storage() {
    local SERVICE=$1
    local STORAGE_DIR="$WORK_DIR/storage/$SERVICE"
    if [[ -d "$STORAGE_DIR" ]]
        then
            printf "\t\talready %s\n" "$STORAGE_DIR"
        else
            mkdir -p "$STORAGE_DIR"
            printf "\t\tmake %s\n" "$STORAGE_DIR"
    fi
}

check_container() {
    local SERVICE=$1
    local SERVICE_CONTAINER_ID
    SERVICE_CONTAINER_ID=$(docker compose -f "$COMPOSE_FILE" ps -q "$SERVICE")
    local SERVICE_RUNNING="false"
    if [[ -n "$SERVICE_CONTAINER_ID" ]]
        then 
            SERVICE_RUNNING=$(docker inspect -f '{{.State.Running}}' "$SERVICE_CONTAINER_ID")
    fi

    if [[ "$SERVICE_RUNNING" == "true" ]]
        then
            printf "\t%s is already running.\n" "$SERVICE"
        else
            check_storage "$SERVICE"

        if ! docker compose -f "$COMPOSE_FILE" up -d --wait "$SERVICE"
            then
                printf "\tfailed to start %s!\n" "$SERVICE"
                exit 1
        fi
        printf "\tready %s!\n" "$SERVICE"
    fi
}

check_container postgres 
check_container redis 
echo "All services are ready!"