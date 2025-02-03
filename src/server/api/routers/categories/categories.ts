import type { TRPCRouterRecord } from '@trpc/server';

import { create } from './create';

export const categoriesRouter = {
  create,
} satisfies TRPCRouterRecord;
