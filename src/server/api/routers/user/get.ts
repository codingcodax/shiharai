import { TRPCError } from '@trpc/server';
import { eq, or } from 'drizzle-orm';
import { z } from 'zod';

import { user } from '~/server/db/schema';
import { protectedProcedure } from '../../trpc';

const schema = z.object({
	id: z.string().min(1).optional(),
	email: z.email().optional(),
});

export const get = protectedProcedure
	.input(schema)
	.query(async ({ input, ctx }) => {
		const { id, email } = input;
		if (!id && !email) {
			throw new TRPCError({
				code: 'BAD_REQUEST',
				message: 'Either id or email must be provided.',
			});
		}

		const whereClause =
			id && email
				? or(eq(user.id, id), eq(user.email, email))
				: id
					? eq(user.id, id)
					: eq(user.email, email ?? '');

		const foundUser = await ctx.db
			.select()
			.from(user)
			.where(whereClause)
			.limit(1);

		if (!foundUser[0]) {
			throw new Error('User not found.');
		}
		return foundUser;
	});
