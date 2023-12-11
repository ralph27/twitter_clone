'use client'
import React, { useContext } from 'react'
import styles from '../../styles/rightMenu.module.css'
import { useQuery } from '@tanstack/react-query'
import { getTrendingUsers } from '~/util/Validation'
import { UserContext } from '~/contexts/UserContext'
import UserCard from './UserCard'

export default function RightMenu() {
  const { user } = useContext(UserContext)
  const { data, refetch } = useQuery(
    ['users', user.id],
    () => getTrendingUsers(user.id),
    {
      enabled: !!user.id,
      refetchOnWindowFocus: false
    }
  )

  return (
    <div className={styles.right_menu_container}>
      <input placeholder="Search..." />
      <div className={styles.right_menu_card}>
        <h1>Trending Users</h1>
        <div>
          {data?.map((userCard) => (
            <UserCard userCard={userCard} />
          ))}
        </div>
      </div>
    </div>
  )
}
