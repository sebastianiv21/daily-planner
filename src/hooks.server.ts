import type { Handle } from '@sveltejs/kit';
import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	// Fetch current session from Better Auth
	const session = await auth.api.getSession({
		headers: event.request.headers
	});

	// Make session and user available on server
	event.locals.session = session?.session ?? null;
	event.locals.user = session?.user ?? null;

	return svelteKitHandler({ event, resolve, auth, building });
};
