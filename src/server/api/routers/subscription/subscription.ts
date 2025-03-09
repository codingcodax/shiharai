import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';
import { getAll } from './get-all';

export const subscriptionRouter = {
  getAll,

  create,
} satisfies TRPCRouterRecord;
