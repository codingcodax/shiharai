'use client';

import { createContext, useContext, useState } from 'react';

import { type NewSubscription } from './schema';

const STORAGE_KEY = 'new-subscription-form-data';

type NewSubscriptionContext = {
  formData: NewSubscription;
  updateFormData: (data: Partial<NewSubscription>) => void;
  clearFormData: () => void;
};

export const useNewSubscriptionContext = () => {
  const context = useContext(NewSubscriptionContext);

  if (!context) {
    throw new Error(
      '"useNewSubscriptionContext" must be used within a "NewSubscriptionContextProvider"',
    );
  }

  return context;
};

export const NewSubscriptionContext = createContext<
  NewSubscriptionContext | undefined
>(undefined);

export const NewSubscriptionContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const initialFormData: NewSubscription = {
    logo: '',
    name: '',
    price: 0,
    currency: 'USD',
    billingCycle: 'MONTHS',
    nextBillingDate: new Date(),
    cancellationDate: new Date(),
    freeTrial: false,
    trialDays: 0,
    timezone: 'UTC',
    status: 'ACTIVE',
    tier: '',
    url: '',
    notes: '',
  };

  const [formData, setFormData] = useState<NewSubscription>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as NewSubscription) : initialFormData;
  });

  const updateFormData = (data: Partial<NewSubscription>) => {
    const updatedFormData = { ...formData, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFormData));
    setFormData(updatedFormData);
  };

  const clearFormData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
  };

  return (
    <NewSubscriptionContext.Provider
      value={{
        formData,
        updateFormData,
        clearFormData,
      }}
    >
      {children}
    </NewSubscriptionContext.Provider>
  );
};
