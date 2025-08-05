# Step-by-Step Guide: Creating Clerk Webhook Endpoint

## Prerequisites
- Access to your Clerk Dashboard
- Your application deployed or using a tunnel service (like ngrok) for local development

## Steps to Create Webhook

### 1. Click "Add Endpoint"
In the Clerk Dashboard Webhooks page (where you are now), click the **"Add Endpoint"** button in the top right corner.

### 2. Configure Endpoint URL
In the dialog that appears, enter your webhook endpoint URL:

**For Production:**
```
https://your-domain.com/api/webhooks/clerk
```

**For Local Development (using ngrok):**
```
https://your-ngrok-id.ngrok.io/api/webhooks/clerk
```

### 3. Select Events to Subscribe
After entering the URL, you'll see a list of available events. Select these two events:
- ✅ **user.created** - Triggered when a new user signs up
- ✅ **user.updated** - Triggered when user profile is updated

### 4. Create the Endpoint
Click **"Create"** or **"Add Endpoint"** button to save.

### 5. Copy the Signing Secret
After creation, Clerk will show you the webhook signing secret. It will look like:
```
whsec_1234567890abcdef...
```

**Important:** Copy this secret immediately - you won't be able to see it again!

### 6. Add Secret to Your Application
Add the webhook secret to your `.env.local` file:
```env
CLERK_WEBHOOK_SECRET=whsec_your_actual_secret_here
```

## Testing the Webhook

### Local Development Testing with ngrok

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   ```

2. **Start your Next.js development server**:
   ```bash
   npm run dev
   ```

3. **Start ngrok tunnel**:
   ```bash
   ngrok http 3000
   ```

4. **Use the ngrok URL** for your webhook endpoint in Clerk

### Verify Webhook is Working

1. **Sign up a new user** in your application
2. **Check the webhook logs** in Clerk Dashboard:
   - Go to the Webhooks page
   - Click on your endpoint
   - View the "Activity" tab to see webhook deliveries

3. **Check your database** to verify the user was created:
   ```bash
   make db-studio
   ```
   Then check the `users` table

## Troubleshooting

### Common Issues

1. **Webhook endpoint returns 404**
   - Ensure your URL is correct: `/api/webhooks/clerk`
   - Check that the webhook route file exists at `app/api/webhooks/clerk/route.ts`

2. **Webhook returns 400 "Invalid webhook signature"**
   - Verify `CLERK_WEBHOOK_SECRET` is set correctly in `.env.local`
   - Ensure the secret matches exactly (no extra spaces)
   - Restart your development server after updating `.env.local`

3. **Webhook returns 500 error**
   - Check server logs for specific error messages
   - Verify database connection is working
   - Ensure `svix` package is installed

### Testing with Clerk's Test Feature

Once your endpoint is created, you can test it:
1. Click on your endpoint in the list
2. Go to the "Testing" tab
3. Select an event type (e.g., `user.created`)
4. Click "Send test webhook"
5. Check the response and logs

## Next Steps

After successful webhook setup:
1. Test user registration flow
2. Verify users are synced to database
3. Test authentication on protected routes
4. Run Playwright tests: `make test`