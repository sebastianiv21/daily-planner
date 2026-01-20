import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, integer, boolean } from 'drizzle-orm/pg-core';
import { task } from './task';

export const subtask = pgTable(
	'subtask',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		completed: boolean('completed').default(false).notNull(),
		order: integer('order').notNull(),
		taskId: text('task_id')
			.notNull()
			.references(() => task.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('subtask_taskId_idx').on(table.taskId),
		index('subtask_order_idx').on(table.taskId, table.order)
	]
);

export const subtaskRelations = relations(subtask, ({ one }) => ({
	task: one(task, {
		fields: [subtask.taskId],
		references: [task.id]
	})
}));
