import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  // In test mode, show a simple sign-in form
  if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          <div className="text-center text-gray-500">
            Test mode: Authentication is mocked
          </div>
        </div>
      </div>
    );
  }
  
  // In production, use Clerk's SignIn component
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}