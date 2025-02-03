CREATE TYPE "public"."shiharai_payment_type" AS ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'VENMO', 'CASH_APP', 'GOOGLE_PAY', 'APPLE_PAY', 'SAMSUNG_PAY', 'BANK_TRANSFER', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."shiharai_subscription_status" AS ENUM('ACTIVE', 'PAUSED', 'CANCELLED', 'EXPIRED');--> statement-breakpoint
CREATE TABLE "shiharai_account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "shiharai_account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE "shiharai_session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shiharai_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"timezone" varchar(255),
	"currency" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shiharai_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "shiharai_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "shiharai_category" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shiharai_payment_method" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"type" "shiharai_payment_type" DEFAULT 'CREDIT_CARD' NOT NULL,
	"name" varchar(255) NOT NULL,
	"expiration_date" timestamp with time zone,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shiharai_subscription" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"logo" varchar(255),
	"name" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"currency" varchar(255) NOT NULL,
	"cycle" json DEFAULT '{"time": "MONTHS", "every": 1}' NOT NULL,
	"bill_date" timestamp with time zone,
	"cancel_date" timestamp with time zone,
	"free_trial" boolean DEFAULT false NOT NULL,
	"trial_days" integer DEFAULT 0 NOT NULL,
	"timezone" varchar(255) NOT NULL,
	"status" "shiharai_subscription_status" DEFAULT 'ACTIVE' NOT NULL,
	"tier" varchar(255),
	"url" varchar(255),
	"notes" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shiharai_account" ADD CONSTRAINT "shiharai_account_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_session" ADD CONSTRAINT "shiharai_session_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_category" ADD CONSTRAINT "shiharai_category_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_payment_method" ADD CONSTRAINT "shiharai_payment_method_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_subscription" ADD CONSTRAINT "shiharai_subscription_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "shiharai_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "shiharai_session" USING btree ("user_id");