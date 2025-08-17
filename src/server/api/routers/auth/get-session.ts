import type { RouterOutputs } from '~/trpc/react';
import { protectedProcedure } from '../../trpc';

export const getSession = protectedProcedure.query(async ({ ctx }) => {
	return ctx.session;
});

export type GetSession = RouterOutputs['auth']['getSession'];
