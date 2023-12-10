'use client'
import React, { SetStateAction, useContext, useState } from 'react'
import styles from '../../styles/textarea.module.css'
import Button from './Button'
import { IoMdPhotos } from 'react-icons/io'
import { createPost } from '~/util/Validation'
import { UserContext } from '~/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { IPost } from './PostContainer'

export interface IPostState {
  content: string
  image: string
}

function TextArea({
  setAllPosts
}: {
  setAllPosts: React.Dispatch<SetStateAction<IPost[]>>
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

    const { response } = await createPost({
      content: post.content,
      image: post.image,
      userId: user.id
    })
    setPost({ content: '', image: '' })

    if (response) {
      setAllPosts((currentPosts) => [response, ...currentPosts])
    }
  }

  return (
    <div className={styles.textarea_container}>
      <textarea
        className={styles.textarea}
        placeholder="What's happening?!"
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
