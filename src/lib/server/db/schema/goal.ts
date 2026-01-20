import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { task } from './task';

export const goal = pgTable(
	'goal',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		description: text('description'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('goal_userId_idx').on(table.userId)]
);

export const goalRelations = relations(goal, ({ one, many }) => ({
	user: one(user, {
		fields: [goal.userId],
		references: [user.id]
	}),
	tasks: many(task)
}));
