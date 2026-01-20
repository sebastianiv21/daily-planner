import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, jsonb, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './auth';
import { habitCompletion } from './habit-completion';

export const habit = pgTable(
	'habit',
	{
		id: text('id').primaryKey(),
		title: text('title').notNull(),
		frequencyType: text('frequency_type').notNull(), // 'daily' | 'weekdays'
		weekdays: jsonb('weekdays').$type<string[]>(), // ["monday", "wednesday", "friday"]
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
		index('habit_userId_idx').on(table.userId),
		index('habit_frequencyType_idx').on(table.frequencyType),
		check(
			'habit_frequency_type_check',
			sql`${table.frequencyType} IN ('daily', 'weekdays', 'weekly', 'custom')`
		)
	]
);

export const habitRelations = relations(habit, ({ one, many }) => ({
	user: one(user, {
		fields: [habit.userId],
		references: [user.id]
	}),
	habitCompletions: many(habitCompletion)
}));
