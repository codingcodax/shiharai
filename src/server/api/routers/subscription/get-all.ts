import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

import { subscriptions } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

export const getAll = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.query.subscriptions.findMany({
      where: eq(subscriptions.userId, ctx.session.user.id),
    });
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'We were unable to get your subscriptions. Please try again later.',
    });
  }
});
