'use client'
import LeftMenu from '../_components/LeftMenu'
import RightMenu from '../_components/RightMenu'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <LeftMenu />
      {children}
      <RightMenu />
    </main>
  )
}
