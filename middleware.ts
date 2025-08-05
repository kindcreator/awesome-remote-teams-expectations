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

// Wrap clerkMiddleware to handle test mode
export default clerkMiddleware(async (auth, req) => {
  // In test mode, simulate authentication based on cookie
  if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
    const hasSession = req.cookies.has('__session');
    
    // If trying to access protected route without session, redirect to sign-in
    if (isProtectedRoute(req) && !isPublicRoute(req) && !hasSession) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    
    // Allow access if has session or accessing public route
    return NextResponse.next();
  }
  
  // Normal Clerk protection in production
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};