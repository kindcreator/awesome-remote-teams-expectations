# Complete Setup Guide for Clerk Authentication with Webhooks

## Prerequisites
- Node.js and npm installed
- WSL (if on Windows) or Linux/macOS
- Clerk account (free tier is fine)
- ngrok account for local webhook testing

## Step 1: Environment Configuration

1. **Copy the example environment file**:
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your values**:
   ```env
   # Clerk Authentication (from https://dashboard.clerk.com/apps/YOUR_APP/instances/YOUR_INSTANCE)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
   CLERK_SECRET_KEY=sk_test_your_secret_key
   
   
   # Clerk Webhook Secret (you'll get this after creating the webhook)
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # Supabase Environment Variables
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   
   # Database URL for Drizzle
   DATABASE_URL=
   
   # ngrok Configuration (from https://dashboard.ngrok.com/get-started/your-authtoken)
   NGROK_AUTHTOKEN=your_ngrok_authtoken
   ```

## Step 2: Install Dependencies

```bash
# Install project dependencies
make install

# Install Playwright for testing
make playwright-setup

# For WSL users: Install browser dependencies
make playwright-setup-wsl

# For other systems: Install with system dependencies
make playwright-install
```

## Step 3: Database Setup

```bash
# Generate and push database schema
make db-update
```

## Step 4: ngrok Setup (for Local Development)

### For WSL Users:
1. **Install ngrok Linux version**:
   ```bash
   make ngrok-setup-wsl
   ```

2. **Configure ngrok with your token**:
   ```bash
   make ngrok-setup
   ```

### For macOS/Linux Users:
1. **Install ngrok**:
   ```bash
   # macOS
   brew install ngrok
   
   # Linux
   snap install ngrok
   ```

2. **Configure ngrok**:
   ```bash
   make ngrok-setup
   ```

## Step 5: Create Clerk Webhook

1. **Start your development environment**:
   ```bash
   # Terminal 1: Start Next.js
   make dev
   
   # Terminal 2: Start ngrok tunnel
   make dev-tunnel
   ```

2. **Copy the ngrok HTTPS URL** from the output (e.g., `https://abc123.ngrok.io`)

3. **In Clerk Dashboard**:
   - Go to **Configure → Webhooks**
   - Click **Add Endpoint**
   - Enter URL: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
   - Select events:
     - ✅ `user.created`
     - ✅ `user.updated`
   - Click **Create**
   - **Copy the signing secret** (starts with `whsec_`)

4. **Update `.env`** with the webhook secret:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_your_actual_secret
   ```

5. **Restart your dev server** to load the new environment variable

## Step 6: Test the Integration

### Run Automated Tests
```bash
# Run all tests
make test

# Run specific test types
make test-api    # API webhook tests
make test-e2e    # End-to-end auth tests
```

### Manual Testing
1. **Sign up a new user** in your app
2. **Check webhook delivery** in Clerk Dashboard → Webhooks → Your Endpoint → Activity
3. **Verify database sync**:
   ```bash
   make db-studio
   ```
   Check the `users` table for the new user

## Troubleshooting

### Common Issues

**ngrok authentication error**:
- Ensure `NGROK_AUTHTOKEN` is set in `.env`
- Run `make ngrok-setup` to configure

**Webhook 400 error "Invalid signature"**:
- Verify `CLERK_WEBHOOK_SECRET` matches the one from Clerk Dashboard
- Restart dev server after updating `.env`

**Webhook 404 error**:
- Check URL ends with `/api/webhooks/clerk`
- Ensure Next.js is running on port 3000

**Database connection error**:
- Verify `DATABASE_URL` is correct
- Run `make db-update` to ensure schema is current

**WSL Playwright error "Host system is missing dependencies"**:
- Run `make playwright-setup-wsl` to install browser dependencies
- This requires sudo access to install system packages
- After installation, tests should run without issues

## Production Deployment

When deploying to production:

1. **Set environment variables** in your hosting platform:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `DATABASE_URL`

2. **Update Clerk webhook URL** to your production domain:
   - `https://your-domain.com/api/webhooks/clerk`

3. **Remove ngrok** - it's only for local development

## Quick Reference

```bash
# Development
make dev              # Start Next.js dev server
make dev-tunnel       # Start ngrok tunnel
make db-studio        # Open database GUI

# Testing
make test            # Run all tests
make test-ui         # Run tests with UI
make test-fast       # Fast test run (Chrome only)

# Setup
make install         # Install dependencies
make db-update       # Update database schema
make ngrok-setup     # Configure ngrok from .env
```