import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import './globals.css'

export const metadata: Metadata = {
  title: 'Remote Teams Expectations',
  description: 'Manage and track expectations for remote teams',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
          `}</style>
        </head>
        <body>
          <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-semibold">Remote Teams Expectations</h1>
            <div>
              <SignedOut>
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" className="ml-2" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
