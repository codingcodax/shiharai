import { useAction } from 'next-safe-action/hooks';

import { Spinner } from '~/components/icons/spinner';
import { Button } from '~/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { toast } from '~/components/ui/sonner';
import { api } from '~/trpc/react';
import { newPaymentMethod } from './actions';
import { NewPaymentMethodForm } from './new-payment-method-form';

export const NewPaymentMethodDrawer = ({
  children,
}: React.PropsWithChildren) => {
  const utils = api.useUtils();
  const { execute: createPaymentMethod, isPending } = useAction(
    newPaymentMethod,
    {
      onSuccess: async () => {
        await utils.paymentMethod.getAll.invalidate();
      },
      onError: () => {
        toast.error('An error occurred while creating the payment method.');
      },
    },
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Create a payment method</DrawerTitle>
          <DrawerDescription>
            Add the information of the payment method for this subscription.
          </DrawerDescription>
        </DrawerHeader>

        <NewPaymentMethodForm createPaymentMethodAction={createPaymentMethod} />

        <DrawerFooter>
          <Button
            className='w-full'
            disabled={isPending}
            form='new-payment-method-form'
            type='submit'
          >
            {isPending && <Spinner />}
            Create
          </Button>
          <DrawerClose asChild>
            <Button className='w-full' variant='outline'>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
