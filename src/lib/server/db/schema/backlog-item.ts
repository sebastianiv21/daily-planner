import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { task } from './task';

export const backlogItem = pgTable(
	'backlog_item',
	{
		id: text('id').primaryKey(),
		taskId: text('task_id')
			.notNull()
			.references(() => task.id, { onDelete: 'cascade' }),
		bucket: text('bucket').notNull(), // 'someday' | 'next_week' | 'next_month' | 'next_quarter' | 'next_year' | 'never'
		dateRegistered: date('date_registered').notNull(),
		movedToTodayAt: timestamp('moved_to_today_at'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('backlog_item_taskId_idx').on(table.taskId),
		index('backlog_item_bucket_idx').on(table.bucket),
		index('backlog_item_dateRegistered_idx').on(table.dateRegistered),
		check(
			'backlog_bucket_check',
			sql`${table.bucket} IN ('someday', 'next_week', 'next_month', 'next_quarter', 'next_year', 'never')`
		)
	]
);

export const backlogItemRelations = relations(backlogItem, ({ one }) => ({
	task: one(task, {
		fields: [backlogItem.taskId],
		references: [task.id]
	})
}));
