import { createInsertSchema } from 'drizzle-zod';

import { paymentMethods } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

const schema = createInsertSchema(paymentMethods, {}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const create = protectedProcedure
  .input(schema)
  .mutation(async ({ input, ctx }) => {
    const { id: userId } = ctx.session.user;

    const paymentMethod = ctx.db
      .insert(paymentMethods)
      .values({
        ...input,
        userId,
      })
      .returning();

    return paymentMethod;
  });
