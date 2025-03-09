import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { protectedProcedure } from '~/server/api/trpc';
import { users } from '~/server/db/schema';

const schema = createInsertSchema(users, {
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
}).omit({
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
});

export const update = protectedProcedure
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const userId = input.id ?? ctx.session.user.id;
    const { name, email, image, timezone, currency } = input;

    try {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, userId),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found.',
        });
      }

      const data = {
        ...(name && { name }),
        ...(email && { email }),
        ...(image && { image }),
        ...(timezone && { timezone }),
        ...(currency && { currency }),
        updatedAt: new Date(),
      };

      const updatedUser = await ctx.db
        .update(users)
        .set(data)
        .where(eq(users.id, userId))
        .returning();

      return updatedUser;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'We were unable to update your profile. Please try again.',
        cause: error,
      });
    }
  });
