import { http, HttpResponse } from 'msw';

const CLERK_API_BASE = 'https://api.clerk.dev';

// Mock user data
export const mockUser = {
  id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  object: 'user',
  email_addresses: [{
    id: 'email_2NNEqL2nrIRdJ194ndJqAHwEfxC',
    object: 'email_address',
    email_address: 'demo@example.com',
    verification: {
      status: 'verified',
      strategy: 'from_oauth_google',
    },
  }],
  first_name: 'Test',
  last_name: 'User',
  created_at: 1715000000000,
  updated_at: 1715000000000,
};

// Mock session data
export const mockSession = {
  id: 'sess_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  object: 'session',
  user_id: mockUser.id,
  status: 'active',
  expire_at: 1715086400000,
  abandon_at: 1715090000000,
  created_at: 1715000000000,
  updated_at: 1715000000000,
};

export const clerkHandlers = [
  // Mock the client endpoint - this is what Clerk's frontend SDK calls
  http.get(`${CLERK_API_BASE}/v1/client`, () => {
    return HttpResponse.json({
      id: 'client_2NNEqL2nrIRdJ194ndJqAHwEfxC',
      object: 'client',
      sessions: [mockSession],
      sign_in: null,
      sign_up: null,
      last_active_session_id: mockSession.id,
    });
  }),

  // Mock the session endpoint
  http.get(`${CLERK_API_BASE}/v1/client/sessions/:sessionId`, ({ params }) => {
    const { sessionId } = params;
    if (sessionId === mockSession.id) {
      return HttpResponse.json({
        ...mockSession,
        user: mockUser,
      });
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Mock session touch (keeps session active)
  http.post(`${CLERK_API_BASE}/v1/client/sessions/:sessionId/touch`, () => {
    return HttpResponse.json({
      ...mockSession,
      updated_at: Date.now(),
    });
  }),

  // Mock user endpoint
  http.get(`${CLERK_API_BASE}/v1/users/:userId`, ({ params }) => {
    const { userId } = params;
    if (userId === mockUser.id) {
      return HttpResponse.json(mockUser);
    }
    return new HttpResponse(null, { status: 404 });
  }),

  // Mock sign out
  http.delete(`${CLERK_API_BASE}/v1/client/sessions/:sessionId`, () => {
    return HttpResponse.json({ message: 'Session ended' });
  }),

  // Mock the JWKS endpoint (for JWT verification)
  http.get(`https://*.clerk.accounts.dev/.well-known/jwks.json`, () => {
    return HttpResponse.json({
      keys: [{
        use: 'sig',
        kty: 'RSA',
        kid: 'test-key-id',
        alg: 'RS256',
        n: 'test-n-value',
        e: 'AQAB',
      }],
    });
  }),
];