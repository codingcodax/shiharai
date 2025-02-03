import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';

export const subscriptionRouter = {
  create,
} satisfies TRPCRouterRecord;
