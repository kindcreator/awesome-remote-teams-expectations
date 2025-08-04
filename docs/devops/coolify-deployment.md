# Coolify Deployment Guide

## Overview
This application is deployed on a Hostinger VPS using Coolify as the deployment platform, with automatic deployments triggered by GitHub webhooks.

## Application Configuration

### GitHub Integration
1. **Repository**: https://github.com/kindcreator/awesome-remote-teams-expectations
2. **Integration Method**: Official GitHub App
3. **Webhook**: Automatically configured by Coolify
4. **Branch**: `main` for production

### Build Configuration
```yaml
# Coolify build settings
Build Pack: Nixpacks
Base Directory: /
# Nixpacks auto-detects Next.js and handles build
Port: 3000
Health Check Path: /api/health
```

### Environment Variables
Configure in Coolify dashboard:
```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://...

# Authentication
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_KEY=eyJhbG...
```

## Deployment Process

### Automatic Deployment
1. Push code to `main` branch
2. GitHub webhook triggers Coolify
3. Coolify pulls latest code
4. Builds Docker image
5. Runs health checks
6. Switches traffic to new container
7. Removes old container

### Manual Deployment
```bash
# Via Coolify UI
1. Navigate to application
2. Click "Deploy"
3. Select branch/commit
4. Monitor deployment logs
```

## Build Configuration

### Nixpacks Build Process
Nixpacks automatically:
1. Detects Next.js application
2. Installs correct Node.js version
3. Detects pnpm from lock file
4. Runs `pnpm install`
5. Runs `pnpm build`
6. Creates optimized Docker image
7. Sets start command to `pnpm start`


## SSL & Proxy Configuration

### Traefik Reverse Proxy
Coolify uses Traefik for:
- Automatic SSL certificate management
- Load balancing between containers
- Service discovery
- HTTP to HTTPS redirect

### SSL Configuration
- Let's Encrypt certificates (automatic)
- Auto-renewal handled by Traefik