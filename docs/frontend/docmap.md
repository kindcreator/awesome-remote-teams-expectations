# Frontend Documentation Map

## Overview
This document maps all frontend documentation and implementation for the Remote Teams Expectations platform.

## Architecture

### Framework
- **Technology**: Next.js 15.2.4 with App Router
- **React Version**: 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

### Application Structure
```
/app
├── page.tsx          # Main dashboard
├── history/
│   └── page.tsx     # History view
├── layout.tsx       # Root layout
└── globals.css      # Global styles
```

## Pages

### Dashboard Page
- **Location**: `/app/page.tsx`
- **Route**: `/`
- **Features**:
  - Current user expectation display
  - Team expectations overview
  - Navigation to history

### History Page
- **Location**: `/app/history/page.tsx`
- **Route**: `/history`
- **Features**:
  - Completed expectations timeline
  - Performance metrics display

## Components

### UI Components (Radix UI)
- **Location**: `/components/ui/`
- **Library**: Radix UI primitives with Tailwind styling
- **Components**: Button, Card, Dialog, Form, Input, Select, etc.

### Business Components

#### MyExpectationView
- **Location**: `/components/my-expectation-view.tsx`
- **Purpose**: Displays current user's active expectation
- **States**: Empty prompt or active expectation card

#### TeamExpectationCard
- **Location**: `/components/team-expectation-card.tsx`
- **Purpose**: Displays team member expectations
- **Usage**: List view on dashboard

#### ManageExpectationForm
- **Location**: `/components/manage-expectation-form.tsx`
- **Purpose**: Create/edit expectations
- **Pattern**: Dialog-based form

#### HistoryTimelineItem
- **Location**: `/components/history-timeline-item.tsx`
- **Purpose**: Timeline display of completed expectations
- **Features**: Performance metrics visualization

## Styling System

### Tailwind Configuration
- **Version**: v4 with PostCSS
- **Theme**: Custom slate color palette
- **Utilities**: tailwind-merge, class-variance-authority

### Design Tokens
- **Colors**: Slate scale (50-900)
- **Borders**: slate-200
- **Backgrounds**: white, slate-50
- **Interactive**: hover:bg-slate-100

## Form Management

### React Hook Form
- **Location**: Form components
- **Validation**: Zod schemas
- **Pattern**: Controlled components with validation

## Theme System
- **Library**: next-themes
- **Features**: Dark mode support (configuration present)

## Libraries

### UI Enhancement
- **Icons**: lucide-react
- **Dates**: date-fns
- **Notifications**: sonner
- **Animations**: tailwindcss-animate

### Component Libraries
- **Command Palette**: cmdk
- **Carousel**: embla-carousel-react
- **Charts**: recharts
- **Drawer**: vaul

## Performance Patterns
- **Server Components**: Default for pages
- **Client Components**: Interactive elements only
- **Code Splitting**: Automatic via Next.js

## IgnoreFormat
<!-- DO NOT MODIFY THIS SECTION -->