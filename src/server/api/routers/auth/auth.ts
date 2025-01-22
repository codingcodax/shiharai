import type { TRPCRouterRecord } from '@trpc/server';

import { getSession } from './get-session';
import { signOut } from './sign-out';

export const authRouter = {
  signOut,
  getSession,
} satisfies TRPCRouterRecord;
