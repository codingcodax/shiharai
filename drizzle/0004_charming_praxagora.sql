CREATE TYPE "public"."shiharai_payment_type" AS ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'VENMO', 'CASH_APP', 'GOOGLE_PAY', 'APPLE_PAY', 'SAMSUNG_PAY', 'BANK_TRANSFER', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."shiharai_subscription_status" AS ENUM('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED');--> statement-breakpoint
ALTER TABLE "shiharai_payment_method" ALTER COLUMN "type" SET DEFAULT 'CREDIT_CARD';