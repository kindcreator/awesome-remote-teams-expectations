# Makefile for awesome-remote-teams-expectations

# Default target - show help when running just 'make'
.DEFAULT_GOAL := help

# Database commands
db-generate:
	npm run db:generate

db-push:
	npm run db:push

db-migrate:
	npm run db:migrate

db-studio:
	npm run db:studio

db-seed:
	npm run db:seed

db-impress:
	npm run db:seed:impress

db-sync:
	npm run db:sync-clerk

# Combined database update command
db-update: db-generate db-push
	@echo "Database schema updated successfully!"

# Database reset with seeding
db-reset:
	npm run db:reset

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

# Testing commands
test:
	npm run test

test-ui:
	npm run test:ui

test-unit:
	npm run test:unit

e2e:
	npm run test:e2e

e2e-ui:
	npm run test:e2e:ui

e2e-debug:
	npm run test:e2e:debug

test-all:
	npm run test:unit && npm run test:e2e

# TDD workflow commands
tdd:
	@echo "Starting TDD mode - Unit tests in watch mode"
	npm run test

tdd-e2e:
	@echo "Starting E2E test UI for TDD"
	npm run test:e2e:ui

# Quick test status
test-list:
	@echo "=== E2E Tests ==="
	@npm run test:e2e -- --list
	@echo ""
	@echo "=== Unit Test Files ==="
	@find . -name "*.test.ts" -o -name "*.test.tsx" | grep -v node_modules | sort

# Help command
help:
	@echo "Available commands:"
	@echo ""
	@echo "📦 Database:"
	@echo "  make db-generate      - Generate Drizzle migrations"
	@echo "  make db-push          - Push schema changes to database"
	@echo "  make db-update        - Generate and push schema changes"
	@echo "  make db-migrate       - Run migrations"
	@echo "  make db-studio        - Open Drizzle Studio"
	@echo "  make db-seed          - Seed database with test data"
	@echo "  make db-impress       - Seed with Yaroslav's team for review"
	@echo "  make db-sync          - Sync users from Clerk to database"
	@echo "  make db-reset         - Reset and seed database"
	@echo ""
	@echo "🚀 Development:"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run linter"
	@echo "  make install      - Install dependencies"
	@echo ""
	@echo "🧪 Testing:"
	@echo "  make test         - Run unit tests in watch mode"
	@echo "  make test-ui      - Run unit tests with UI"
	@echo "  make test-unit    - Run unit tests once"
	@echo "  make e2e          - Run E2E tests headless"
	@echo "  make e2e-ui       - Run E2E tests with UI"
	@echo "  make e2e-debug    - Debug E2E tests"
	@echo "  make test-all     - Run all tests"
	@echo "  make test-list    - List all available tests"
	@echo ""
	@echo "🎯 TDD Workflow:"
	@echo "  make tdd          - Start unit test watch mode"
	@echo "  make tdd-e2e      - Start E2E test UI"

.PHONY: db-generate db-push db-migrate db-studio db-seed db-impress db-sync db-update db-reset dev build lint install test test-ui test-unit e2e e2e-ui e2e-debug test-all tdd tdd-e2e test-list help