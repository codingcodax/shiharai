import { publicProcedure } from '../../trpc';

export const getSession = publicProcedure.query(({ ctx }) => ctx.session);
