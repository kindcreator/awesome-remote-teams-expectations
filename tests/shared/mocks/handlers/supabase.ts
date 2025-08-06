import { http, HttpResponse } from 'msw';

// Use a placeholder URL that will be replaced by actual Supabase URL in tests
const SUPABASE_URL = 'https://*.supabase.co';

// Mock data matching our schema
export const mockDbUser = {
  id: 'db-user-123',
  clerk_user_id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  email: 'demo@example.com',
  name: 'Test User',
  created_at: '2025-08-05T12:00:00Z',
  updated_at: '2025-08-05T12:00:00Z',
};

export const mockExpectation = {
  id: 'exp-123',
  user_id: mockDbUser.id,
  title: 'Complete project documentation',
  description: 'Finish writing all technical documentation',
  estimated_completion: '2025-08-10T17:00:00Z',
  is_done: false,
  is_stale: false,
  stale_reasons: null,
  created_at: '2025-08-05T12:00:00Z',
  updated_at: '2025-08-05T12:00:00Z',
};

export const supabaseHandlers = [
  // Mock auth endpoint
  http.post(`${SUPABASE_URL}/auth/v1/token`, () => {
    return HttpResponse.json({
      access_token: 'mock-access-token',
      token_type: 'bearer',
      expires_in: 3600,
      refresh_token: 'mock-refresh-token',
    });
  }),

  // Mock user select by clerk_user_id
  http.get(`${SUPABASE_URL}/rest/v1/users`, ({ request }) => {
    const url = new URL(request.url);
    const clerkUserId = url.searchParams.get('clerk_user_id');
    
    if (clerkUserId === 'eq.' + mockDbUser.clerk_user_id) {
      return HttpResponse.json([mockDbUser]);
    }
    
    return HttpResponse.json([]);
  }),

  // Mock user insert
  http.post(`${SUPABASE_URL}/rest/v1/users`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      ...mockDbUser,
      ...body,
      id: 'db-user-' + Date.now(),
    });
  }),

  // Mock expectations select
  http.get(`${SUPABASE_URL}/rest/v1/expectations`, ({ request }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('user_id');
    
    if (userId === 'eq.' + mockDbUser.id) {
      return HttpResponse.json([mockExpectation]);
    }
    
    return HttpResponse.json([]);
  }),

  // Mock expectations insert
  http.post(`${SUPABASE_URL}/rest/v1/expectations`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      ...mockExpectation,
      ...body,
      id: 'exp-' + Date.now(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }),

  // Mock expectations update
  http.patch(`${SUPABASE_URL}/rest/v1/expectations`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      ...mockExpectation,
      ...body,
      updated_at: new Date().toISOString(),
    });
  }),

  // Mock expectations delete
  http.delete(`${SUPABASE_URL}/rest/v1/expectations`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];