import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, time, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { task } from './task';
import { dailyPlan } from './daily-plan';

export const scheduledTask = pgTable(
	'scheduled_task',
	{
		id: text('id').primaryKey(),
		taskId: text('task_id')
			.notNull()
			.references(() => task.id, { onDelete: 'cascade' }),
		dailyPlanId: text('daily_plan_id')
			.notNull()
			.references(() => dailyPlan.id, { onDelete: 'cascade' }),
		scheduledDate: date('scheduled_date').notNull(),
		startTime: time('start_time'), // 24-hour format: "14:30"
		endTime: time('end_time'), // 24-hour format: "15:30"
		status: text('status').default('scheduled').notNull(), // 'scheduled' | 'completed' | 'cancelled'
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('scheduled_task_taskId_idx').on(table.taskId),
		index('scheduled_task_dailyPlanId_idx').on(table.dailyPlanId),
		index('scheduled_task_date_idx').on(table.scheduledDate),
		index('scheduled_task_status_idx').on(table.status),
		index('scheduled_task_timeRange_idx').on(table.scheduledDate, table.startTime, table.endTime),
		check(
			'scheduled_task_time_check',
			sql`${table.startTime} IS NULL OR ${table.endTime} IS NULL OR ${table.startTime} < ${table.endTime}`
		)
	]
);

export const scheduledTaskRelations = relations(scheduledTask, ({ one }) => ({
	task: one(task, {
		fields: [scheduledTask.taskId],
		references: [task.id]
	}),
	dailyPlan: one(dailyPlan, {
		fields: [scheduledTask.dailyPlanId],
		references: [dailyPlan.id]
	})
}));
