# Setup Documentation

This directory contains setup guides for the project.

## Service Setup Guides

- **[Clerk](./clerk.md)** - Authentication service setup
- **[Supabase](./supabase.md)** - Database and backend setup
- **[Environment Variables](./env-variables.md)** - Complete env vars reference

## Getting Started

1. **[README](./README.md)** - Complete project setup guide
2. **[Testing Setup](./testing.md)** - How to run tests without real services

## Quick Links

### For New Developers
Start with the [README](./README.md) for step-by-step setup.

### For Testing
Tests work without real services. Just run:
```bash
npm install
npm run test:e2e:ui
```

### For Production Deployment
See deployment guides in `/docs/devops/`