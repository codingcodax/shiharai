'use client';

import { Progress } from '~/components/ui/progress';
import { BillingInfoStep } from './billing-info-step';
import { SubscriptionStep, useNewSubscriptionContext } from './context';
import { DetailsStep } from './details-step';
import { ReviewStep } from './review-step';

export const NewSubscriptionForm = () => {
  const { currentStep, steps } = useNewSubscriptionContext();

  return (
    <div className='space-y-6 p-4'>
      <div className='space-y-1'>
        <span>
          Step {steps.indexOf(currentStep) + 1} of {steps.length}
        </span>
        <Progress
          className='w-full'
          value={Number(
            (((steps.indexOf(currentStep) + 1) / steps.length) * 100).toFixed(
              2,
            ),
          )}
        />
      </div>

      {currentStep === SubscriptionStep.DETAILS && <DetailsStep />}
      {currentStep === SubscriptionStep.BILLING && <BillingInfoStep />}
      {currentStep === SubscriptionStep.REVIEW && <ReviewStep />}
    </div>
  );
};
