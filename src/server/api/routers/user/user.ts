import type { TRPCRouterRecord } from '@trpc/server';

import { getById } from './get-by-id';
import { update } from './update';

export const userRouter = {
  getById,

  update,
} satisfies TRPCRouterRecord;
