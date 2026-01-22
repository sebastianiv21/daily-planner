import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, date, jsonb } from 'drizzle-orm/pg-core';
import { user } from './auth';
import { shutdownSession } from './shutdown-session';

export const reflection = pgTable(
	'reflection',
	{
		id: text('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		type: text('type').notNull(), // 'daily' | 'weekly'
		date: date('date').notNull(),
		content: text('content').notNull(),
		metadata: jsonb('metadata'), // Store charts data, stats, insights
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [
		index('reflection_userId_idx').on(table.userId),
		index('reflection_type_idx').on(table.type),
		index('reflection_date_idx').on(table.date),
		index('reflection_userId_date_idx').on(table.userId, table.date)
	]
);

export const reflectionRelations = relations(reflection, ({ one, many }) => ({
	user: one(user, {
		fields: [reflection.userId],
		references: [user.id]
	}),
	shutdownSessions: many(shutdownSession)
}));
