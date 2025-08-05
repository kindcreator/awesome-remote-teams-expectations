#!/bin/bash

echo "Setting up ngrok authentication..."
echo "=================================="

# Check if authtoken is provided as argument
if [ -z "$1" ]; then
    echo "Usage: ./scripts/setup-ngrok-auth.sh YOUR_AUTHTOKEN"
    echo ""
    echo "Get your authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken"
    exit 1
fi

AUTHTOKEN=$1

# Find the correct ngrok command
if [ -f /usr/local/bin/ngrok ]; then
    NGROK_CMD="/usr/local/bin/ngrok"
elif command -v ngrok &> /dev/null; then
    NGROK_CMD="ngrok"
else
    echo "❌ ngrok is not installed"
    exit 1
fi

# Configure authtoken
echo "Configuring ngrok authtoken..."
$NGROK_CMD config add-authtoken $AUTHTOKEN

if [ $? -eq 0 ]; then
    echo "✅ ngrok authtoken configured successfully!"
    echo ""
    echo "Configuration saved to: ~/.config/ngrok/ngrok.yml"
    echo "You can now use: make dev-tunnel"
else
    echo "❌ Failed to configure authtoken"
    exit 1
fi