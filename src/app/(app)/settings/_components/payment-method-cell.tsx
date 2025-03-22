import Link from 'next/link';

import { Cell, CellBody, CellTitle, CellValue } from '~/components/ui/cell';
import { Skeleton } from '~/components/ui/skeleton';
import { api } from '~/trpc/server';

export const PaymentMethodCell = async () => {
  const paymentMethodsQty = await api.paymentMethod.qty();

  return (
    <Cell asChild>
      <Link href='/payment-methods'>
        <CellBody>
          <CellTitle>Payment Methods</CellTitle>
        </CellBody>
        <CellBody>
          <CellValue>{paymentMethodsQty}</CellValue>
        </CellBody>
      </Link>
    </Cell>
  );
};

export const PaymentMethodSkeleton = () => {
  return (
    <Cell asChild>
      <Link href='/payment-methods'>
        <CellBody>
          <CellTitle>Payment Methods</CellTitle>
        </CellBody>
        <CellBody>
          <Skeleton className='my-[5px] ml-auto h-3.5 w-2' />
        </CellBody>
      </Link>
    </Cell>
  );
};
