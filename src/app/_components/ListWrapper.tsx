'use client'
import React, { Dispatch, SetStateAction, useContext } from 'react'
import styles from '../../styles/listWrapper.module.css'
import { useQuery } from '@tanstack/react-query'
import { getLists } from '~/util/Validation'
import { UserContext } from '~/contexts/UserContext'

export default function ListWrapper({
  setFilter,
  filter
}: {
  setFilter: (id: string) => void
  filter: string
}) {
  const { user } = useContext(UserContext)
  const { data } = useQuery(
    ['lists'],
    () => getLists({ userId: user.id || '' }),
    {
      enabled: !!user.id,
      refetchOnWindowFocus: false
    }
  )
  return (
    <div className={styles.list_wrapper}>
      <p
        key="fyp"
        onClick={() => setFilter('')}
        className={!filter ? styles.active : ''}
      >
        For you
      </p>
      <p
        key="following"
        className={filter === 'following' ? styles.active : ''}
        onClick={() => setFilter('following')}
      >
        Following
      </p>
      {data?.map((list) => (
        <p
          className={filter === list.id ? styles.active : ''}
          key={list.id}
          onClick={() => setFilter(list.id)}
        >
          {list.name}
        </p>
      ))}
    </div>
  )
}
