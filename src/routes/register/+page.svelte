<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { Sun, Loader2, ArrowRight } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import * as v from 'valibot';
	import { registerSchema } from '$lib/validations';

	let email = $state('');
	let password = $state('');
	let name = $state('');
	let loading = $state(false);
	let errorMessage = $state('');
	let errors = $state<Record<string, string>>({});

	async function signUp() {
		errors = {};
		errorMessage = '';

		try {
			const result = v.safeParse(registerSchema, { name, email, password });

			if (!result.success) {
				for (const issue of result.issues) {
					const path = issue.path?.[0]?.key as string;
					if (path && !errors[path]) {
						errors[path] = issue.message;
					}
				}
				return;
			}

			loading = true;

			const { data, error } = await authClient.signUp.email(
				{
					email,
					password,
					name,
					callbackURL: '/dashboard'
				},
				{
					onRequest: () => {
						loading = true;
					},
					onSuccess: () => {
						loading = false;
						goto('/dashboard');
					},
					onError: (ctx) => {
						loading = false;
						errorMessage = ctx.error.message || 'An error occurred during sign up';
					}
				}
			);
		} catch (e) {
			loading = false;
			errorMessage = 'An unexpected error occurred.';
		}
	}
</script>

<div class="min-h-screen bg-base-100 flex flex-col items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="flex flex-col items-center mb-10">
			<a href="/" class="flex items-center gap-2 text-2xl font-bold tracking-tight mb-4">
				<div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content">
					<Sun size={24} />
				</div>
				<span>Daily Planner</span>
			</a>
			<h1 class="text-3xl font-serif italic">Create your account</h1>
			<p class="text-base-content/60 mt-2">Start your journey to focus and peace.</p>
		</div>

		<div class="card bg-base-200 shadow-xl rounded-3xl overflow-hidden">
			<div class="card-body p-8">
				{#if errorMessage}
					<div class="alert alert-error mb-6 rounded-2xl py-3 px-4 text-sm font-medium">
						<span>{errorMessage}</span>
					</div>
				{/if}

				<form onsubmit={(e) => { e.preventDefault(); signUp(); }} class="space-y-5">
					<div class="form-control">
						<label class="label pt-0 pb-2" for="name">
							<span class="label-text font-bold text-xs uppercase tracking-widest opacity-60">Full Name</span>
						</label>
						<input
							type="text"
							id="name"
							placeholder="Enter your name"
							class="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-primary transition-all h-12 {errors.name ? 'input-error' : ''}"
							bind:value={name}
							disabled={loading}
						/>
						{#if errors.name}
							<div class="label pb-0">
								<span class="label-text-alt text-error">{errors.name}</span>
							</div>
						{/if}
					</div>

					<div class="form-control">
						<label class="label pt-0 pb-2" for="email">
							<span class="label-text font-bold text-xs uppercase tracking-widest opacity-60">Email Address</span>
						</label>
						<input
							type="email"
							id="email"
							placeholder="you@example.com"
							class="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-primary transition-all h-12 {errors.email ? 'input-error' : ''}"
							bind:value={email}
							disabled={loading}
						/>
						{#if errors.email}
							<div class="label pb-0">
								<span class="label-text-alt text-error">{errors.email}</span>
							</div>
						{/if}
					</div>

					<div class="form-control">
						<label class="label pt-0 pb-2" for="password">
							<span class="label-text font-bold text-xs uppercase tracking-widest opacity-60">Password</span>
						</label>
						<input
							type="password"
							id="password"
							placeholder="••••••••"
							class="input input-bordered w-full rounded-2xl bg-base-100 border-base-300 focus:border-primary transition-all h-12 {errors.password ? 'input-error' : ''}"
							bind:value={password}
							disabled={loading}
						/>
						{#if errors.password}
							<div class="label pb-0">
								<span class="label-text-alt text-error">{errors.password}</span>
							</div>
						{/if}
					</div>

					<button
						type="submit"
						class="btn btn-primary w-full h-12 rounded-2xl shadow-lg shadow-primary/20 mt-4 gap-2"
						disabled={loading}
					>
						{#if loading}
							<Loader2 size={20} class="animate-spin" />
							Creating account...
						{:else}
							Sign Up
							<ArrowRight size={20} />
						{/if}
					</button>
				</form>

				<div class="divider my-8 opacity-40">OR</div>

				<p class="text-center text-sm text-base-content/60">
					Already have an account?
					<a href="/login" class="link link-primary font-bold no-underline hover:underline">Sign In</a>
				</p>
			</div>
		</div>

		<footer class="mt-12 text-center text-xs text-base-content/40 tracking-widest uppercase">
			© 2024 Daily Planner Rituals
		</footer>
	</div>
</div>
