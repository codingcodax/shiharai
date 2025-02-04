import { z } from 'zod';

export type NewSubscription = z.infer<typeof NewSubscription>;

export const NewSubscription = z.object({
  // details
  logo: z.string(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
  freeTrial: z.boolean(),
  trialDays: z.number(),
  tier: z.string(),
  notes: z.string(),
  url: z.string(),
  // billing info
  billingCycle: z.string(),
  nextBillingDate: z.date(),
  timezone: z.string(),
});

export type NewSubscriptionDetails = z.infer<typeof NewSubscriptionDetails>;
export const NewSubscriptionDetails = NewSubscription.pick({
  logo: true,
  name: true,
  price: true,
  currency: true,
  freeTrial: true,
  trialDays: true,
  tier: true,
  notes: true,
  url: true,
});
