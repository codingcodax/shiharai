'use client';

import { SubscriptionStep, useNewSubscriptionContext } from './context';
import { DetailsStep } from './details-step';

export const NewSubscriptionForm = () => {
  const { currentStep } = useNewSubscriptionContext();

  return (
    <div className='space-y-6 p-4'>
      {currentStep === SubscriptionStep.DETAILS && <DetailsStep />}
    </div>
  );
};
