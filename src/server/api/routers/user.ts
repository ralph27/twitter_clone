import { z } from 'zod'
import bcrypt from 'bcrypt'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const userRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let error = ''
      const hashedPassword = await bcrypt.hash(input.password, 10)
      const existingUser = await ctx.db.user.findUnique({
        where: { name: input.username }
      })

      if (existingUser) {
        error = 'User Already Exist'
        return {
          response: null,
          error
        }
      } else {
        const newUser = await ctx.db.user.create({
          data: {
            password: hashedPassword,
            name: input.username
          }
        })
        return {
          response: {
            username: newUser.name,
            id: newUser.id,
            image: newUser.image
          },
          error: null
        }
      }
    }),

  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ ctx, input }) => {
      let error = ''
      const user = await ctx.db.user.findUnique({
        where: {
          name: input.username
        },
        select: {
          following: true,
          name: true,
          id: true,
          image: true,
          password: true
        }
      })

      if (!user) {
        error = 'User Does Not Exist'
        return {
          response: null,
          error
        }
      }

      const passwordMatch = await bcrypt.compare(input.password, user.password)
      if (!passwordMatch) {
        error = 'Incorrect Credentials'
        return {
          response: null,
          error
        }
      }

      return {
        error: null,
        response: {
          username: user.name,
          id: user.id,
          image: user.image,
          following: user.following
        }
      }
    }),

  getTrendingUsers: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: {
          userId: {
            notIn: [input]
          }
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          viewCount: true
        }
      })

      const userViewCounts = posts.reduce((acc, post) => {
        if (post.user) {
          acc[post.user.id] = (acc[post.user.id] || 0) + post.viewCount
        }
        return acc
      }, {} as Record<string, number>)

      const sortedUserIds = Object.entries(userViewCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([userId]) => userId)
        .slice(0, 4)

      const trendingUsers = await ctx.db.user.findMany({
        where: {
          id: {
            in: sortedUserIds
          }
        },
        select: {
          image: true,
          name: true,
          id: true
        }
      })

      return trendingUsers
    }),

  followUser: publicProcedure
    .input(z.object({ followerId: z.string(), followeeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.db.user.update({
        where: {
          id: input.followerId
        },
        data: {
          following: {
            push: input.followeeId
          }
        }
      })

      await ctx.db.user.update({
        where: {
          id: input.followeeId
        },
        data: {
          followers: {
            push: input.followerId
          }
        }
      })

      return response
    }),

  unfollowUser: publicProcedure
    .input(z.object({ followerId: z.string(), followeeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const follower = await ctx.db.user.findUnique({
        where: {
          id: input.followeeId
        },
        select: {
          followers: true
        }
      })

      const updatedFollowers = follower?.followers.filter(
        (id) => id != input.followerId
      )

      await ctx.db.user.update({
        where: {
          id: input.followeeId
        },
        data: {
          followers: updatedFollowers
        }
      })

      const followee = await ctx.db.user.findFirst({
        where: {
          id: input.followerId
        },
        select: {
          following: true
        }
      })

      const updatedFollowing = followee?.following.filter(
        (id) => id != input.followeeId
      )

      await ctx.db.user.update({
        where: {
          id: input.followerId
        },
        data: {
          following: updatedFollowing
        }
      })

      return follower
    })
})
