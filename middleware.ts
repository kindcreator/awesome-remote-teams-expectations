import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/',  // Dashboard
  '/api/user(.*)',  // User API routes
]);

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',  // Webhooks should be public
]);

// In test mode, bypass Clerk middleware
if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
  export default function middleware(req: NextRequest) {
    return NextResponse.next();
  }
} else {
  export default clerkMiddleware(async (auth, req) => {
    // If it's a protected route and user is not authenticated, protect it
    if (isProtectedRoute(req) && !isPublicRoute(req)) {
      await auth.protect();
    }
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};