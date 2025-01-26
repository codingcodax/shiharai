import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { protectedProcedure } from '~/server/api/trpc';
import { users } from '~/server/db/schema';

const schema = z.object({
  id: z.string().optional(),
});

export const getById = protectedProcedure
  .input(schema)
  .query(async ({ ctx, input }) => {
    try {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.id ?? ctx.session.user.id),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found.',
        });
      }

      return user;
    } catch {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'We were unable to get your profile. Please try again.',
      });
    }
  });
