import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
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
        afterSignInUrl="/dashboard"
      />
    </div>
  )
}