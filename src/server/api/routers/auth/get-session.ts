import { protectedProcedure } from "../../trpc";

export const getSession = protectedProcedure.query(async ({ ctx }) => {
	return ctx.session;
});
