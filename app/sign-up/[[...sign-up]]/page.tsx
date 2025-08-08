import { SignUp } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function SignUpPage() {
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
        afterSignUpUrl="/dashboard"
      />
    </div>
  )
}