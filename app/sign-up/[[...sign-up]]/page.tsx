import { SignUp } from '@clerk/nextjs'

export default function SignUpPage({
  searchParams,
}: { searchParams: { redirect_url?: string } }) {
  const dest = searchParams.redirect_url || '/dashboard'
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