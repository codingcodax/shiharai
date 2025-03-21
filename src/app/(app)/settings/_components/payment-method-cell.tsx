import Link from 'next/link';

import { Cell, CellBody, CellTitle, CellValue } from '~/components/ui/cell';

export const PaymentMethodCell = () => {
  return (
    <Cell asChild>
      <Link href='/payment-methods'>
        <CellBody>
          <CellTitle>Payment Methods</CellTitle>
        </CellBody>
        <CellBody>
          <CellValue>3</CellValue>
        </CellBody>
      </Link>
    </Cell>
  );
};
