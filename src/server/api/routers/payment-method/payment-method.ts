import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';

export const paymentMethodRouter = {
  create,
} satisfies TRPCRouterRecord;
