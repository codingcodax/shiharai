DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shiharai_payment_method_status') THEN
    CREATE TYPE "public"."shiharai_payment_method_status" AS ENUM('ACTIVE', 'ARCHIVED', 'EXPIRED');
  END IF;
END $$;
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shiharai_payment_type') THEN
    CREATE TYPE "public"."shiharai_payment_type" AS ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'VENMO', 'CASH_APP', 'GOOGLE_PAY', 'APPLE_PAY', 'SAMSUNG_PAY', 'BANK_TRANSFER', 'OTHER');
  END IF;
END $$;
--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'shiharai_subscription_status') THEN
    CREATE TYPE "public"."shiharai_subscription_status" AS ENUM('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED', 'TRIALING');
  END IF;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shiharai_category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "shiharai_payment_type" DEFAULT 'CREDIT_CARD' NOT NULL,
	"expiration_date" timestamp,
	"status" "shiharai_payment_method_status" DEFAULT 'ACTIVE' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shiharai_subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"notes" text,
	"price" double precision NOT NULL,
	"currency" text NOT NULL,
	"billing_cycle" text NOT NULL,
	"next_billing_date" timestamp NOT NULL,
	"cancellation_date" timestamp,
	"free_tria" boolean DEFAULT false NOT NULL,
	"trial_days" integer DEFAULT 0 NOT NULL,
	"timezone" text NOT NULL,
	"status" "shiharai_subscription_status" DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shiharai_subscription_category" (
	"subscription_id" text NOT NULL,
	"category_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN IF NOT EXISTS "timezone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN IF NOT EXISTS "currency" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shiharai_category" ADD CONSTRAINT "shiharai_category_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_subscription" ADD CONSTRAINT "shiharai_subscription_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_subscription_category" ADD CONSTRAINT "shiharai_subscription_category_subscription_id_shiharai_subscription_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."shiharai_subscription"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_subscription_category" ADD CONSTRAINT "shiharai_subscription_category_category_id_shiharai_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."shiharai_category"("id") ON DELETE cascade ON UPDATE no action;
