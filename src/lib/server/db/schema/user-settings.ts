import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, boolean, integer, unique } from 'drizzle-orm/pg-core';
import { user } from './auth';

export const userSettings = pgTable(
	'user_settings',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		dailyShutdownEnabled: boolean('daily_shutdown_enabled').default(true).notNull(),
		dailyShutdownTime: text('daily_shutdown_time'), // "17:30" format
		weeklyReviewEnabled: boolean('weekly_review_enabled').default(true).notNull(),
		weeklyReviewDay: integer('weekly_review_day'), // 0=Sunday, 1=Monday, etc.
		weeklyReviewTime: text('weekly_review_time'), // "16:00" format
		autoIncludeTasks: boolean('auto_include_tasks').default(true).notNull(),
		moodTrackingEnabled: boolean('mood_tracking_enabled').default(false).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('user_settings_userId_idx').on(table.userId),
		unique('user_settings_user_unique').on(table.userId)
	]
);

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
	user: one(user, {
		fields: [userSettings.userId],
		references: [user.id]
	})
}));
