import {
	boolean,
	doublePrecision,
	integer,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

import { createEnum, createTable } from './_table';
import { user } from './auth';

export const paymentMethodsStatus = createEnum('payment_method_status', [
	'ACTIVE',
	'ARCHIVED',
	'EXPIRED',
]);

export const paymentType = createEnum('payment_type', [
	'CREDIT_CARD',
	'DEBIT_CARD',
	'PAYPAL',
	'VENMO',
	'CASH_APP',
	'GOOGLE_PAY',
	'APPLE_PAY',
	'SAMSUNG_PAY',
	'BANK_TRANSFER',
	'OTHER',
]);

export const subscriptionStatus = createEnum('subscription_status', [
	'ACTIVE',
	'PAUSED',
	'CANCELLED',
	'EXPIRED',
	'TRIALING',
]);

export const category = createTable('category', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	color: text('color'), // HEX or color name
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const paymentMethod = createTable('payment_method', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: paymentType('type').default('CREDIT_CARD').notNull(),
	expirationDate: timestamp('expiration_date'), // NOTE: only for credit/debit cards
	status: paymentMethodsStatus('status').default('ACTIVE').notNull(),
	isDefault: boolean('is_default').default(false).notNull(),
	sortOrder: integer('sort_order').default(0).notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const subscription = createTable('subscription', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	url: text('url'),
	tier: text('tier'),
	notes: text('notes'),
	price: doublePrecision('price').notNull(),
	currency: text('currency').notNull(),
	billingCycle: text('billing_cycle').notNull(),
	nextBillingDate: timestamp('next_billing_date').notNull(),
	cancellationDate: timestamp('cancellation_date'),
	freeTria: boolean('free_tria').default(false).notNull(),
	trialDays: integer('trial_days').default(0).notNull(),
	timezone: text('timezone').notNull(),
	status: subscriptionStatus('status').default('ACTIVE').notNull(),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	updatedAt: timestamp('updated_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const subscriptionCategory = createTable('subscription_category', {
	subscriptionId: text('subscription_id')
		.notNull()
		.references(() => subscription.id, { onDelete: 'cascade' }),
	categoryId: text('category_id')
		.notNull()
		.references(() => category.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at')
		.$defaultFn(() => /* @__PURE__ */ new Date())
		.notNull(),
});
