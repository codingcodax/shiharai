import z from 'zod';

export type UpdateCurrency = z.infer<typeof UpdateCurrency>;
export const UpdateCurrency = z.object({
	currency: z.string().min(1),
});
