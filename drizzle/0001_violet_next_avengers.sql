CREATE TABLE IF NOT EXISTS "shiharai_category" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"color" varchar(255),
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shiharai_payment_method" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"type" "type" NOT NULL,
	"name" varchar(255) NOT NULL,
	"expiration_date" timestamp with time zone,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shiharai_subscription" (
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
	"status" "status" DEFAULT 'ACTIVE' NOT NULL,
	"tier" varchar(255),
	"url" varchar(255),
	"notes" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN "timezone" varchar(255);--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN "currency" varchar(255);--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN "created_at" timestamp with time zone NOT NULL;--> statement-breakpoint
ALTER TABLE "shiharai_user" ADD COLUMN "updated_at" timestamp with time zone NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shiharai_category" ADD CONSTRAINT "shiharai_category_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shiharai_payment_method" ADD CONSTRAINT "shiharai_payment_method_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shiharai_subscription" ADD CONSTRAINT "shiharai_subscription_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
