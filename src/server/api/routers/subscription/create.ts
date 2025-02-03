import { createInsertSchema } from 'drizzle-zod';

import { subscriptions } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

const schema = createInsertSchema(subscriptions, {}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const create = protectedProcedure
  .input(schema)
  .mutation(async ({ input, ctx }) => {
    const { id: userId } = ctx.session.user;

    const subscription = ctx.db
      .insert(subscriptions)
      .values({
        ...input,
        userId,
      })
      .returning();

    return subscription;
  });
