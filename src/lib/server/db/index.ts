import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client);

// Export all schemas for convenience
export {
	user,
	session,
	account,
	verification,
	userRelations,
	sessionRelations,
	accountRelations
} from './schema/auth';

export { category, categoryRelations } from './schema/category';

export { goal, goalRelations } from './schema/goal';

export { task, taskRelations } from './schema/task';

export { subtask, subtaskRelations } from './schema/subtask';

export { backlogItem, backlogItemRelations } from './schema/backlog-item';

export { dailyPlan, dailyPlanRelations } from './schema/daily-plan';

export { scheduledTask, scheduledTaskRelations } from './schema/scheduled-task';

export { habit, habitRelations } from './schema/habit';

export { habitCompletion, habitCompletionRelations } from './schema/habit-completion';

export { taskCompletion, taskCompletionRelations } from './schema/task-completion';

export { reflection, reflectionRelations } from './schema/reflection';

export { userSettings, userSettingsRelations } from './schema/user-settings';

export { shutdownSession, shutdownSessionRelations } from './schema/shutdown-session';
