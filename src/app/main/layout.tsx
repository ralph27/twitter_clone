'use client'
import LeftMenu from '../_components/LeftMenu'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <LeftMenu />
      {children}
    </main>
  )
}
