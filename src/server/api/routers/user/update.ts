import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { user } from '~/server/db/schema';
import { protectedProcedure } from '../../trpc';

const schema = z.object({
	id: z.string().min(1).optional(),
	name: z.string().optional(),
	email: z.email().optional(),
	emailVerified: z.boolean().optional(),
	image: z.string().optional(),
	timezone: z.string().optional(),
	currency: z.string().optional(),
});

export const update = protectedProcedure
	.input(schema)
	.mutation(async ({ input, ctx }) => {
		const { id, ...updateFields } = input;

		const userId = id ?? ctx.session.user.id;

		const validUpdates = Object.fromEntries(
			Object.entries(updateFields).filter(([_, v]) => v !== undefined),
		);

		if (Object.keys(validUpdates).length === 0) {
			throw new Error('No fields provided to update.');
		}

		await ctx.db.update(user).set(validUpdates).where(eq(user.id, userId));

		return { success: true };
	});
