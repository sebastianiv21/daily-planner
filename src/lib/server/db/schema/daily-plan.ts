import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, unique } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { scheduledTask } from './scheduled-task';

export const dailyPlan = pgTable(
	'daily_plan',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		date: date('date').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('daily_plan_userId_idx').on(table.userId),
		index('daily_plan_date_idx').on(table.date),
		index('daily_plan_userId_date_idx').on(table.userId, table.date),
		unique('daily_plan_user_date_unique').on(table.userId, table.date)
	]
);

export const dailyPlanRelations = relations(dailyPlan, ({ one, many }) => ({
	user: one(user, {
		fields: [dailyPlan.userId],
		references: [user.id]
	}),
	scheduledTasks: many(scheduledTask)
}));
