import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';

export const categoryRouter = {
  create,
} satisfies TRPCRouterRecord;
