'use server';

import { revalidatePath } from 'next/cache';
import { TRPCError } from '@trpc/server';

import { returnValidationErrors } from 'next-safe-action';
import { action } from '~/lib/safe-action';
import { api } from '~/trpc/server';
import { UpdateCurrency } from './schema';

export const updateCurrency = action
	.inputSchema(UpdateCurrency)
	.action(async ({ parsedInput: { currency } }) => {
		try {
			await api.user.update({ currency });
			revalidatePath('/settings');

			return currency;
		} catch (error) {
			if (!(error instanceof TRPCError))
				return returnValidationErrors(UpdateCurrency, {
					_errors: ['Something went wrong'],
				});

			return returnValidationErrors(UpdateCurrency, {
				_errors: [error.message],
			});
		}
	});
