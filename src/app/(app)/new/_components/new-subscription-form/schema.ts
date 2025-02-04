import { z } from 'zod';

export type NewSubscription = z.infer<typeof NewSubscription>;

export const NewSubscription = z.object({
  logo: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  billingCycle: z.string(),
  nextBillingDate: z.date(),
  cancellationDate: z.date(),
  freeTrial: z.boolean(),
  trialDays: z.number(),
  timezone: z.string(),
  status: z.enum(['ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED']),
  tier: z.string(),
  url: z.string(),
  notes: z.string(),
});
