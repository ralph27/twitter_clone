'use client'
import '~/styles/globals.css'
import { Inter } from 'next/font/google'
import UserProvider from '~/contexts/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({
  subsets: ['latin']
})

const queryClient = new QueryClient()

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <UserProvider>{children}</UserProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  )
}
