#!/bin/bash

echo "Setting up ngrok from .env..."
echo "===================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "Please create it from .env.example:"
    echo "  cp .env.example .env"
    exit 1
fi

# Extract NGROK_AUTHTOKEN from .env
NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env | cut -d '=' -f2-)

if [ -z "$NGROK_TOKEN" ]; then
    echo "❌ NGROK_AUTHTOKEN not set in .env"
    echo ""
    echo "Please add your ngrok authtoken to .env:"
    echo "NGROK_AUTHTOKEN=your_actual_token_here"
    echo ""
    echo "Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    exit 1
fi

# Find the correct ngrok command
if [ -f /usr/local/bin/ngrok ]; then
    NGROK_CMD="/usr/local/bin/ngrok"
elif command -v ngrok &> /dev/null; then
    NGROK_CMD="ngrok"
else
    echo "❌ ngrok is not installed"
    echo "Run: make ngrok-setup-wsl"
    exit 1
fi

# Configure authtoken
echo "Configuring ngrok with token from .env..."
$NGROK_CMD config add-authtoken $NGROK_TOKEN

if [ $? -eq 0 ]; then
    echo "✅ ngrok configured successfully!"
    echo ""
    echo "You can now use: make dev-tunnel"
else
    echo "❌ Failed to configure ngrok"
    exit 1
fi