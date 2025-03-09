import { Suspense } from 'react';

import {
  Cell,
  CellBody,
  CellGroup,
  Cells,
  CellTitle,
  CellValue,
} from '~/components/ui/cell';
import { ThemeCell } from './_components/theme-cell';
import { UserProfile, UserProfileSkeleton } from './_components/user-profile';

const Page = async () => {
  return (
    <div>
      <div className='grid h-12 grid-cols-3 items-center before:content-[""] after:content-[""]'>
        <h2 className='text-center text-base/5 font-medium'>Settings</h2>
      </div>

      <div className='py-4'>
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
        </Suspense>

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
