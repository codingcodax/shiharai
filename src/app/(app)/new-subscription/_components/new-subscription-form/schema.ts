import z from 'zod';

export type NewSubscription = z.infer<typeof NewSubscription>;
export const NewSubscription = z.object({
	// core info
	name: z.string({ error: 'Please enter a name' }),
	tier: z.string().optional(),
	url: z.url().optional(),
	categories: z.array(z.string()).optional(),
	price: z.number(),
	currency: z.string({ error: 'Pick a currency please' }),
	billingCycle: z.string({ error: 'Let us know how often you are billed' }),

	// details & billing
	freeTrial: z.boolean().optional(),
	trialDays: z.number().optional(),
	nextBillingDate: z.date({ error: 'Select the next billing date' }),
	timezone: z.string({ error: 'Pick the timezone of your subscription' }),
	paymentMethod: z.string({ error: 'Choose a payment method' }),
	notes: z.string().optional(),
});

export type NewSubscriptionCoreInfo = z.infer<typeof NewSubscriptionCoreInfo>;
export const NewSubscriptionCoreInfo = NewSubscription.pick({
	name: true,
	tier: true,
	url: true,
	categories: true,
	price: true,
	currency: true,
	billingCycle: true,
});

export type NewSubscriptionDetailsAndBilling = z.infer<
	typeof NewSubscriptionDetailsAndBilling
>;
export const NewSubscriptionDetailsAndBilling = NewSubscription.pick({
	freeTrial: true,
	trialDays: true,
	nextBillingDate: true,
	timezone: true,
	paymentMethod: true,
	notes: true,
}).refine(
	(data) => {
		if (data.freeTrial && data.trialDays) {
			return data.trialDays > 0;
		}
		return true;
	},
	{
		message: 'You must choose a trial period',
		path: ['trialDays'],
	},
);
