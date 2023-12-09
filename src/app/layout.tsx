import '~/styles/globals.css'
import { Inter } from 'next/font/google'
import UserProvider, { IUser, UserContext } from '~/contexts/UserContext'
import { useState } from 'react'

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className={inter.className}>
          <UserProvider>{children}</UserProvider>
        </div>
      </body>
    </html>
  )
}
