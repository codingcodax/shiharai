import { createTRPCRouter } from '../../trpc';
import { get } from './get';
import { update } from './update';

export const userRouter = createTRPCRouter({
	get,

	update,
});
