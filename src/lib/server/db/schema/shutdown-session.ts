import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, jsonb } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { reflection } from './reflection';

export const shutdownSession = pgTable(
	'shutdown_session',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		type: text('type').notNull(), // 'daily' | 'weekly'
		date: date('date').notNull(),
		startedAt: timestamp('started_at').notNull(),
		completedAt: timestamp('completed_at'),
		reflectionId: text('reflection_id').references(() => reflection.id, { onDelete: 'set null' }),
		stats: jsonb('stats'), // Completion rates, time spent, patterns
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [
		index('shutdown_session_userId_idx').on(table.userId),
		index('shutdown_session_type_idx').on(table.type),
		index('shutdown_session_date_idx').on(table.date),
		index('shutdown_session_reflectionId_idx').on(table.reflectionId),
		index('shutdown_session_userId_date_idx').on(table.userId, table.date)
	]
);

export const shutdownSessionRelations = relations(shutdownSession, ({ one }) => ({
	user: one(user, {
		fields: [shutdownSession.userId],
		references: [user.id]
	}),
	reflection: one(reflection, {
		fields: [shutdownSession.reflectionId],
		references: [reflection.id]
	})
}));
