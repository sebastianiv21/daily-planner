ALTER TABLE "daily_plan" ADD CONSTRAINT "daily_plan_user_date_unique" UNIQUE("user_id","date");--> statement-breakpoint
ALTER TABLE "habit_completion" ADD CONSTRAINT "habit_completion_habit_date_unique" UNIQUE("habit_id","date");--> statement-breakpoint
ALTER TABLE "task_completion" ADD CONSTRAINT "task_completion_task_date_unique" UNIQUE("task_id","completed_on_date");--> statement-breakpoint
ALTER TABLE "user_settings" ADD CONSTRAINT "user_settings_user_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "backlog_item" ADD CONSTRAINT "backlog_bucket_check" CHECK ("backlog_item"."bucket" IN ('someday', 'next_week', 'next_month', 'next_quarter', 'next_year', 'never'));--> statement-breakpoint
ALTER TABLE "habit" ADD CONSTRAINT "habit_frequency_type_check" CHECK ("habit"."frequency_type" IN ('daily', 'weekdays', 'weekly', 'custom'));--> statement-breakpoint
ALTER TABLE "scheduled_task" ADD CONSTRAINT "scheduled_task_time_check" CHECK ("scheduled_task"."start_time" IS NULL OR "scheduled_task"."end_time" IS NULL OR "scheduled_task"."start_time" < "scheduled_task"."end_time");--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_status_check" CHECK ("task"."status" IN ('active', 'completed', 'cancelled', 'paused'));--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_source_type_check" CHECK ("task"."source_type" IN ('manual', 'gmail', 'slack', 'calendar', 'imported'));--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_priority_check" CHECK ("task"."priority" BETWEEN 1 AND 3);