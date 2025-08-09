import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { ClerkProvider } from "@clerk/nextjs"
import { UserSync } from '@/components/user-sync'
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
          <UserSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
