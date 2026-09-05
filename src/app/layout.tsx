import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/providers/app-providers'

export const metadata: Metadata = {
  title: {
    default: 'Relay',
    template: '%s | Relay',
  },
  description: 'Incident intelligence workspace for software teams.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
