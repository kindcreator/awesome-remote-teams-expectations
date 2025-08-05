#!/bin/bash

echo "Setting up ngrok from .env.local..."
echo "===================================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found"
    echo "Please create it from .env.local.example"
    exit 1
fi

# Extract NGROK_AUTHTOKEN from .env.local
NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env.local | cut -d '=' -f2-)

if [ -z "$NGROK_TOKEN" ] || [ "$NGROK_TOKEN" = "your_ngrok_authtoken_here" ]; then
    echo "❌ NGROK_AUTHTOKEN not set in .env.local"
    echo ""
    echo "Please add your ngrok authtoken to .env.local:"
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
echo "Configuring ngrok with token from .env.local..."
$NGROK_CMD config add-authtoken $NGROK_TOKEN

if [ $? -eq 0 ]; then
    echo "✅ ngrok configured successfully!"
    echo ""
    echo "You can now use: make dev-tunnel"
else
    echo "❌ Failed to configure ngrok"
    exit 1
fi