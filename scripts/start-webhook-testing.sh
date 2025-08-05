#!/bin/bash

echo "Starting Clerk Webhook Local Testing Environment"
echo "================================================"

# Check if we're in WSL
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo "Detected WSL environment"
    
    # Check for Linux ngrok
    if command -v /usr/local/bin/ngrok &> /dev/null; then
        NGROK_CMD="/usr/local/bin/ngrok"
        echo "✅ ngrok is installed (Linux version)"
    elif [ -f /usr/local/bin/ngrok ]; then
        NGROK_CMD="/usr/local/bin/ngrok"
        echo "✅ ngrok is installed (Linux version)"
    else
        echo "❌ ngrok (Linux version) is not installed in WSL"
        echo ""
        echo "To install ngrok for WSL, run:"
        echo "  ./scripts/setup-ngrok-wsl.sh"
        echo ""
        echo "Or install manually:"
        echo "  wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz"
        echo "  tar xzf ngrok-v3-stable-linux-amd64.tgz"
        echo "  sudo mv ngrok /usr/local/bin/"
        exit 1
    fi
else
    # Regular Linux/Mac
    if ! command -v ngrok &> /dev/null; then
        echo "❌ ngrok is not installed. Please install it first."
        exit 1
    fi
    NGROK_CMD="ngrok"
    echo "✅ ngrok is installed"
fi

echo ""

# Check if NGROK_AUTHTOKEN is set in environment
if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "Using NGROK_AUTHTOKEN from environment"
    export NGROK_AUTHTOKEN
elif [ -f .env.local ]; then
    # Try to load from .env.local
    NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env.local | cut -d '=' -f2-)
    if [ -n "$NGROK_TOKEN" ] && [ "$NGROK_TOKEN" != "your_ngrok_authtoken_here" ]; then
        echo "Using NGROK_AUTHTOKEN from .env.local"
        export NGROK_AUTHTOKEN=$NGROK_TOKEN
    fi
fi

echo "Starting ngrok tunnel on port 3000..."
echo ""
echo "IMPORTANT: Once ngrok starts:"
echo "1. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)"
echo "2. Add '/api/webhooks/clerk' to create your webhook URL"
echo "3. Use this URL in Clerk Dashboard when creating the webhook"
echo ""
echo "Press Ctrl+C to stop the tunnel"
echo "================================================"

# Start ngrok
$NGROK_CMD http 3000