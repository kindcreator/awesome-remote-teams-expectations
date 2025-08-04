# Frontend Pages

## Dashboard Page
**Route**: `/`  
**File**: `/app/page.tsx`

### Purpose
Main dashboard showing current team expectations status.

### Layout
- **Header**: Title, description, history navigation
- **My Focus** (left column): Current user's active expectation
- **Team's Focus** (right column): Other team members' expectations

### Data Requirements
- Fetches all expectations and users
- Filters active expectations (not done)
- Assumes current user is "user-1"

### Components Used
- `MyExpectationView`: Personal expectation display
- `TeamExpectationCard`: Team member cards
- UI components: Button, layout containers

## History Page
**Route**: `/history`  
**File**: `/app/history/page.tsx`

### Purpose
Timeline view of completed expectations.

### Layout
- **Header**: Back navigation, page title
- **Timeline**: Vertical list of completed expectations

### Data Requirements
- Filters completed expectations (`isDone: true`)
- Sorts by completion date (newest first)
- Enriches with user data

### Components Used
- `HistoryTimelineItem`: Timeline entry display
- UI components: Button, navigation

## Layout Structure
**File**: `/app/layout.tsx`

### Features
- Global styles application
- Font configuration (Geist)
- Theme provider setup
- Root HTML structure

### Missing Pages (per requirements)
- Landing page with sign-up
- Authentication pages
- User profile/settings