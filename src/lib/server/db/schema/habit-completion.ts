import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, unique } from 'drizzle-orm/pg-core';
import { habit } from './habit';

export const habitCompletion = pgTable(
	'habit_completion',
	{
		id: text('id').primaryKey(),
		habitId: text('habit_id')
			.notNull()
			.references(() => habit.id, { onDelete: 'cascade' }),
		date: date('date').notNull(),
		completedAt: timestamp('completed_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('habit_completion_habitId_idx').on(table.habitId),
		index('habit_completion_date_idx').on(table.date),
		index('habit_completion_habitDate_idx').on(table.habitId, table.date),
		unique('habit_completion_habit_date_unique').on(table.habitId, table.date)
	]
);

export const habitCompletionRelations = relations(habitCompletion, ({ one }) => ({
	habit: one(habit, {
		fields: [habitCompletion.habitId],
		references: [habit.id]
	})
}));
