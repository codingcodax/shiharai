import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import {
  Cell,
  CellBody,
  CellGroup,
  Cells,
  CellTitle,
  CellValue,
} from '~/components/ui/cell';
import { api } from '~/trpc/server';
import { ThemeCell } from './_components/theme-cell';

const Page = async () => {
  const user = await api.user.getById({});

  return (
    <div>
      <div className='grid h-12 grid-cols-3 items-center before:content-[""] after:content-[""]'>
        <h2 className='text-center text-base/5 font-medium'>Settings</h2>
      </div>

      <div className='py-4'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <Image
            alt={`${user.name} avatar`}
            className='size-20 rounded-full border'
            height={250}
            src={user.image ?? ''}
            width={250}
          />

          <div className='text-center'>
            <h2 className='text-xl font-semibold'>{user.name}</h2>
            <p className='text-grey-text'>{user.email}</p>
          </div>

          <Button>
            Edit profile <ChevronRightIcon />
          </Button>
        </div>

        <div className='mt-10'>
          <CellGroup>
            <Cells>
              <Cell>
                <CellBody>
                  <CellTitle>Default Currency</CellTitle>
                </CellBody>
                <CellBody>
                  <CellValue>Mexican Peso</CellValue>
                </CellBody>
              </Cell>

              <ThemeCell />
            </Cells>
          </CellGroup>
        </div>
      </div>
    </div>
  );
};

export default Page;
