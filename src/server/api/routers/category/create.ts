import { createInsertSchema } from 'drizzle-zod';

import { categories } from '~/server/db/schema/subscription';
import { protectedProcedure } from '../../trpc';

const schema = createInsertSchema(categories, {}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const create = protectedProcedure
  .input(schema)
  .mutation(async ({ input, ctx }) => {
    const { id: userId } = ctx.session.user;

    const category = ctx.db
      .insert(categories)
      .values({
        ...input,
        userId,
      })
      .returning();

    return category;
  });
