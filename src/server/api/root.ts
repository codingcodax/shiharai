import { authRouter } from '~/server/api/routers/auth';
import { categoryRouter } from '~/server/api/routers/category';
import { paymentMethodRouter } from '~/server/api/routers/payment-method';
import { subscriptionRouter } from '~/server/api/routers/subscription';
import { userRouter } from '~/server/api/routers/user';
import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  category: categoryRouter,
  paymentMethod: paymentMethodRouter,
  subscription: subscriptionRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
