import { SignIn } from '@clerk/nextjs'

export default async function SignInPage({
  searchParams,
}: { searchParams: Promise<{ redirect_url?: string }> }) {
  const params = await searchParams
  const dest = params.redirect_url || '/dashboard'
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 
              'bg-blue-600 hover:bg-blue-700 text-white',
            formFieldInput: 
              'border-gray-300 focus:border-blue-500',
            footerActionLink: 
              'text-blue-600 hover:text-blue-700',
          },
        }}
        path="/sign-in"
        signUpUrl="/sign-up"
        afterSignInUrl={dest}
      />
    </div>
  )
}