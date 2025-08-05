#!/bin/bash

echo "🚀 Quick Setup for Awesome Remote Teams Expectations"
echo "===================================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📄 Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  Please edit .env.local with your credentials:"
    echo "   - Clerk keys"
    echo "   - Database URL"
    echo "   - ngrok authtoken"
    echo ""
    echo "Then run this script again."
    exit 0
fi

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps || exit 1
echo "✅ Dependencies installed"
echo ""

echo "🧪 Installing Playwright..."
npm install -D @playwright/test --legacy-peer-deps || exit 1
npx playwright install --with-deps || exit 1
echo "✅ Playwright installed"
echo ""

echo "🗄️  Setting up database..."
npm run db:generate || exit 1
npm run db:push || exit 1
echo "✅ Database configured"
echo ""

# Check if running in WSL
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo "🐧 Detected WSL environment"
    if [ ! -f /usr/local/bin/ngrok ]; then
        echo "📥 Installing ngrok for WSL..."
        ./scripts/setup-ngrok-wsl.sh || exit 1
    fi
fi

echo "🔧 Configuring ngrok..."
./scripts/setup-ngrok-from-env.sh || exit 1
echo "✅ ngrok configured"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start dev server: make dev"
echo "2. Start ngrok:      make dev-tunnel"
echo "3. Configure webhook in Clerk Dashboard"
echo "4. Run tests:        make test"
echo ""
echo "See docs/setup/complete-setup-guide.md for detailed instructions."