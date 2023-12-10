'use client'
import React, { SetStateAction } from 'react'
import Post from './Post'
import Button from './Button'

export interface IPost {
  id: string
  content: string
  image: string
  userId: string
  user: {
    name: string | null
    image: string | null
  }
  _count: {
    Comment: number
    Like: number
  }
  likedByUser: boolean
  viewCount: number
  createdAt: Date
}

interface IGetRecentPostsReturn {
  data: IPost[]
  isLoading: boolean
  hasMore: boolean
  setPage: React.Dispatch<SetStateAction<number>>
}

export default function PostContainer({
  data,
  isLoading,
  hasMore,
  setPage
}: IGetRecentPostsReturn) {
  return (
    <div>
      <div>
        {data.length > 0 &&
          data.map((post) => (
            <div>
              <Post data={post} />
            </div>
          ))}
      </div>
      {hasMore && (
        <div style={{ width: '30%', margin: '0 auto', marginTop: '5%' }}>
          <Button
            backgroundColor="#1da1f2"
            size="medium"
            text="View More"
            textColor="white"
            onClick={() => setPage((prev) => ++prev)}
          />
        </div>
      )}
    </div>
  )
}
