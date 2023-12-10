'use client'
import React, { useContext, useState } from 'react'
import styles from '../../styles/main.module.css'
import { UserContext } from '~/contexts/UserContext'
import PostContainer, { IPost } from '../_components/PostContainer'
import { useQuery } from '@tanstack/react-query'
import { getRecentPost } from '~/util/Validation'
import TextArea from '../_components/TextArea'
import Button from '../_components/Button'

export default function MainPage() {
  const [page, setPage] = useState(1)
  const [allPosts, setAllPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const { user } = useContext(UserContext)

  const { data, error, isLoading } = useQuery(
    ['posts', page, 10],
    () => getRecentPost({ page, pageSize: 10, userId: user.id }),
    {
      enabled: !!user.id,
      refetchOnWindowFocus: false,
      onSuccess: (newData) => {
        console.log('ON SUCCESS PAGE', page)
        setAllPosts((currentPosts) => [
          ...currentPosts,
          ...newData.response.posts
        ])

        setHasMore(newData.response.hasMore)
      }
    }
  )
  return (
    <div className={styles.main_container}>
      <TextArea setAllPosts={setAllPosts} />
      {user.id ? (
        <PostContainer
          data={allPosts || []}
          hasMore={hasMore}
          isLoading={isLoading}
          setPage={setPage}
        />
      ) : (
        <div style={{ width: '30%', margin: '0 auto', marginTop: '5%' }}>
          <Button
            href="authentication/login"
            backgroundColor="#1da1f2"
            size="medium"
            text="Log In"
            textColor="white"
          />
        </div>
      )}
    </div>
  )
}
