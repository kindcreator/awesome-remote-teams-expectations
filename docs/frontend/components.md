# Frontend Components

## Business Components

### MyExpectationView
**Location**: `/components/my-expectation-view.tsx`  
**Type**: Client Component

**Purpose**: Manages display of current user's expectation.

**Props**:
```typescript
{
  expectation: (Expectation & { user: User }) | null
}
```

**States**:
- Empty: Shows prompt to create expectation
- Active: Shows expectation card with actions

**Features**:
- Time remaining calculation
- Edit/Delete dropdown menu
- Mark as done action

### TeamExpectationCard
**Location**: `/components/team-expectation-card.tsx`  
**Type**: Client Component

**Purpose**: Displays team member expectations in list view.

**Props**:
```typescript
{
  expectation: Expectation & { user: User }
}
```

**Features**:
- Compact card design
- User identification
- Progress tracking

### ManageExpectationForm
**Location**: `/components/manage-expectation-form.tsx`  
**Type**: Client Component

**Purpose**: Modal form for creating/editing expectations.

**Props**:
```typescript
{
  expectation?: Expectation | null
  children: React.ReactNode
}
```

**Form Fields**:
- Task description (textarea)
- Estimated completion (datetime-local)

**Current Limitations**:
- No validation
- No server submission
- No error handling

### HistoryTimelineItem
**Location**: `/components/history-timeline-item.tsx`  
**Type**: Client Component

**Purpose**: Timeline display for completed expectations.

**Props**:
```typescript
{
  expectation: Expectation & { user: User }
}
```

**Features**:
- Timeline connector visualization
- Performance metrics (estimated vs actual)
- Formatted timestamps

## Component Architecture

### Patterns
- Composition over inheritance
- Props-based data flow
- Client components for interactivity
- Server components for data fetching

### State Management
- Local component state only
- No global state solution
- Form state via uncontrolled inputs