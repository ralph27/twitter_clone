'use client'
import React, { SetStateAction, useContext, useState } from 'react'
import styles from '../../styles/textarea.module.css'
import Button from './Button'
import { IoMdPhotos } from 'react-icons/io'
import { createComment, createPost } from '~/util/Validation'
import { IUser, UserContext } from '~/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { IPost } from './PostContainer'

export interface IPostState {
  content: string
  image: string
}

function TextArea({
  setAllPosts,
  type,
  postId
}: {
  setAllPosts: React.Dispatch<SetStateAction<IPost[]>>
  type: 'post' | 'comment'
  postId?: string
}) {
  const [post, setPost] = useState<IPostState>({
    content: '',
    image: ''
  })
  const router = useRouter()
  const { user } = useContext(UserContext)

  const handleSubmit = async () => {
    if (!post.content) {
      return
    }

    if (!user.id) {
      return router.push('/authentication/login')
    }

    if (type === 'post') {
      const { response } = await createPost({
        content: post.content,
        image: post.image,
        userId: user.id
      })

      if (response) {
        setAllPosts((currentPosts) => [response, ...currentPosts])
      }
    } else if (type === 'comment' && postId) {
      const { response } = await createComment({
        content: post.content,
        image: post.image,
        userId: user.id,
        postId
      })

      if (response) {
        setAllPosts((currentPosts) => [response, ...currentPosts])
      }
    }
    setPost({ content: '', image: '' })
  }

  return (
    <div className={styles.textarea_container}>
      <textarea
        className={styles.textarea}
        placeholder={type === 'post' ? "What's happening?!" : 'Post a Reply'}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        value={post.content}
      ></textarea>
      <div className={styles.textarea_cta}>
        <IoMdPhotos
          fill="#1DA1F2"
          className={styles.textarea_photo_btn}
          size={20}
        />
        <div>
          <Button
            backgroundColor="#1DA1F2"
            textColor="white"
            text="Post"
            size="small"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default TextArea
