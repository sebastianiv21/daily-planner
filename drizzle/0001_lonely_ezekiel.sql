CREATE TABLE "backlog_item" (
	"id" text PRIMARY KEY NOT NULL,
	"task_id" text NOT NULL,
	"bucket" text NOT NULL,
	"date_registered" date NOT NULL,
	"moved_to_today_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color" text,
	"parent_id" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "category_no_self_reference" CHECK ("category"."parent_id" IS NULL OR "category"."parent_id" != "category"."id")
);
--> statement-breakpoint
CREATE TABLE "daily_plan" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goal" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habit_completion" (
	"id" text PRIMARY KEY NOT NULL,
	"habit_id" text NOT NULL,
	"date" date NOT NULL,
	"completed_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habit" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"frequency_type" text NOT NULL,
	"weekdays" jsonb,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scheduled_task" (
	"id" text PRIMARY KEY NOT NULL,
	"task_id" text NOT NULL,
	"daily_plan_id" text NOT NULL,
	"scheduled_date" date NOT NULL,
	"start_time" time,
	"end_time" time,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subtask" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"order" integer NOT NULL,
	"task_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task_completion" (
	"id" text PRIMARY KEY NOT NULL,
	"task_id" text NOT NULL,
	"completed_at" timestamp NOT NULL,
	"completed_on_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"priority" integer DEFAULT 2 NOT NULL,
	"estimated_duration" text,
	"actual_duration" text,
	"goal_id" text,
	"category_id" text,
	"status" text DEFAULT 'active' NOT NULL,
	"source_type" text DEFAULT 'manual' NOT NULL,
	"last_updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "backlog_item" ADD CONSTRAINT "backlog_item_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_plan" ADD CONSTRAINT "daily_plan_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goal" ADD CONSTRAINT "goal_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit_completion" ADD CONSTRAINT "habit_completion_habit_id_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habit" ADD CONSTRAINT "habit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_daily_plan_id_daily_plan_id_fk" FOREIGN KEY ("daily_plan_id") REFERENCES "public"."daily_plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtask" ADD CONSTRAINT "subtask_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task_completion" ADD CONSTRAINT "task_completion_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_goal_id_goal_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goal"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "backlog_item_taskId_idx" ON "backlog_item" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "backlog_item_bucket_idx" ON "backlog_item" USING btree ("bucket");--> statement-breakpoint
CREATE INDEX "backlog_item_dateRegistered_idx" ON "backlog_item" USING btree ("date_registered");--> statement-breakpoint
CREATE INDEX "category_userId_idx" ON "category" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "category_parentId_idx" ON "category" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "daily_plan_userId_idx" ON "daily_plan" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "daily_plan_date_idx" ON "daily_plan" USING btree ("date");--> statement-breakpoint
CREATE INDEX "daily_plan_userId_date_idx" ON "daily_plan" USING btree ("user_id","date");--> statement-breakpoint
CREATE INDEX "goal_userId_idx" ON "goal" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "habit_completion_habitId_idx" ON "habit_completion" USING btree ("habit_id");--> statement-breakpoint
CREATE INDEX "habit_completion_date_idx" ON "habit_completion" USING btree ("date");--> statement-breakpoint
CREATE INDEX "habit_completion_habitDate_idx" ON "habit_completion" USING btree ("habit_id","date");--> statement-breakpoint
CREATE INDEX "habit_userId_idx" ON "habit" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "habit_frequencyType_idx" ON "habit" USING btree ("frequency_type");--> statement-breakpoint
CREATE INDEX "scheduled_task_taskId_idx" ON "scheduled_task" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "scheduled_task_dailyPlanId_idx" ON "scheduled_task" USING btree ("daily_plan_id");--> statement-breakpoint
CREATE INDEX "scheduled_task_date_idx" ON "scheduled_task" USING btree ("scheduled_date");--> statement-breakpoint
CREATE INDEX "scheduled_task_status_idx" ON "scheduled_task" USING btree ("status");--> statement-breakpoint
CREATE INDEX "scheduled_task_timeRange_idx" ON "scheduled_task" USING btree ("scheduled_date","start_time","end_time");--> statement-breakpoint
CREATE INDEX "subtask_taskId_idx" ON "subtask" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "subtask_order_idx" ON "subtask" USING btree ("task_id","order");--> statement-breakpoint
CREATE INDEX "task_completion_taskId_idx" ON "task_completion" USING btree ("task_id");--> statement-breakpoint
CREATE INDEX "task_completion_date_idx" ON "task_completion" USING btree ("completed_on_date");--> statement-breakpoint
CREATE INDEX "task_completion_taskDate_idx" ON "task_completion" USING btree ("task_id","completed_on_date");--> statement-breakpoint
CREATE INDEX "task_userId_idx" ON "task" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "task_goalId_idx" ON "task" USING btree ("goal_id");--> statement-breakpoint
CREATE INDEX "task_categoryId_idx" ON "task" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "task_status_idx" ON "task" USING btree ("status");--> statement-breakpoint
CREATE INDEX "task_sourceType_idx" ON "task" USING btree ("source_type");