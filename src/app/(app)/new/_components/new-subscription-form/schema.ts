import { z } from 'zod';

export type NewSubscription = z.infer<typeof NewSubscription>;
export const NewSubscription = z.object({
  // details
  logo: z.string().url({ message: 'Enter a valid URL' }),
  name: z
    .string({ message: 'Enter the name of your subscription' })
    .min(2, 'Enter the name of your subscription'),
  price: z
    .number({ message: 'Enter the price of your subscription' })
    .min(1, { message: 'Enter the price of your subscription' }),
  currency: z.string({ message: 'Select a currency' }),
  freeTrial: z.boolean(),
  trialDays: z.number(),
  tier: z.string(),
  notes: z.string(),
  url: z.string().refine(
    (val) => {
      if (val === '') {
        return true; // Skip URL validation if empty
      }
      try {
        new URL(val); // Basic URL check
        return true;
      } catch {
        return false;
      }
    },
    {
      message: 'Enter a valid URL',
    },
  ),
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
}).refine(
  (data) => {
    if (data.freeTrial && data.trialDays < 1) {
      return false;
    }
    return true;
  },
  {
    message: 'Enter your free trial days',
    path: ['trialDays'],
  },
);

export type NewSubscriptionBillingInfo = z.infer<
  typeof NewSubscriptionBillingInfo
>;
export const NewSubscriptionBillingInfo = NewSubscription.pick({
  billingCycle: true,
  nextBillingDate: true,
  timezone: true,
});
