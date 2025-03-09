'use client';

import { useEffect, useState } from 'react';

import { NewSubscriptionForm } from './_components/new-subscription-form';

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return <div />;

  return (
    <div className='pb-[59px]'>
      <NewSubscriptionForm />
    </div>
  );
};

export default Page;
