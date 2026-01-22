import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';

if (!env.BETTER_AUTH_SECRET) {
	throw new Error('BETTER_AUTH_SECRET is not set in environment variables');
}

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true
	},
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL || 'http://localhost:5173',
	plugins: [sveltekitCookies(getRequestEvent)]
});
