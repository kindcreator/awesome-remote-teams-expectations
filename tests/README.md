# Test Organization

## Current Structure (After Restructuring)

### E2E Tests (tests/e2e/)
- `ticket-2-authentication.spec.ts` - Complete auth flow (sign-in, dashboard access, sign-out)
- `ticket-3-expectations-list.spec.ts` - View all team expectations (to be created)
- `ticket-4-manage-expectation.spec.ts` - Create/edit/delete expectations (to be created)
- `ticket-5-history.spec.ts` - View completed expectations history (to be created)

### API Tests (tests/api/)
For testing server actions and API routes with business logic focus.
- To be added as we implement server actions

### Integration Tests (tests/integration/)
For testing component interactions and data flow.
- To be added for complex component interactions

### Unit Tests (tests/unit/)
For testing pure functions and utilities.
- To be added for business logic functions

## Migration Status

### To Keep:
- ✅ `ticket-2-authentication.spec.ts` - Our proper TDD test for Ticket #2

### To Remove/Refactor:
- ❌ `auth.spec.ts` - Duplicates ticket-2, should be removed
- ⚠️ `expectations.spec.ts` - Should be moved to ticket-3 when we start that ticket

## TDD Workflow

1. **RED Phase**: Write E2E test for the ticket
2. **GREEN Phase**: Implement feature to pass the test
3. **REFACTOR Phase**: Add API/unit tests for complex logic

## Why This Structure?

1. **Ticket-based**: Each ticket has its own E2E test file
2. **No duplication**: Each behavior tested at one level only
3. **Clear ownership**: Easy to find tests for each feature
4. **TDD-friendly**: Start with E2E (user story), then drill down