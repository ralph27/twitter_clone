import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc'

export const listRouter = createTRPCRouter({
  getLists: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.list.findMany({
        where: {
          creator: {
            id: input.userId
          }
        }
      })
    })
})
