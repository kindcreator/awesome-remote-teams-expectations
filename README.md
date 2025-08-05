# Remote Teams Expectations Tracker

A simple, focused tool for remote teams to share what they're working on and when they'll be done.

![Web App Initial Version](preview/web%20app%20init%20version%20.png)

## 🚀 Live Demo

**Check out the POC: [https://tracker.kindsolutions.net/](https://tracker.kindsolutions.net/)**

## What is this?

In remote teams, it's hard to know what everyone is working on. This app solves that with a dead-simple approach:
- Each person sets ONE current expectation
- Shows what they're doing and when they'll finish
- Everyone sees the team's focus at a glance
- Track history of completed work

## POC Status

This is a **Proof of Concept** following the 80/20 rule. Like an artist sketching basic shapes before adding details, this MVP demonstrates the core concept before implementing full features.

**Current state**: Basic UI and mock data only  
**Next steps**: Implement authentication, persistence, and real-time updates based on client feedback

## Development Approach

Following lean startup principles:
1. Build minimal viable version
2. Deploy and get real feedback
3. Shape implementation to actual needs
4. Avoid over-engineering

This approach ensures we build what teams actually need, not what we think they need.

## Tech Stack

- Next.js 15 + React 19
- TypeScript
- Tailwind CSS
- Deployed on Coolify (self-hosted)

## Getting Started

### Quick Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: See **[Setup Guide](./docs/setup/README.md)**
4. Run development server: `npm run dev`

### Setup Guides
- **[Complete Setup Guide](./docs/setup/README.md)** - Step-by-step instructions
- **[Environment Variables](./docs/setup/env-variables.md)** - All configuration options
- **[Testing Setup](./docs/setup/testing.md)** - Run tests without external services

## Documentation

- **Setup**: `/docs/setup/` - Getting started guides
- **Testing**: `/docs/testing/` - Testing strategy and guides
- **Technical**: `/docs/` - Architecture and implementation details