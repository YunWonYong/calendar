#!/bin/bash

set -e

echo "Starting Frontend..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$SCRIPT_DIR/.."

# nvm/node 확인
$SCRIPT_DIR/bootstrap-nvm.sh

export NVM_DIR="$HOME/.nvm"

if [ ! -s "$NVM_DIR/nvm.sh" ]
    then
        echo "NVM not found..."
        exit 1
    else 
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi
        
trap "echo 'Stopping frontend...'; pkill -f webpack" EXIT

echo "node modules install."
npm ci

exec npm run start:local