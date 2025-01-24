import type { Metadata } from 'next'
import { roboto } from '@/lib/fonts'
import { ClientLayout } from '@/app/providers'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'HexaGeeky - Discover and Organize Your Tools and Services',
  description: 'A modern tool discovery platform',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased min-h-screen bg-background`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
