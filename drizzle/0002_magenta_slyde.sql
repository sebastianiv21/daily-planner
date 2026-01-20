CREATE TABLE "reflection" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"date" date NOT NULL,
	"content" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shutdown_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"date" date NOT NULL,
	"started_at" timestamp NOT NULL,
	"completed_at" timestamp,
	"reflection_id" text,
	"stats" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"daily_shutdown_enabled" boolean DEFAULT true NOT NULL,
	"daily_shutdown_time" text,
	"weekly_review_enabled" boolean DEFAULT true NOT NULL,
	"weekly_review_day" integer,
	"weekly_review_time" text,
	"auto_include_tasks" boolean DEFAULT true NOT NULL,
	"mood_tracking_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reflection" ADD CONSTRAINT "reflection_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shutdown_session" ADD CONSTRAINT "shutdown_session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shutdown_session" ADD CONSTRAINT "shutdown_session_reflection_id_reflection_id_fk" FOREIGN KEY ("reflection_id") REFERENCES "public"."reflection"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "reflection_userId_idx" ON "reflection" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "reflection_type_idx" ON "reflection" USING btree ("type");--> statement-breakpoint
CREATE INDEX "reflection_date_idx" ON "reflection" USING btree ("date");--> statement-breakpoint
CREATE INDEX "reflection_userId_date_idx" ON "reflection" USING btree ("user_id","date");--> statement-breakpoint
CREATE INDEX "shutdown_session_userId_idx" ON "shutdown_session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "shutdown_session_type_idx" ON "shutdown_session" USING btree ("type");--> statement-breakpoint
CREATE INDEX "shutdown_session_date_idx" ON "shutdown_session" USING btree ("date");--> statement-breakpoint
CREATE INDEX "shutdown_session_reflectionId_idx" ON "shutdown_session" USING btree ("reflection_id");--> statement-breakpoint
CREATE INDEX "shutdown_session_userId_date_idx" ON "shutdown_session" USING btree ("user_id","date");--> statement-breakpoint
CREATE INDEX "user_settings_userId_idx" ON "user_settings" USING btree ("user_id");