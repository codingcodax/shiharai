import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

import { paymentMethods } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

export const getAll = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.db.query.paymentMethods.findMany({
      where: eq(paymentMethods.userId, ctx.session.user.id),
    });
  } catch {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'We were unable to get your payment methods. Please try again later.',
    });
  }
});
