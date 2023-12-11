'use client'
import React, { useContext, useState } from 'react'
import { IPost } from './PostContainer'
import Image from 'next/image'
import { FaHeart, FaRegHeart, FaUser } from 'react-icons/fa'
import styles from '../../styles/post.module.css'
import { FaRegComment } from 'react-icons/fa'
import { MdOutlineBarChart } from 'react-icons/md'
import { dislikePost, likePost } from '~/util/Validation'
import { UserContext } from '~/contexts/UserContext'
import Link from 'next/link'

export function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + 'Y'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + 'M'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + 'd'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + 'h'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + 'm'
  }
  return Math.floor(seconds) + ' s'
}

function Post({ data }: { data: IPost | undefined }) {
  const { user } = useContext(UserContext)
  const [post, setPost] = useState(data)

  const handleLike = async () => {
    if (post && user.id && !post?.likedByUser) {
      await likePost({ postId: post.id, userId: user.id })
      setPost((prev) => {
        if (prev?._count) {
          return {
            ...prev,
            _count: {
              ...prev._count,
              Like: prev._count.Like + 1
            },
            likedByUser: true
          }
        }
      })
    } else if (user.id && post?.likedByUser) {
      await dislikePost({ postId: post.id, userId: user.id })
      setPost((prev) => {
        if (prev?._count) {
          return {
            ...prev,
            _count: {
              ...prev._count,
              Like: prev._count.Like - 1
            },
            likedByUser: false
          }
        }
      })
    }
  }

  return (
    <Link href={`/main/post/${post?.id}`} className={styles.post_container}>
      <div>
        {post?.user.image ? (
          <Image src={post?.user.image} alt="user profile picture" />
        ) : (
          <FaUser size={20} fill="white" />
        )}
      </div>
      <div className={styles.post_content_container}>
        <div className={styles.post_upper}>
          <p className={styles.post_username}>{post?.user.name}</p>
          <span>&nbsp;·&nbsp;</span>
          {post && (
            <p className={styles.post_timestamp}>
              {timeSince(post?.createdAt)}
            </p>
          )}
        </div>
        <p className={styles.post_content}>{post?.content}</p>
        {post?.image && <Image src={post.image} alt="" />}
        <div className={styles.post_lower_cta}>
          <div>
            <FaRegComment fill="rgba(255, 255, 255, 0.5)" />
            <p>{post?._count?.Comment}</p>
          </div>
          <div onClick={handleLike}>
            {post?.likedByUser ? (
              <FaHeart fill="red" />
            ) : (
              <FaRegHeart fill="rgba(255, 255, 255, 0.5)" />
            )}
            <p>{post?._count?.Like}</p>
          </div>
          <div>
            <MdOutlineBarChart fill="rgba(255, 255, 255, 0.5)" />
            <p>{post?.viewCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
