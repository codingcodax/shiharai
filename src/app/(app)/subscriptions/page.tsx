import Image from 'next/image';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { GOOGLE_FAVICON_URL } from '~/config/misc';
import { api } from '~/trpc/server';
import { getApexDomain } from '~/utils/domains';

const Page = async () => {
  const subscriptions = await api.subscription.getAll();

  return (
    <div>
      <div className='grid h-12 grid-cols-[1fr_auto_1fr] items-center before:content-[""] after:content-[""]'>
        <h2 className='text-center text-base/5 font-medium'>
          My Subscriptions
        </h2>
      </div>

      <div className='p-4'>
        <Accordion className='space-y-4' type='multiple'>
          {subscriptions.map((subscription) => (
            <AccordionItem
              key={subscription.id}
              className='rounded-xl'
              value={subscription.id}
            >
              <AccordionTrigger className='p-4 [&>svg]:hidden'>
                <div className='flex w-full items-center justify-between space-x-2'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-x-0.5'>
                      <Image
                        alt={`${subscription.name} logo`}
                        className='size-5 object-cover'
                        height={24}
                        src={`${GOOGLE_FAVICON_URL}${getApexDomain(
                          subscription.url ?? '',
                        )}`}
                        width={24}
                      />
                      <p className='text-lg font-medium'>{subscription.name}</p>
                    </div>
                    <p className='text-sm text-grey-text'>
                      {subscription.tier}
                    </p>
                  </div>

                  <div className='flex flex-col'>
                    <p className='text-end leading-7'>
                      {Intl.NumberFormat(navigator.language, {
                        style: 'currency',
                        currency: subscription.currency,
                        minimumFractionDigits: 2,
                      }).format(subscription.price)}
                    </p>
                    <p className='text-end text-sm text-grey-text'>monthly</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className='border-t border-dashed'>
                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                  <p className='text-sm text-grey-text-contrast'>
                    Next Billing Date
                  </p>
                  <p className='text-end text-sm'>
                    {new Date(
                      subscription.nextBillingDate ?? '',
                    ).toLocaleDateString()}
                  </p>
                  <p className='text-sm text-grey-text-contrast'>
                    Payment Method
                  </p>
                  <p className='text-end text-sm'>
                    {subscription.paymentMethod?.label}
                  </p>
                </div>

                <div className='mt-4 flex gap-x-4'>
                  <Button disabled className='w-full' variant='outline'>
                    Unsubscribe
                  </Button>
                  <Button disabled className='w-full'>
                    Edit
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;
