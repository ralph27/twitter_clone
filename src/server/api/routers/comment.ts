import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const commentRouter = createTRPCRouter({
  createComment: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        postId: z.string(),
        content: z.string(),
        image: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await ctx.db.comment.create({
          data: {
            content: input.content,
            user: {
              connect: {
                id: input.userId
              }
            },
            post: {
              connect: {
                id: input.postId
              }
            },
            image: input.image
          },
          include: {
            user: {
              select: {
                password: false,
                name: true,
                image: true
              }
            }
          }
        })

        return {
          response,
          error: null
        }
      } catch (e) {
        return {
          error: e,
          response: null
        }
      }
    }),
  getComments: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.db.comment.findMany({
        where: {
          post: {
            id: input.postId
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              password: false,
              name: true,
              image: true
            }
          }
        }
      })
      return response
    })
})
