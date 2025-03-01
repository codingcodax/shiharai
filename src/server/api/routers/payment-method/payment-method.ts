import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';
import { getAll } from './get-all';

export const paymentMethodRouter = {
  getAll,

  create,
} satisfies TRPCRouterRecord;
