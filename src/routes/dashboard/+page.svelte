<script lang="ts">
	import { Sun, LogOut, LayoutDashboard, Calendar, Target, Repeat, Archive } from '@lucide/svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let { data } = $props();
	let user = $derived(data.user);

	async function signOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					goto('/login');
				}
			}
		});
	}
</script>

<div class="min-h-screen bg-base-100 flex">
	<!-- Sidebar -->
	<aside class="w-64 border-r border-base-200 flex flex-col bg-base-100 hidden md:flex">
		<div class="p-8 flex items-center gap-3">
			<div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content">
				<Sun size={20} />
			</div>
			<span class="text-xl font-bold tracking-tight">Daily Planner</span>
		</div>

		<nav class="flex-1 px-4 space-y-2">
			<a href="/dashboard" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
				<LayoutDashboard size={20} />
				<span>Dashboard</span>
			</a>
			<a href="/today" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-colors">
				<Calendar size={20} />
				<span>Today</span>
			</a>
			<a href="/goals" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-colors">
				<Target size={20} />
				<span>Goals</span>
			</a>
			<a href="/habits" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-colors">
				<Repeat size={20} />
				<span>Habits</span>
			</a>
			<a href="/backlog" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-base-200 transition-colors">
				<Archive size={20} />
				<span>Backlog</span>
			</a>
		</nav>

		<div class="p-6 border-t border-base-200">
			<button 
				onclick={signOut}
				class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-error/10 text-error text-sm w-full transition-colors"
			>
				<LogOut size={18} />
				<span>Sign Out</span>
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex-1 flex flex-col h-screen overflow-hidden">
		<!-- Header -->
		<header class="h-20 border-b border-base-200 flex items-center justify-between px-8 bg-base-100/80 backdrop-blur-md">
			<h1 class="text-2xl font-serif italic">Dashboard</h1>
			
			<div class="flex items-center gap-4">
				<div class="flex flex-col items-end">
					<span class="text-sm font-bold">{user.name}</span>
					<span class="text-xs opacity-60">{user.email}</span>
				</div>
				<div class="avatar placeholder">
					<div class="bg-neutral text-neutral-content rounded-full w-10">
						<span>{user.name.charAt(0)}</span>
					</div>
				</div>
			</div>
		</header>

		<!-- Content Scroll Area -->
		<div class="flex-1 overflow-y-auto p-8">
			<div class="max-w-4xl mx-auto">
				<div class="bg-primary/5 border border-primary/10 p-10 rounded-3xl mb-12">
					<h2 class="text-4xl font-serif italic mb-4">Good day, {user.name.split(' ')[0]}.</h2>
					<p class="text-lg opacity-70">You have no tasks scheduled for today. Ready to start your ritual?</p>
					<button class="btn btn-primary mt-8 rounded-2xl px-8 h-12 shadow-lg shadow-primary/20">
						Plan your day
					</button>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div class="card bg-base-200 rounded-3xl p-8">
						<h3 class="text-xl font-bold mb-4 flex items-center gap-2">
							<Target size={20} class="text-primary" />
							Active Goals
						</h3>
						<p class="text-sm opacity-60">Set your first goal to stay focused on what truly matters.</p>
					</div>

					<div class="card bg-base-200 rounded-3xl p-8">
						<h3 class="text-xl font-bold mb-4 flex items-center gap-2">
							<Repeat size={20} class="text-secondary" />
							Daily Rituals
						</h3>
						<p class="text-sm opacity-60">Add a habit to your routine and watch your progress grow.</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
