'use client'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart, FaUser } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa6'
import { MdOutlineBarChart } from 'react-icons/md'
import { IPost } from '~/app/_components/PostContainer'
import { UserContext } from '~/contexts/UserContext'
import {
  dislikePost,
  getComments,
  getPostDetails,
  likePost
} from '~/util/Validation'
import styles from '../../../../styles/postDetails.module.css'
import TextArea from '~/app/_components/TextArea'
import { timeSince } from '~/app/_components/Post'

function formatDate(date: Date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const adjustedHours = hours % 12 || 12 // Convert to 12-hour format and handle 0 as 12

  const day = date.getDate()
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const month = monthNames[date.getMonth()]

  const year = date.getFullYear()

  return `${adjustedHours}:${
    minutes < 10 ? '0' : ''
  }${minutes}${ampm} ${month} ${day}, ${year}`
}

function Page({ params }: { params: { postId: string } }) {
  const { user } = useContext(UserContext)
  const [post, setPost] = useState<IPost | undefined>()
  const [comments, setComments] = useState<IPost[]>([])

  useQuery(
    ['post', params.postId],
    () => getPostDetails({ postId: params.postId, userId: user.id }),
    {
      enabled: !!user.id,
      refetchOnWindowFocus: false,
      onSuccess: (newData) => {
        if (newData?.response) setPost(newData.response)
      }
    }
  )

  useQuery(['comments'], () => getComments({ postId: params.postId }), {
    enabled: !!user.id,
    refetchOnWindowFocus: false,
    onSuccess: (newData) => {
      setComments(newData)
    }
  })

  const handleLike = async () => {
    if (post && user.id && !post.likedByUser) {
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
        return prev
      })
    } else if (post && user.id && post.likedByUser) {
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
    <div className={styles.post_details_container}>
      <div className={styles.post_details_upper}>
        <FaArrowLeft />
        <p>Post</p>
      </div>
      <div className={styles.post_details_wrapper}>
        <div>
          <div className={styles.post_details_user}>
            {user.image ? (
              <Image src={user.image} alt="user profile picture" />
            ) : (
              <FaUser size={25} fill="white" />
            )}
            <p>{post?.user.name}</p>
          </div>
          <div>
            <p>{post?.content}</p>
            {post?.image && <Image src={post?.image} alt="" />}
          </div>
        </div>
        <div>
          {post && (
            <p className={styles.post_details_date}>
              {formatDate(post?.createdAt)}
            </p>
          )}
        </div>
        <div className={styles.post_details_bottom_cta}>
          <div>
            <FaRegComment fill="rgba(255, 255, 255, 0.5)" size={20} />
            <p>{post?._count?.Comment || 0}</p>
          </div>
          <div onClick={handleLike}>
            {true ? (
              <FaHeart fill="red" size={20} />
            ) : (
              <FaRegHeart fill="rgba(255, 255, 255, 0.5)" size={20} />
            )}
            <p>{post?._count?.Like || 0}</p>
          </div>
          <div>
            <MdOutlineBarChart fill="rgba(255, 255, 255, 0.5)" size={20} />
            <p>{post?.viewCount || 0}</p>
          </div>
        </div>
      </div>
      <TextArea setAllPosts={setComments} type="comment" postId={post?.id} />
      {comments?.map((comment) => (
        <div className={styles.post_details_comment}>
          <div className={styles.post_details_user}>
            {comment.user.image ? (
              <Image src={comment.user.image} alt="user profile picture" />
            ) : (
              <FaUser size={25} fill="white" />
            )}
            <p>{comment.user.name}</p>
            <span>·</span>
            {post?.createdAt && (
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 13 }}>
                {timeSince(post.createdAt)}
              </p>
            )}
          </div>
          <div>{comment.content}</div>
        </div>
      ))}
    </div>
  )
}

export default Page
