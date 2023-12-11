import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const postRouter = createTRPCRouter({
  createPost: publicProcedure
    .input(
      z.object({ content: z.string(), image: z.string(), userId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.post.create({
          data: {
            content: input.content,
            image: input.image,
            viewCount: 0,
            user: {
              connect: {
                id: input.userId
              }
            }
          },
          include: {
            user: {
              select: {
                password: false,
                name: true,
                image: true
              }
            },
            _count: {
              select: {
                Comment: true,
                Like: true
              }
            },

            Like: {
              where: {
                userId: input.userId
              },
              select: {
                id: true
              }
            }
          }
        })

        return { error: null, response: { ...response, likedByUser: false } }
      } catch (e) {
        return { error: e, response: null }
      }
    }),

  getRecentPosts: publicProcedure
    .input(
      z.object({ page: z.number(), pageSize: z.number(), userId: z.string() })
    )
    .query(async ({ ctx, input }) => {
      try {
        const skip = (input.page - 1) * input.pageSize
        const limit = input.pageSize
        const response = await ctx.db.post.findMany({
          orderBy: { createdAt: 'desc' },
          take: limit + 1,
          skip,
          include: {
            user: {
              select: {
                password: false,
                name: true,
                image: true
              }
            },
            _count: {
              select: {
                Comment: true,
                Like: true
              }
            },

            Like: {
              where: {
                userId: input.userId
              },
              select: {
                id: true
              }
            }
          }
        })

        const hasMore = response.length > limit
        if (hasMore) {
          response.pop()
        }

        const ids: string[] = response.map((post) => post.id)

        await postRouter.updateViewCounts({
          ctx,
          path: 'post.updateViewCounts',
          rawInput: ids,
          type: 'mutation'
        })

        const posts = response.map((post) => ({
          ...post,
          likedByUser: post.Like.length > 0
        }))

        return {
          response: { hasMore, posts },
          error: null
        }
      } catch (e) {
        return {
          response: { hasMore: false, posts: [] },
          error: 'An error occurred while fetching posts'
        }
      }
    }),

  getPostDetails: publicProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.post.findUnique({
          where: {
            id: input.postId
          },
          include: {
            user: {
              select: {
                password: false,
                name: true,
                image: true
              }
            },
            _count: {
              select: {
                Comment: true,
                Like: true
              }
            },

            Like: {
              where: {
                userId: input.userId
              },
              select: {
                id: true
              }
            }
          }
        })

        if (response) {
          await postRouter.updateViewCounts({
            ctx,
            path: 'post.updateViewCounts',
            rawInput: [input.postId],
            type: 'mutation'
          })

          return {
            response: { ...response, likedByUser: response.Like.length > 0 },
            error: null
          }
        }
      } catch (e) {
        return {
          response: null,
          error: e
        }
      }
    }),

  updateViewCounts: publicProcedure
    .input(z.array(z.string()))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.post.updateMany({
          where: {
            id: {
              in: input
            }
          },
          data: {
            viewCount: {
              increment: 1
            }
          }
        })

        return response
      } catch (e) {
        return e
      }
    }),

  likePost: publicProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.like.create({
          data: {
            Post: {
              connect: {
                id: input.postId
              }
            },
            user: {
              connect: {
                id: input.userId
              }
            }
          }
        })
        return response
      } catch (e) {
        return e
      }
    }),

  dislikePost: publicProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.like.delete({
          where: {
            userId_postId: {
              postId: input.postId,
              userId: input.userId
            }
          }
        })
        return response
      } catch (e) {
        return e
      }
    })
})
