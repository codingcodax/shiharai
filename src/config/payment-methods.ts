type PaymentMethodType = {
	value:
		| 'CREDIT_CARD'
		| 'DEBIT_CARD'
		| 'PAYPAL'
		| 'VENMO'
		| 'CASH_APP'
		| 'GOOGLE_PAY'
		| 'APPLE_PAY'
		| 'SAMSUNG_PAY'
		| 'BANK_TRANSFER'
		| 'OTHER';
	label: string;
};

export const paymentMethodTypes: PaymentMethodType[] = [
	{ value: 'CREDIT_CARD', label: 'Credit Card' },
	{ value: 'DEBIT_CARD', label: 'Debit Card' },
	{ value: 'PAYPAL', label: 'PayPal' },
	{ value: 'VENMO', label: 'Venmo' },
	{ value: 'CASH_APP', label: 'Cash App' },
	{ value: 'GOOGLE_PAY', label: 'Google Pay' },
	{ value: 'APPLE_PAY', label: 'Apple Pay' },
	{ value: 'SAMSUNG_PAY', label: 'Samsung Pay' },
	{ value: 'BANK_TRANSFER', label: 'Bank Transfer' },
	{ value: 'OTHER', label: 'Other' },
];
