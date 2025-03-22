import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';
import { getAll } from './get-all';
import { qty } from './qty';

export const paymentMethodRouter = {
  qty,
  getAll,

  create,
} satisfies TRPCRouterRecord;
