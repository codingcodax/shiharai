import { relations } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  integer,
  json,
  pgEnum,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { createTable } from './_table';
import { users } from './auth';

export const statusEnum = pgEnum('shiharai_subscription_status', [
  'ACTIVE',
  'PAUSED',
  'CANCELLED',
  'EXPIRED',
]);

export const subscriptions = createTable('subscription', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  logo: varchar('logo', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  price: doublePrecision('price').notNull(),
  currency: varchar('currency', { length: 255 }).notNull(),
  billingCycle: json('cycle')
    .notNull()
    .default('{"time": "MONTHS", "every": 1}'),
  nextBillingDate: timestamp('bill_date', { mode: 'date', withTimezone: true }),
  cancellationDate: timestamp('cancel_date', {
    mode: 'date',
    withTimezone: true,
  }),
  freeTrial: boolean('free_trial').notNull().default(false),
  trialDays: integer('trial_days').notNull().default(0),
  timezone: varchar('timezone', { length: 255 }).notNull(),
  status: statusEnum('status').notNull().default('ACTIVE'),
  tier: varchar('tier', { length: 255 }),
  url: varchar('url', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const subscriptionsRelations = relations(
  subscriptions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [subscriptions.userId],
      references: [users.id],
    }),
    categories: many(categories),
  }),
);

export const categories = createTable('category', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  color: varchar('color', { length: 255 }),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, { fields: [categories.userId], references: [users.id] }),
  subscriptions: many(subscriptions),
}));

export const paymentTypeEnum = pgEnum('shiharai_payment_type', [
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

export const paymentMethods = createTable('payment_method', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  type: paymentTypeEnum('type').notNull().default('CREDIT_CARD'),
  label: varchar('name', { length: 255 }).notNull(),
  expirationDate: timestamp('expiration_date', {
    mode: 'date',
    withTimezone: true,
  }),
  isDefault: boolean('is_default').notNull().default(false),
  createdAt: timestamp('created_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    withTimezone: true,
  }).notNull(),
});

export const paymentMethodsRelations = relations(paymentMethods, ({ one }) => ({
  user: one(users, { fields: [paymentMethods.userId], references: [users.id] }),
}));
