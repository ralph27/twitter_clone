import { userRouter } from '~/server/api/routers/user'
import { createTRPCRouter } from '~/server/api/trpc'
import { postRouter } from './routers/post'
import { commentRouter } from './routers/comment'
import { listRouter } from './routers/list'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  list: listRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
