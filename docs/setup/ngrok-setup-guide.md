# ngrok Setup Guide

## Initial Setup

### 1. Create ngrok Account
1. Go to https://dashboard.ngrok.com/signup
2. Sign up for a free account
3. Verify your email

### 2. Get Your Authtoken
1. After login, go to: https://dashboard.ngrok.com/get-started/your-authtoken
2. Copy your authtoken (it looks like: `2abc123def456...`)

### 3. Configure ngrok

**Option A: Using .env.local (Recommended for team setup)**
1. Add to your `.env.local`:
   ```env
   NGROK_AUTHTOKEN=your_authtoken_here
   ```
2. Run setup:
   ```bash
   make ngrok-setup
   ```

**Option B: Direct token (Quick setup)**
```bash
make ngrok-auth TOKEN=your_authtoken_here
```

**Option C: Manual ngrok command**
```bash
ngrok config add-authtoken your_authtoken_here
```

### 4. Verify Setup
```bash
make dev-tunnel
```

You should now see ngrok start without authentication errors!

## Configuration File Location

ngrok saves your configuration to:
- Linux/WSL: `~/.config/ngrok/ngrok.yml`
- Windows: `%USERPROFILE%\.ngrok2\ngrok.yml`
- macOS: `~/.ngrok2/ngrok.yml`

## Security Notes

- **Never commit your authtoken** to version control
- The authtoken is saved locally in your ngrok config
- Each developer needs their own ngrok account and authtoken
- Free accounts can run 1 tunnel at a time

## Troubleshooting

### "authentication failed" Error
- Make sure you've run the auth configuration
- Check if the config file exists: `cat ~/.config/ngrok/ngrok.yml`
- Try re-running: `make ngrok-auth TOKEN=your_token`

### Multiple Tunnels
- Free accounts are limited to 1 tunnel
- Close other ngrok sessions before starting a new one
- Check for running ngrok: `ps aux | grep ngrok`

## Next Steps

After ngrok is configured:
1. Start your dev server: `make dev`
2. Start ngrok tunnel: `make dev-tunnel`
3. Copy the HTTPS URL from ngrok output
4. Configure webhook in Clerk Dashboard with the URL