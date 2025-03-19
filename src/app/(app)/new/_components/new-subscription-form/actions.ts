'use server';

import { TRPCError } from '@trpc/server';

import { action } from '~/app/lib/safe-action';
import { api } from '~/trpc/server';
import { NewPaymentMethod, NewSubscription } from './schema';

export const newPaymentMethod = action
  .schema(NewPaymentMethod)
  .action(async ({ parsedInput: input }) => {
    try {
      await api.paymentMethod.create(input);
    } catch (error) {
      if (!(error instanceof TRPCError)) throw error;

      switch (error.code) {
        case 'NOT_FOUND':
          return { error: 'No se encontró el color.' };
        default:
          return { error: 'Ha ocurrido un error.' };
      }
    }
  });

export const newSubscription = action
  .schema(NewSubscription)
  .action(async ({ parsedInput: input }) => {
    try {
      await api.sub.create(input);
    } catch (error) {
      if (!(error instanceof TRPCError)) throw error;

      switch (error.code) {
        case 'NOT_FOUND':
          return { error: 'No se encontró el color.' };
        default:
          return { error: 'Ha ocurrido un error.' };
      }
    }
  });
