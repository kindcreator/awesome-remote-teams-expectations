#!/bin/bash
set -euo pipefail

echo "🎭 Installing Playwright Dependencies for WSL"
echo "============================================"
echo ""

# Ensure WSL environment
if ! grep -qi microsoft /proc/version; then
    echo "This script should be run in a WSL environment only."
    exit 1
fi

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "Please run this script without sudo. It will prompt for password when needed."
   exit 1
fi

# Kill any hanging apt processes if they exist
echo "Checking for stuck apt processes..."
if pgrep -x apt-get > /dev/null || pgrep -x dpkg > /dev/null; then
    echo "Found stuck apt processes. Please run:"
    echo "  sudo pkill -9 apt-get"
    echo "  sudo pkill -9 dpkg"
    echo "  sudo rm -f /var/lib/dpkg/lock-frontend"
    echo "  sudo rm -f /var/lib/apt/lists/lock"
    echo ""
    echo "Then re-run this script."
    exit 1
fi

# Essential dependencies for Playwright browsers
echo "Installing essential browser dependencies..."
sudo apt-get update && sudo apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libx11-6 \
    libxcb1 \
    libxext6

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Browser dependencies installed successfully!"
    echo ""
    echo "Now installing Playwright browsers..."
    npx playwright install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Playwright setup complete!"
        echo "You can now run 'make test-tdd' or any other Playwright tests."
    else
        echo "❌ Failed to install Playwright browsers"
        exit 1
    fi
else
    echo ""
    echo "❌ Failed to install system dependencies"
    echo "Please check the error messages above."
    exit 1
fi