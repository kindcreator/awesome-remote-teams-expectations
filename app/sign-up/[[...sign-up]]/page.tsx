import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage({
  searchParams,
}: { searchParams: Promise<{ redirect_url?: string }> }) {
  const params = await searchParams
  const dest = params.redirect_url || '/dashboard'
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
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
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl={dest}
      />
    </div>
  )
}