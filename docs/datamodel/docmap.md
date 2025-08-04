# Data Model Documentation Map

## Overview
This document maps all data model documentation for the Remote Teams Expectations platform.

## Architecture Documentation

### Data Architecture
- **Location**: `/docs/datamodel/architecture.md`
- **Contents**:
  - Entity Relationship Diagram
  - JSON Schema definitions
  - Data integrity rules
  - Index strategy

### Entity Documentation
- **Location**: `/docs/datamodel/entities.md`
- **Contents**:
  - Core entity definitions
  - Business constraints
  - Current vs production schema

## Core Data Models

### User Model
- **Current Implementation**: `/lib/types.ts`
- **Production Schema**: See `/docs/datamodel/architecture.md`
- **Fields**:
  - `id`: UUID identifier
  - `email`: Unique email (production)
  - `name`: Display name
  - `avatarUrl`: Profile image
  - `createdAt`: Creation timestamp
  - `updatedAt`: Last modified

### Expectation Model
- **Current Implementation**: `/lib/types.ts`
- **Production Schema**: See `/docs/datamodel/architecture.md`
- **Fields**:
  - `id`: UUID identifier
  - `userId`: User reference
  - `title`: Task description
  - `createdAt`: Creation timestamp
  - `estimatedCompletion`: Expected completion
  - `isDone`: Completion status
  - `doneAt`: Actual completion
  - `updatedAt`: Last modified

## Data Relationships

### User-Expectation Relationship
- **Type**: One-to-Many
- **Constraint**: One active expectation per user
- **Foreign Key**: `expectations.userId -> users.id`
- **Cascade**: Soft delete on user removal

## Data Access Patterns

### Query Patterns
- Active expectations view
- Team dashboard aggregation
- History timeline
- User-specific queries

### Performance Optimization
- Composite indexes for common queries
- Prepared statements via ORM
- Connection pooling
- Query result caching

## Data Validation

### Schema Validation
- **Library**: Zod
- **Location**: Inline with Server Actions
- **Integration**: Form validation

### Business Rules
- Future completion dates only
- Single active expectation
- Ownership validation
- Timestamp consistency

## Current Implementation

### Mock Data
- **Types**: `/lib/types.ts`
- **Data**: `/lib/data.ts`
- **Limitations**: No persistence

### Migration Path
- Drizzle ORM schemas
- Database migrations
- Data seeding scripts
- Backward compatibility

## IgnoreFormat
<!-- DO NOT MODIFY THIS SECTION -->