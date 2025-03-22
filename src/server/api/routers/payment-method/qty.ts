import { TRPCError } from '@trpc/server';
import { count, eq } from 'drizzle-orm';

import { paymentMethods } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

export const qty = protectedProcedure.query(async ({ ctx }) => {
  try {
    const total = await ctx.db
      .select({ count: count() })
      .from(paymentMethods)
      .where(eq(paymentMethods.userId, ctx.session.user.id));

    return total[0]?.count ?? 0;
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'We were unable to get your payment methods. Please try again later.',
    });
  }
});
