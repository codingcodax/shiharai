import { createTRPCRouter } from '../../trpc';
import { update } from './update';

export const userRouter = createTRPCRouter({
	update,
});
