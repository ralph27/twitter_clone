'use client'
import React, { createContext, useState, type ReactNode } from 'react'

export interface IUser {
  username: string | null
  id: string | null
  image?: string | null
}

export interface IUserContext {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}

export const UserContext = createContext<IUserContext>({
  user: { username: '', id: '', image: '' },
  setUser: () => {}
})

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({
    username: null,
    id: null,
    image: null
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
