import { TRPCError } from '@trpc/server';
import { eq, or } from 'drizzle-orm';
import { z } from 'zod';

import { user } from '~/server/db/schema';
import type { RouterOutputs } from '~/trpc/react';
import { protectedProcedure } from '../../trpc';

const schema = z.object({
	id: z.string().min(1).optional(),
	email: z.email().optional(),
});

export const get = protectedProcedure
	.input(schema)
	.query(async ({ input, ctx }) => {
		const { id, email } = input;

		const where =
			id && email
				? or(eq(user.id, id), eq(user.email, email))
				: email
					? eq(user.email, email)
					: eq(user.id, id ?? ctx.session.user.id);

		const [foundUser] = await ctx.db.select().from(user).where(where);

		if (!foundUser) {
			throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
		}
		return foundUser;
	});

export type GetUser = RouterOutputs['user']['get'];
