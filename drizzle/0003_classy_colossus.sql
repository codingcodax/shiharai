CREATE TABLE IF NOT EXISTS "shiharai_payment_method" (
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
ALTER TABLE "shiharai_category" ADD COLUMN IF NOT EXISTS "description" text;--> statement-breakpoint
ALTER TABLE "shiharai_category" ADD COLUMN IF NOT EXISTS "color" text;--> statement-breakpoint
ALTER TABLE "shiharai_payment_method" ADD CONSTRAINT "shiharai_payment_method_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_category" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
ALTER TABLE "shiharai_category" DROP COLUMN IF EXISTS "expiration_date";--> statement-breakpoint
ALTER TABLE "shiharai_category" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "shiharai_category" DROP COLUMN IF EXISTS "is_default";--> statement-breakpoint
ALTER TABLE "shiharai_category" DROP COLUMN IF EXISTS "sort_order";
