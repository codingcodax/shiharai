import type { TRPCRouterRecord } from '@trpc/server';

import { getById } from './get-by-id';

export const userRouter = {
  getById,
} satisfies TRPCRouterRecord;
