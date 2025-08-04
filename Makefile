# Makefile for awesome-remote-teams-expectations

# Database commands
db-generate:
	npm run db:generate

db-push:
	npm run db:push

db-migrate:
	npm run db:migrate

db-studio:
	npm run db:studio

# Combined database update command
db-update: db-generate db-push
	@echo "Database schema updated successfully!"

# Development
dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

# Install dependencies
install:
	npm install --legacy-peer-deps

# Help command
help:
	@echo "Available commands:"
	@echo "  make db-generate  - Generate Drizzle migrations"
	@echo "  make db-push      - Push schema changes to database"
	@echo "  make db-update    - Generate and push schema changes (combines above)"
	@echo "  make db-migrate   - Run migrations"
	@echo "  make db-studio    - Open Drizzle Studio"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run linter"
	@echo "  make install      - Install dependencies"

.PHONY: db-generate db-push db-migrate db-studio db-update dev build lint install help