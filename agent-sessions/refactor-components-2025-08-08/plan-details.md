# Refactoring Plan - Component Organization
Date: 2025-08-08

## Objective
Refactor the codebase to improve component organization, reduce page file complexity, and enhance maintainability.

## Current Issues
1. `/app/page.tsx` (194 lines) - Landing page with inline sections
2. `/app/dashboard/page.tsx` (459 lines) - Very large dashboard with inline components
3. Components in `/components/` are not logically grouped
4. Inline component definitions mixed with page logic

## Refactoring Plan

### Phase 1: Component Organization Structure
Create logical groupings in `/components/`:
```
/components/
  /landing/          - Landing page specific components
    - hero-section.tsx
    - feature-cards.tsx
    - dashboard-preview.tsx
  /dashboard/        - Dashboard specific components
    - sidebar-nav.tsx
    - sidebar-item.tsx
    - expectation-card.tsx
    - empty-state.tsx
    - dashboard-header.tsx
    - my-expectations-section.tsx
    - team-expectations-section.tsx
    - history-section.tsx
  /layout/           - Shared layout components
    - header.tsx
    - mobile-menu.tsx
  /shared/           - Reusable components
    - (existing shared components)
  /ui/               - Keep existing shadcn/ui components
```

### Phase 2: Extract Components from Landing Page
From `/app/page.tsx`, extract:
1. **Header** → `/components/layout/landing-header.tsx`
2. **HeroSection** → `/components/landing/hero-section.tsx`
3. **DashboardPreview** → `/components/landing/dashboard-preview.tsx`
4. **FeatureCards** → `/components/landing/feature-cards.tsx`

### Phase 3: Extract Components from Dashboard Page
From `/app/dashboard/page.tsx`, extract:
1. **DashboardHeader** → `/components/dashboard/dashboard-header.tsx`
2. **SidebarNav** → `/components/dashboard/sidebar-nav.tsx`
3. **SidebarItem** → `/components/dashboard/sidebar-item.tsx`
4. **ExpectationCard** → `/components/dashboard/expectation-card.tsx`
5. **EmptyState** → `/components/dashboard/empty-state.tsx`
6. **MyExpectationsSection** → `/components/dashboard/my-expectations-section.tsx`
7. **TeamExpectationsSection** → `/components/dashboard/team-expectations-section.tsx`
8. **HistorySection** → `/components/dashboard/history-section.tsx`
9. **MobileMenu** → `/components/layout/mobile-menu.tsx`

### Phase 4: Refactor Page Files
After extraction:
- `/app/page.tsx` should be ~50 lines
- `/app/dashboard/page.tsx` should be ~100-150 lines
- Clear separation of concerns
- Improved testability

## Benefits
1. **Maintainability**: Smaller, focused components
2. **Reusability**: Components can be reused across pages
3. **Testability**: Easier to test individual components
4. **Performance**: Better code splitting opportunities
5. **Developer Experience**: Easier to navigate and understand codebase

## Implementation Order
1. Create directory structure
2. Extract and refactor dashboard components (most complex)
3. Extract and refactor landing page components
4. Update imports and clean up page files
5. Test all functionality