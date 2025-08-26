/** biome-ignore-all lint/style/noNonNullAssertion: the step is not null */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { NewSubscription } from './schema';

const STORAGE_KEY = 'new-subscription-form-data';

export enum SubscriptionStep {
	CORE_INFO = 'CORE_INFO',
	DETAILS_AND_BILLING = 'DETAILS_AND_BILLING',
}

const steps = [
	SubscriptionStep.CORE_INFO,
	SubscriptionStep.DETAILS_AND_BILLING,
];

export type NewSubscriptionContext = {
	formData: NewSubscription;
	updateFormData: (data: Partial<NewSubscription>) => void;
	clearFormData: () => void;
	currentStep: SubscriptionStep;
	nextStep: () => void;
	prevStep: () => void;
	setStep: (step: SubscriptionStep) => void;
	steps: SubscriptionStep[];
};

export const useNewSubscriptionContext = (): NewSubscriptionContext => {
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
		name: '',
		tier: '',
		url: '',
		categories: [],
		price: 0,
		currency: 'USD',
		billingCycle: 'monthly',
		freeTrial: false,
		trialDays: 0,
		nextBillingDate: new Date(),
		timezone: 'America/New_York',
		paymentMethod: 'credit_card',
		notes: '',
	};

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
		const updatedData = { ...formData, ...data };

		if (typeof window !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
		}

		setFormData(updatedData);
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

	return (
		<NewSubscriptionContext.Provider
			value={{
				formData,
				updateFormData,
				clearFormData,
				currentStep,
				nextStep,
				prevStep,
				setStep: (step: SubscriptionStep) => {
					setCurrentStep(step);
				},
				steps,
			}}
		>
			{children}
		</NewSubscriptionContext.Provider>
	);
};
