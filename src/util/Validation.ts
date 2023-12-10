'use server'
import { number } from 'zod'
import { api } from '~/trpc/server'

interface IUserAuth {
  username: string
  password: string
}

interface IPostPayload {
  userId: string
  content: string
  image: string
}

export const signup = async ({ username, password }: IUserAuth) => {
  const response = await api.user.createAccount.mutate({ username, password })
  return response
}

export const login = async ({ username, password }: IUserAuth) => {
  const response = await api.user.login.query({ password, username })
  return response
}

export const createPost = async ({ content, image, userId }: IPostPayload) => {
  const response = await api.post.createPost.mutate({ content, image, userId })
  return response
}

export const getRecentPost = async ({
  page,
  pageSize,
  userId
}: {
  page: number
  pageSize: number
  userId: string | null
}) => {
  if (userId) {
    const response = await api.post.getRecentPosts.query({
      page,
      pageSize,
      userId
    })
    return response
  }
  throw 'User Not Logged In'
}

export const likePost = async ({
  userId,
  postId
}: {
  userId: string
  postId: string
}) => {
  const response = await api.post.likePost.mutate({
    postId,
    userId
  })
  return response
}

export const dislikePost = async ({
  userId,
  postId
}: {
  userId: string
  postId: string
}) => {
  const response = await api.post.dislikePost.mutate({
    postId,
    userId
  })
  return response
}
