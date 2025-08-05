import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Routes that should be accessible without authentication
  publicRoutes: [
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/health",
    "/api/webhooks/clerk",
  ]
});

export const config = {
  // Simplified matcher that covers all routes except static files
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};