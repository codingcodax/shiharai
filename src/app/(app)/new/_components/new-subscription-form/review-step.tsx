'use client';

import { useRouter } from 'next/navigation';
import { clsx } from 'clsx/lite';
import { useAction } from 'next-safe-action/hooks';

import { Spinner } from '~/components/icons/spinner';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { toast } from '~/components/ui/sonner';
import { api } from '~/trpc/react';
import { newSubscription } from './actions';
import { SubscriptionStep, useNewSubscriptionContext } from './context';

export const ReviewStep = () => {
  const router = useRouter();
  const { data: paymentMethods, isLoading: paymentMethodsIsLoading } =
    api.paymentMethod.getAll.useQuery();
  const { formData, prevStep, setStep, clearFormData } =
    useNewSubscriptionContext();
  const utils = api.useUtils();
  const { execute: createSubscription, isPending } = useAction(
    newSubscription,
    {
      onSuccess: async () => {
        router.push('/subscriptions');
        await utils.sub.getAll.invalidate();
        toast.success('Subscription created successfully.');
        clearFormData();
      },
      onError: () => {
        toast.error('An error occurred while creating the subscription.');
      },
    },
  );

  const handleCreateSubscription = () => {
    createSubscription(formData);
  };

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h2 className='text-xl font-bold'>Review</h2>
        <p className='text-wrap text-grey-text'>
          Please review your subscription information.
        </p>
      </div>

      <div className='space-y-8'>
        <div className='space-y-4'>
          <div className='w-full rounded-lg border'>
            <div className='flex items-center justify-between pl-4'>
              <h3 className='text-sm font-medium text-grey-text-contrast'>
                Details
              </h3>
              <Button
                className={clsx(
                  'h-10 rounded-l-none px-4 font-medium',
                  'disabled:text-grey-text disabled:line-through',
                )}
                variant='ghost'
                onClick={() => setStep(SubscriptionStep.DETAILS)}
              >
                Edit
              </Button>
            </div>

            <div className='space-y-4 p-4'>
              <div className='grid grid-cols-3 gap-2'>
                <p className='text-sm text-grey-text-contrast'>Name</p>
                <p className='col-span-2 text-end text-sm text-grey-text'>
                  {formData.name}
                </p>

                <p className='text-sm text-grey-text-contrast'>Price</p>
                <p className='col-span-2 text-end text-sm text-grey-text'>
                  {Intl.NumberFormat(navigator.language, {
                    style: 'currency',
                    currency: formData.currency,
                    minimumFractionDigits: 2,
                  }).format(formData.price)}
                </p>
                {formData.trialDays > 0 ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>
                      Trial Ends
                    </p>
                    <p className='col-span-2 text-end text-sm text-grey-text'>
                      {new Date(
                        new Date().getTime() +
                          formData.trialDays * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()}
                    </p>
                  </>
                ) : null}
                {formData.tier ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>Tier</p>
                    <p className='col-span-2 text-end text-sm text-grey-text'>
                      {formData.tier}
                    </p>
                  </>
                ) : null}
                {formData.notes ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>Notes</p>
                    <p className='col-span-2 text-end text-sm text-grey-text'>
                      {formData.notes}
                    </p>
                  </>
                ) : null}
                {formData.url ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>URL</p>
                    <p className='col-span-2 truncate text-end text-sm text-grey-text'>
                      {formData.url}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className='w-full rounded-lg border'>
            <div className='flex items-center justify-between pl-4'>
              <h3 className='text-sm font-medium text-grey-text-contrast'>
                Billing Info
              </h3>
              <Button
                className={clsx(
                  'h-10 rounded-l-none px-4 font-medium',
                  'disabled:text-grey-text disabled:line-through',
                )}
                variant='ghost'
                onClick={() => setStep(SubscriptionStep.BILLING)}
              >
                Edit
              </Button>
            </div>

            <div className='space-y-4 p-4'>
              <div className='grid grid-cols-2 gap-2'>
                <p className='text-sm text-grey-text-contrast'>Billing Cycle</p>
                <p className='text-end text-sm text-grey-text'>
                  {formData.billingCycle}
                </p>

                <p className='text-sm text-grey-text-contrast'>
                  Next Billing Date
                </p>
                <p className='text-end text-sm text-grey-text'>
                  {new Date(formData.nextBillingDate).toLocaleDateString()}
                </p>

                {paymentMethodsIsLoading ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>
                      Payment Method
                    </p>
                    <Skeleton className='my-[3px] ml-auto h-3.5 w-10' />
                  </>
                ) : null}

                {paymentMethods && paymentMethods?.length > 0 ? (
                  <>
                    <p className='text-sm text-grey-text-contrast'>
                      Payment Method
                    </p>
                    <p className='text-end text-sm text-grey-text'>
                      {
                        paymentMethods.find(
                          (paymentMethod) =>
                            paymentMethod.id === formData.paymentMethodId,
                        )?.label
                      }
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className='flex gap-x-2'>
          <Button className='flex-1' variant='outline' onClick={prevStep}>
            Previous
          </Button>
          <Button
            className='flex-1'
            disabled={isPending}
            onClick={handleCreateSubscription}
          >
            {isPending && <Spinner />}
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};
