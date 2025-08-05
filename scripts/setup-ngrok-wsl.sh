#!/bin/bash

echo "Setting up ngrok for WSL..."

# Check if ngrok is already installed in WSL
if command -v /usr/local/bin/ngrok &> /dev/null; then
    echo "✅ ngrok is already installed in WSL"
    exit 0
fi

# Download ngrok for Linux
echo "Downloading ngrok for Linux..."
wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# Extract
echo "Extracting ngrok..."
tar xzf ngrok-v3-stable-linux-amd64.tgz

# Move to /usr/local/bin
echo "Installing ngrok..."
sudo mv ngrok /usr/local/bin/

# Clean up
rm ngrok-v3-stable-linux-amd64.tgz

# Verify installation
if command -v ngrok &> /dev/null; then
    echo "✅ ngrok installed successfully!"
    ngrok version
else
    echo "❌ Installation failed"
    exit 1
fi