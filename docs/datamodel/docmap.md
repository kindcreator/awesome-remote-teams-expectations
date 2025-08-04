# Data Model Documentation Map

## Overview
This document maps all data model documentation for the Remote Teams Expectations platform.

## Core Data Models

### User Model
- **Location**: `/lib/types.ts`
- **Purpose**: Represents team members in the system
- **Fields**:
  - `id`: Unique identifier
  - `name`: Display name
  - `avatarUrl`: Profile image path

### Expectation Model
- **Location**: `/lib/types.ts`
- **Purpose**: Represents work commitments and their completion status
- **Fields**:
  - `id`: Unique identifier
  - `userId`: Reference to User
  - `title`: Task description
  - `createdAt`: ISO 8601 creation timestamp
  - `estimatedCompletion`: ISO 8601 expected completion
  - `isDone`: Completion status
  - `doneAt`: ISO 8601 actual completion (nullable)

## Data Relationships

### User-Expectation Relationship
- **Type**: One-to-Many
- **Implementation**: `userId` foreign key in Expectation model
- **Constraints**: Each expectation belongs to exactly one user

## Mock Data Store
- **Location**: `/lib/data.ts`
- **Purpose**: In-memory data storage for development
- **Contents**:
  - 4 predefined users (user-1 through user-4)
  - Sample expectations demonstrating various states

## Data Flow Patterns

### Data Assembly
- **Location**: `/app/page.tsx`
- **Pattern**: Server-side data enrichment joining expectations with users

### State Management
- **Pattern**: Props-based with no global state
- **Form Handling**: React Hook Form with Zod validation

## Schema Validation
- **Library**: Zod
- **Integration**: React Hook Form resolvers
- **Location**: Form components use inline schemas

## IgnoreFormat
<!-- DO NOT MODIFY THIS SECTION -->