// Simple health check endpoint that doesn't require auth
export async function GET() {
  return new Response(JSON.stringify({
    status: 'ok',
    env: {
      hasClerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasClerkSecretKey: !!process.env.CLERK_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}