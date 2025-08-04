CREATE TABLE "expectations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"estimated_completion" timestamp NOT NULL,
	"is_done" boolean DEFAULT false NOT NULL,
	"done_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "expectations" ADD CONSTRAINT "expectations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "expectations_user_id_active_idx" ON "expectations" USING btree ("user_id") WHERE "expectations"."is_done" = false;--> statement-breakpoint
CREATE INDEX "expectations_user_id_idx" ON "expectations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "expectations_done_at_idx" ON "expectations" USING btree ("done_at");