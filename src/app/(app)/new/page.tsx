'use client';

import dynamic from 'next/dynamic';

const NewSubscriptionForm = dynamic(
  () =>
    import('./_components/new-subscription-form').then(
      (mod) => mod.NewSubscriptionForm,
    ),
  {
    ssr: false,
    loading: () => (
      <div>
        <p>here will go the skeleton</p>
      </div>
    ),
  },
);

const Page = () => {
  return (
    <div className='pb-[59px]'>
      <NewSubscriptionForm />
    </div>
  );
};

export default Page;
