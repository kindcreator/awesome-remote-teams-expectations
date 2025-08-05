#!/bin/bash

echo "🎭 Setting up Playwright for WSL"
echo "================================"
echo ""

# Check for stuck apt processes
if ps aux | grep -E 'apt-get|dpkg' | grep -v grep | grep -v 'apt-get update&& apt-get install' > /dev/null 2>&1; then
    echo "⚠️  Found stuck apt/dpkg processes!"
    echo ""
    echo "Attempting to clean up..."
    sudo pkill -9 apt-get 2>/dev/null || true
    sudo pkill -9 dpkg 2>/dev/null || true
    sudo pkill -9 -f "apt-get update" 2>/dev/null || true
    sudo rm -f /var/lib/dpkg/lock-frontend 2>/dev/null || true
    sudo rm -f /var/lib/apt/lists/lock 2>/dev/null || true
    sudo rm -f /var/cache/apt/archives/lock 2>/dev/null || true
    sudo rm -f /var/lib/dpkg/lock 2>/dev/null || true
    sudo dpkg --configure -a 2>/dev/null || true
    echo "Cleanup attempted. Continuing..."
    echo ""
fi

# Install system dependencies required by Playwright browsers
echo "Installing browser dependencies..."
echo "This will prompt for your sudo password."
echo ""

# Install dependencies as suggested by Playwright
sudo apt-get update
if [ $? -ne 0 ]; then
    echo "❌ Failed to update apt repositories"
    exit 1
fi

sudo apt-get install -y \
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
    libasound2

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Browser dependencies installed"
    echo ""
    
    # Reinstall Playwright browsers to ensure they're properly configured
    echo "Reinstalling Playwright browsers..."
    npx playwright install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Playwright setup complete for WSL!"
        echo ""
        echo "You can now run 'make test-tdd' without issues."
    else
        echo "❌ Failed to install Playwright browsers"
        echo "Try running: npx playwright install --force"
        exit 1
    fi
else
    echo ""
    echo "❌ Failed to install system dependencies"
    echo "This might be due to locked apt processes."
    echo ""
    echo "Try running:"
    echo "  sudo pkill -9 apt-get"
    echo "  sudo pkill -9 dpkg"
    echo "  sudo rm -f /var/lib/dpkg/lock-frontend"
    echo "  sudo rm -f /var/lib/apt/lists/lock"
    echo ""
    echo "Then run this script again."
    exit 1
fi