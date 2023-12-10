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
      console.log(passwordMatch)
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
          image: user.image
        }
      }
    })
})
