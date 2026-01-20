import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { user } from './auth';
import { task } from './task';

export const category = pgTable(
	'category',
	{
		id: text('id').primaryKey(),
		name: text('name').notNull(),
		color: text('color'),
		parentId: text('parent_id'),
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
		index('category_userId_idx').on(table.userId),
		index('category_parentId_idx').on(table.parentId),
		check(
			'category_no_self_reference',
			sql`${table.parentId} IS NULL OR ${table.parentId} != ${table.id}`
		)
	]
);

export const categoryRelations = relations(category, ({ one, many }) => ({
	user: one(user, {
		fields: [category.userId],
		references: [user.id]
	}),
	parent: one(category, {
		fields: [category.parentId],
		references: [category.id]
	}),
	children: many(category),
	tasks: many(task)
}));
