'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { type NewSubscription } from './schema';

const STORAGE_KEY = 'new-subscription-form-data';

export enum SubscriptionStep {
  DETAILS = 'DETAILS',
  BILLING = 'BILLING',
  REVIEW = 'REVIEW',
}

type NewSubscriptionContext = {
  formData: NewSubscription;
  updateFormData: (data: Partial<NewSubscription>) => void;
  clearFormData: () => void;
  currentStep: SubscriptionStep;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: SubscriptionStep) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  steps: SubscriptionStep[];
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
    freeTrial: false,
    trialDays: 0,
    timezone: 'America/Mexico_City',
    tier: '',
    url: '',
    notes: '',
    paymentMethodId: '',
  };

  const steps = [
    SubscriptionStep.DETAILS,
    SubscriptionStep.BILLING,
    SubscriptionStep.REVIEW,
  ];

  const [formData, setFormData] = useState<NewSubscription>(initialFormData);
  const [currentStep, setCurrentStep] = useState<SubscriptionStep>(steps[0]!);
  const [, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as NewSubscription;
      const convertedNextBillingDate = new Date(parsed.nextBillingDate);
      setFormData({ ...parsed, nextBillingDate: convertedNextBillingDate });
    }
  }, []);

  const updateFormData = (data: Partial<NewSubscription>) => {
    const updatedFormData = { ...formData, ...data };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFormData));
    }
    setFormData(updatedFormData);
  };

  const clearFormData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setFormData(initialFormData);
    setCurrentStep(steps[0]!);
  };

  const getCurrentStepIndex = () => steps.indexOf(currentStep);

  const nextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]!);
    }
  };

  const prevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]!);
    }
  };

  const setStep = (step: SubscriptionStep) => {
    if (steps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const isFirstStep = getCurrentStepIndex() === 0;
  const isLastStep = getCurrentStepIndex() === steps.length - 1;

  return (
    <NewSubscriptionContext.Provider
      value={{
        formData,
        updateFormData,
        clearFormData,
        currentStep,
        nextStep,
        prevStep,
        setStep,
        isFirstStep,
        isLastStep,
        steps,
      }}
    >
      {children}
    </NewSubscriptionContext.Provider>
  );
};
