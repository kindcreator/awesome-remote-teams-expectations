# Deployment Overview

## Deployment Architecture

### Production Platform
- **Infrastructure**: Hostinger VPS
- **Platform**: Coolify (self-hosted PaaS)
- **Repository**: https://github.com/kindcreator/awesome-remote-teams-expectations
- **Integration**: GitHub webhook for automatic deployments

### Deployment Documentation
- **Coolify Setup**: See `/docs/devops/coolify-deployment.md`
- **Infrastructure**: See `/docs/backend/infrastructure-blueprint.md`

## Development Environment

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Git

### Local Setup
```bash
# Clone repository
git clone https://github.com/kindcreator/awesome-remote-teams-expectations.git

# Install dependencies
pnpm install

# Create .env.local for development
cp .env.example .env.local

# Run development server
pnpm dev

# Build production
pnpm build

# Run production build locally
pnpm start
```

### Environment Variables
Development (`.env.local`):
```env
# Database
DATABASE_URL=postgresql://localhost:5432/expectations_dev

# Authentication (development keys)
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase (development project)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbG...
```

## Deployment Flow

### Continuous Deployment
1. **Development**: Work on feature branches
2. **Pull Request**: Create PR to main
3. **Review**: Code review and testing
4. **Merge**: Merge to main branch
5. **Deploy**: Automatic deployment via Coolify webhook

### Manual Deployment
Access Coolify dashboard for:
- Manual deployments
- Rollbacks
- Environment variable updates
- Log viewing

## Infrastructure Components

### Application Hosting
- Hostinger VPS with Coolify
- Docker containerization via Nixpacks
- Traefik reverse proxy
- SSL via Let's Encrypt (automatic)

### External Services
- **Database**: Supabase PostgreSQL
- **Authentication**: Clerk
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

## Monitoring & Maintenance

### Application Monitoring
- Health check endpoint: `/api/health`
- Container logs via Coolify
- Resource usage dashboards

### Backup Strategy
- Database backups (Supabase)
- Code repository (GitHub)
- Environment secrets (Coolify)