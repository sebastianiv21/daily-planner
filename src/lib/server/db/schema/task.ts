import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, integer, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './auth';
import { goal } from './goal';
import { category } from './category';

export const task = pgTable(
	'task',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description'),
		priority: integer('priority').default(2).notNull(), // 1=high, 2=medium, 3=low
		estimatedDuration: text('estimated_duration'), // "30m", "2h", "1h 30m"
		actualDuration: text('actual_duration'),
		goalId: text('goal_id').references(() => goal.id, { onDelete: 'set null' }),
		categoryId: text('category_id').references(() => category.id, { onDelete: 'set null' }),
		status: text('status').default('active').notNull(), // 'active' | 'completed'
		sourceType: text('source_type').default('manual').notNull(), // 'manual' | 'gmail' | 'slack' etc.
		lastUpdatedAt: timestamp('last_updated_at').defaultNow().notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('task_userId_idx').on(table.userId),
		index('task_goalId_idx').on(table.goalId),
		index('task_categoryId_idx').on(table.categoryId),
		index('task_status_idx').on(table.status),
		index('task_sourceType_idx').on(table.sourceType),
		check(
			'task_status_check',
			sql`${table.status} IN ('active', 'completed', 'cancelled', 'paused')`
		),
		check(
			'task_source_type_check',
			sql`${table.sourceType} IN ('manual', 'gmail', 'slack', 'calendar', 'imported')`
		),
		check('task_priority_check', sql`${table.priority} BETWEEN 1 AND 3`)
	]
);

import { subtask } from './subtask';
import { taskCompletion } from './task-completion';
import { scheduledTask } from './scheduled-task';
import { backlogItem } from './backlog-item';

export const taskRelations = relations(task, ({ one, many }) => ({
	user: one(user, {
		fields: [task.userId],
		references: [user.id]
	}),
	goal: one(goal, {
		fields: [task.goalId],
		references: [goal.id]
	}),
	category: one(category, {
		fields: [task.categoryId],
		references: [category.id]
	}),
	subtasks: many(subtask),
	backlogItems: many(backlogItem),
	taskCompletions: many(taskCompletion),
	scheduledTasks: many(scheduledTask)
}));
