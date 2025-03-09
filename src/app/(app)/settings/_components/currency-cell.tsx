'use client';

import { useState } from 'react';
import { CheckIcon } from 'lucide-react';

import {
  Cell,
  CellBody,
  CellGroup,
  Cells,
  CellTitle,
  CellValue,
} from '~/components/ui/cell';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { Skeleton } from '~/components/ui/skeleton';
import { toast } from '~/components/ui/sonner';
import { currencies } from '~/config/currencies';
import { api } from '~/trpc/react';

export const CurrencyCell = () => {
  const utils = api.useUtils();
  const [isCurrencyDrawerOpen, setIsCurrencyDrawerOpen] = useState(false);
  const { data: user, isLoading } = api.user.getById.useQuery({});
  const { mutate: updateCurrency } = api.user.update.useMutation({
    onSuccess: async () => {
      await utils.user.getById.invalidate();
      setIsCurrencyDrawerOpen(false);
      toast.success('Currency updated successfully', {
        id: 'currency-update',
      });
    },
    onMutate: async (data) => {
      toast.loading('Saving', { id: 'currency-update' });
      setIsCurrencyDrawerOpen(false);
      await utils.user.getById.cancel();

      const previousUser = utils.user.getById.getData();

      utils.user.getById.setData({}, (old) => ({
        ...old!,
        currency: data.currency ?? null,
      }));

      return { previousUser };
    },
    onError: (_err, _variables, context) => {
      utils.user.getById.setData({}, context?.previousUser);
      setIsCurrencyDrawerOpen(true);
      toast.error('Your currency could not be updated', {
        id: 'currency-update',
      });
    },
    onSettled: async () => {
      await utils.user.getById.invalidate();
    },
  });

  if (!user || isLoading)
    return (
      <Cell>
        <CellBody>
          <CellTitle>Default Currency</CellTitle>
        </CellBody>
        <CellBody>
          <Skeleton className='my-[5px] ml-auto h-3.5 w-16' />
        </CellBody>
      </Cell>
    );

  return (
    <Drawer open={isCurrencyDrawerOpen} onOpenChange={setIsCurrencyDrawerOpen}>
      <DrawerTrigger asChild>
        <Cell>
          <CellBody>
            <CellTitle>Default Currency</CellTitle>
          </CellBody>
          <CellBody>
            <CellValue>
              {
                currencies[(user.currency ?? 'USD') as keyof typeof currencies]
                  .name
              }
            </CellValue>
          </CellBody>
        </Cell>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Default Currency</DrawerTitle>
          <DrawerDescription>
            Change the default currency for your account.
          </DrawerDescription>
        </DrawerHeader>

        <div className='max-h-[40vh] overflow-y-auto'>
          <CellGroup>
            <Cells>
              {Object.entries(currencies).map(([name, value]) => (
                <Cell
                  key={name}
                  onClick={() => updateCurrency({ currency: name })}
                >
                  <CellBody>
                    <CellTitle className='space-x-2'>
                      <span>{value.name}</span>
                      <span className='text-xs text-grey-text'>
                        {name} ({value.symbol})
                      </span>
                    </CellTitle>
                  </CellBody>
                  {currencies[
                    (user.currency ?? 'USD') as keyof typeof currencies
                  ].name === value.name ? (
                    <CheckIcon />
                  ) : null}
                </Cell>
              ))}
            </Cells>
          </CellGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
