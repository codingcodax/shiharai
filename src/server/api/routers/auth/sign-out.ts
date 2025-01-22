import { invalidateSessionToken } from '~/server/auth';
import { protectedProcedure } from '../../trpc';

export const signOut = protectedProcedure.mutation(async (opts) => {
  if (!opts.ctx.token) return { success: false };

  await invalidateSessionToken(opts.ctx.token);

  return { success: true };
});
