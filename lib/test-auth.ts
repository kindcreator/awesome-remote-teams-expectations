// Test mode authentication helpers
export function isTestMode() {
  return process.env.NEXT_PUBLIC_TEST_MODE === 'true';
}

export async function testAuth() {
  if (!isTestMode()) {
    throw new Error('testAuth should only be used in test mode');
  }
  
  // Return mock auth data for tests
  return {
    userId: 'test_user_123',
    sessionId: 'test_session_123',
    orgId: null,
    getToken: async () => 'test_token',
    protect: async () => {},
  };
}

export async function testCurrentUser() {
  if (!isTestMode()) {
    throw new Error('testCurrentUser should only be used in test mode');
  }
  
  // Return mock user data for tests
  return {
    id: 'test_user_123',
    firstName: 'Test',
    lastName: 'User',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
  };
}