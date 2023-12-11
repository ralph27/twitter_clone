'use client'
import React, { createContext, useState, type ReactNode } from 'react'

export interface IUser {
  username: string | null
  id: string | null
  image?: string | null
  following: string[]
}

export interface IUserContext {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
}

export const UserContext = createContext<IUserContext>({
  user: { username: '', id: '', image: '', following: [] },
  setUser: () => {}
})

export default function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>({
    username: null,
    id: null,
    image: null,
    following: []
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
