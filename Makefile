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

dev-tunnel:
	@echo "Starting ngrok tunnel..."
	@ngrok http 3000

build:
	npm run build

lint:
	npm run lint

# Install dependencies
install:
	npm install --legacy-peer-deps

# Testing Commands
test:
	npx playwright test

test-ui:
	npx playwright test --ui

test-debug:
	npx playwright test --debug

test-headed:
	npx playwright test --headed

test-api:
	npx playwright test tests/api/

test-e2e:
	npx playwright test tests/e2e/

test-watch:
	npx playwright test --ui

test-report:
	npx playwright show-report

test-codegen:
	npx playwright codegen

test-update-snapshots:
	npx playwright test --update-snapshots

# Fast feedback testing (single browser, headless)
test-fast:
	npx playwright test --project=chromium

# CI testing (all browsers, with retries)
test-ci:
	CI=true npx playwright test

# TDD workflow - run specific test file in UI mode
test-tdd:
	npx playwright test $(FILE) --ui

# Install Playwright as dev dependency
playwright-setup:
	npm install -D @playwright/test --legacy-peer-deps

# Install Playwright with all browsers
playwright-install:
	npx playwright install --with-deps

# Install Playwright (browsers only, no system deps)
playwright-install-browsers:
	npx playwright install

# Install ngrok for WSL
ngrok-setup-wsl:
	./scripts/setup-ngrok-wsl.sh

# Configure ngrok authentication
ngrok-auth:
	@echo "Usage: make ngrok-auth TOKEN=your_authtoken_here"
	@[ "${TOKEN}" ] || ( echo "Error: TOKEN is not set"; exit 1 )
	./scripts/setup-ngrok-auth.sh ${TOKEN}

# Configure ngrok from .env.local
ngrok-setup:
	./scripts/setup-ngrok-from-env.sh

# Clean test artifacts
test-clean:
	rm -rf test-results/ playwright-report/ blob-report/

# Run tests and open report
test-and-report: test test-report

# Lint and typecheck
check:
	npm run lint
	npm run typecheck || echo "No typecheck script found"

# Full validation (lint, build, test)
validate: lint build test

# Help command
help:
	@echo "Available commands:"
	@echo ""
	@echo "Database:"
	@echo "  make db-generate  - Generate Drizzle migrations"
	@echo "  make db-push      - Push schema changes to database"
	@echo "  make db-update    - Generate and push schema changes (combines above)"
	@echo "  make db-migrate   - Run migrations"
	@echo "  make db-studio    - Open Drizzle Studio"
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development server"
	@echo "  make dev-tunnel   - Start ngrok tunnel for webhook testing"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run linter"
	@echo "  make install      - Install dependencies"
	@echo "  make check        - Run lint and typecheck"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Run all tests"
	@echo "  make test-ui      - Run tests with interactive UI"
	@echo "  make test-debug   - Run tests in debug mode"
	@echo "  make test-headed  - Run tests with visible browser"
	@echo "  make test-api     - Run API tests only"
	@echo "  make test-e2e     - Run E2E tests only"
	@echo "  make test-watch   - Run tests in UI mode"
	@echo "  make test-fast    - Fast feedback (Chrome only, headless)"
	@echo "  make test-ci      - CI mode (all browsers, with retries)"
	@echo "  make test-tdd FILE=path/to/test.spec.ts - TDD mode for specific file"
	@echo "  make test-report  - Show last test report"
	@echo "  make test-codegen - Open Playwright codegen"
	@echo "  make test-clean   - Clean test artifacts"
	@echo "  make test-and-report - Run tests and open report"
	@echo ""
	@echo "Setup:"
	@echo "  make playwright-setup - Install @playwright/test dependency"
	@echo "  make playwright-install - Install Playwright with system dependencies"
	@echo "  make playwright-install-browsers - Install browsers only"
	@echo "  make ngrok-setup-wsl - Install ngrok for WSL (Linux version)"
	@echo ""
	@echo "Validation:"
	@echo "  make validate     - Full validation (lint, build, test)"

.PHONY: db-generate db-push db-migrate db-studio db-update dev dev-tunnel build lint install help \
        test test-ui test-debug test-headed test-api test-e2e test-watch test-report \
        test-codegen test-update-snapshots test-fast test-ci test-tdd \
        playwright-setup playwright-install playwright-install-browsers test-clean test-and-report \
        check validate