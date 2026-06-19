#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
NODE_VERSION=$(cat "$PROJECT_ROOT/.nvmrc")

echo "Bootstrap nvm"
echo "Required Node version: $NODE_VERSION"

export NVM_DIR="$HOME/.nvm"

if [ ! -s "$NVM_DIR/nvm.sh" ]
    then
        echo "Installing NVM..."

        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
    else 
        echo "NVM already installed"
fi
        
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

if ! nvm ls "$NODE_VERSION" | grep -q "v$NODE_VERSION" 
    then
        echo "Installing Node $NODE_VERSION..."
        nvm install "$NODE_VERSION"
fi

CURRENT_NODE_VERSION=$(nvm current || echo "none")
TARGET_NODE_VERSION="v${NODE_VERSION}"
if [[ "$CURRENT_NODE_VERSION" != "$TARGET_NODE_VERSION" ]] 
    then
        echo "Switch Node version"
        nvm use "$NODE_VERSION"
        nvm alias default "$NODE_VERSION"
        echo "$CURRENT_NODE_VERSION => $TARGET_NODE_VERSION"
fi

printf "Node version: %s\n" $(node -v)
printf "NPM version: %s\n" $(npm -v)