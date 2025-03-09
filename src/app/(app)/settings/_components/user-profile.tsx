import Image from 'next/image';
import { ChevronRightIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { api } from '~/trpc/server';

export const UserProfile = async () => {
  const user = await api.user.getById({});

  return (
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
  );
};

export const UserProfileSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <Skeleton className='size-20 rounded-full' />

      <div className='flex flex-col items-center justify-center'>
        <Skeleton className='my-1 h-5 w-24' />
        <Skeleton className='my-1 h-4 w-36' />
      </div>

      <Skeleton className='mt-4 h-9 w-[122.45px] rounded-lg' />
    </div>
  );
};
