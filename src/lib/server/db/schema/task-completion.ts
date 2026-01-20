import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, unique } from 'drizzle-orm/pg-core';
import { task } from './task';

export const taskCompletion = pgTable(
	'task_completion',
	{
		id: text('id').primaryKey(),
		taskId: text('task_id')
			.notNull()
			.references(() => task.id, { onDelete: 'cascade' }),
		completedAt: timestamp('completed_at').notNull(),
		completedOnDate: date('completed_on_date').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('task_completion_taskId_idx').on(table.taskId),
		index('task_completion_date_idx').on(table.completedOnDate),
		index('task_completion_taskDate_idx').on(table.taskId, table.completedOnDate),
		unique('task_completion_task_date_unique').on(table.taskId, table.completedOnDate)
	]
);

export const taskCompletionRelations = relations(taskCompletion, ({ one }) => ({
	task: one(task, {
		fields: [taskCompletion.taskId],
		references: [task.id]
	})
}));
