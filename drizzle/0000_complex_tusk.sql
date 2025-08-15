CREATE TABLE "shiharai_account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shiharai_session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "shiharai_session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "shiharai_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "shiharai_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "shiharai_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "shiharai_account" ADD CONSTRAINT "shiharai_account_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shiharai_session" ADD CONSTRAINT "shiharai_session_user_id_shiharai_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."shiharai_user"("id") ON DELETE cascade ON UPDATE no action;
