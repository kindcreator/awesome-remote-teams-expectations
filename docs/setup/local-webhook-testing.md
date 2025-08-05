# Local Webhook Testing with ngrok

## Setup Instructions

### 1. Start Your Development Environment

Open **two terminal windows**:

**Terminal 1 - Start Next.js:**
```bash
make dev
```

**Terminal 2 - Start ngrok tunnel:**
```bash
make dev-tunnel
```

### 2. Get Your ngrok URL

When ngrok starts, you'll see output like:
```
Session Status                online
Account                       your-email@example.com
Version                       3.5.0
Region                        United States (us)
Latency                       32ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:3000
```

Copy the HTTPS URL: `https://abc123def456.ngrok.io`

### 3. Create Webhook in Clerk Dashboard

1. Go to Clerk Dashboard > Webhooks
2. Click "Add Endpoint"
3. Enter your webhook URL: `https://abc123def456.ngrok.io/api/webhooks/clerk`
4. Select events:
   - ✅ user.created
   - ✅ user.updated
5. Click "Create"
6. **Copy the webhook secret** (starts with `whsec_`)

### 4. Configure Environment

Add the webhook secret to `.env.local`:
```env
CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

**Important:** Restart your Next.js server (Ctrl+C and `make dev` again) after updating `.env.local`

### 5. Test the Webhook

#### Option A: Manual Testing
1. Open your app at `http://localhost:3000`
2. Sign out if already logged in
3. Click "Sign Up" and create a new account
4. Check Clerk Dashboard > Webhooks > Your Endpoint > Activity tab
5. Verify the webhook was received (should show 200 status)

#### Option B: Use Clerk's Test Feature
1. In Clerk Dashboard, click on your webhook endpoint
2. Go to "Testing" tab
3. Select "user.created" event
4. Click "Send test webhook"
5. Check the response

### 6. Verify Database Sync

Check if the user was created in your database:
```bash
make db-studio
```
Look for the new user in the `users` table.

## Monitoring Webhook Activity

### ngrok Web Interface
Open `http://127.0.0.1:4040` in your browser to see:
- All incoming webhook requests
- Request/response details
- Replay functionality

### Application Logs
Check your Next.js terminal for any error messages.

## Troubleshooting

### Common Issues

1. **404 Error on Webhook**
   - Ensure URL ends with `/api/webhooks/clerk`
   - Check that Next.js is running
   - Verify ngrok is forwarding to port 3000

2. **400 "Invalid webhook signature"**
   - Double-check `CLERK_WEBHOOK_SECRET` in `.env.local`
   - Ensure no extra spaces in the secret
   - Restart Next.js after updating env vars

3. **500 Error**
   - Check Next.js console for error details
   - Verify database is running: `make db-studio`
   - Ensure all dependencies are installed

4. **ngrok Session Expired**
   - Free ngrok sessions expire after 2 hours
   - Restart ngrok: `make dev-tunnel`
   - Update webhook URL in Clerk with new ngrok URL

## Best Practices

1. **Keep ngrok Running**: Don't close the ngrok terminal while testing
2. **Check Both Logs**: Monitor both Next.js and ngrok terminals
3. **Use ngrok Inspector**: The web interface at `http://127.0.0.1:4040` is very helpful
4. **Test Edge Cases**: Try updating user profile, invalid data, etc.

## CI/CD Testing Strategy

For production and CI/CD:
1. **Staging Environment**: Deploy to a staging URL and test webhooks there
2. **E2E Tests**: Use Playwright tests that mock webhook responses
3. **GitHub Actions**: Set up webhook testing in CI pipeline
4. **Monitoring**: Use services like Datadog or Sentry for production webhook monitoring

## Next Steps

After successful local testing:
1. Run full test suite: `make test`
2. Document your webhook URL pattern for team
3. Set up production webhook with your deployed URL
4. Configure monitoring and alerts for webhook failures