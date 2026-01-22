<script lang="ts">
	import { Sun, Calendar, Target, Repeat, ArrowRight } from '@lucide/svelte';
</script>

<div class="min-h-screen bg-base-100 text-base-content selection:bg-primary/20">
	<!-- Navbar -->
	<nav class="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-200 px-4 md:px-8">
		<div class="flex-1">
			<a href="/" class="flex items-center gap-2 text-xl font-bold tracking-tight">
				<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-content">
					<Sun size={18} />
				</div>
				<span class="hidden sm:inline">Daily Planner</span>
			</a>
		</div>
		<div class="flex-none gap-2">
			<a href="/login" class="btn btn-ghost btn-sm">Sign In</a>
			<a href="/register" class="btn btn-primary btn-sm px-4">Get Started</a>
		</div>
	</nav>

	<!-- Hero Section -->
	<header class="hero py-24 md:py-40 overflow-hidden relative">
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
			<div class="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
			<div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
		</div>
		
		<div class="hero-content text-center relative z-10">
			<div class="max-w-3xl">
				<h1 class="text-6xl md:text-8xl font-serif italic mb-10 leading-tight">
					Calm is a choice. <br />
					Focus on what matters.
				</h1>
				<p class="text-xl md:text-2xl text-base-content/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
					A minimalist daily-first planning experience designed to help you reclaim your time and find peace in your productivity.
				</p>
				<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
					<a href="/register" class="btn btn-primary btn-lg px-10 h-16 rounded-2xl gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
						Start your daily ritual
						<ArrowRight size={22} />
					</a>
				</div>
			</div>
		</div>
	</header>

	<!-- Features Section -->
	<section class="max-w-6xl mx-auto px-6 py-24">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-16">
			<div class="group flex flex-col items-center text-center space-y-6">
				<div class="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
					<Calendar size={28} />
				</div>
				<h3 class="text-2xl font-bold font-serif italic">Daily Ritual</h3>
				<p class="text-base-content/60 leading-relaxed">Start each day with intention. A dedicated space for your daily plan, free from the noise of endless backlogs.</p>
			</div>
			
			<div class="group flex flex-col items-center text-center space-y-6">
				<div class="w-16 h-16 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
					<Target size={28} />
				</div>
				<h3 class="text-2xl font-bold font-serif italic">Meaningful Goals</h3>
				<p class="text-base-content/60 leading-relaxed">Connect your daily tasks to high-level goals. See the progress of your long-term intentions, one day at a time.</p>
			</div>

			<div class="group flex flex-col items-center text-center space-y-6">
				<div class="w-16 h-16 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
					<Repeat size={28} />
				</div>
				<h3 class="text-2xl font-bold font-serif italic">Healthy Rituals</h3>
				<p class="text-base-content/60 leading-relaxed">Build lasting habits that support your well-being. Track your consistency with a minimalist habit ritual system.</p>
			</div>
		</div>
	</section>

	<!-- Quote Section -->
	<section class="py-32 bg-base-200/40 border-y border-base-200 relative overflow-hidden">
		<div class="max-w-4xl mx-auto px-6 text-center relative z-10">
			<blockquote class="text-4xl md:text-5xl font-serif italic text-base-content/80 mb-10 leading-snug">
				"Simplicity is the ultimate sophistication."
			</blockquote>
			<cite class="text-sm uppercase tracking-widest text-base-content/40 not-italic font-bold">
				— Leonardo da Vinci
			</cite>
		</div>
		<div class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
	</section>

	<!-- Closing CTA -->
	<section class="py-24 text-center">
		<div class="max-w-xl mx-auto px-6">
			<h2 class="text-3xl md:text-4xl font-serif italic mb-8">Ready to find your focus?</h2>
			<a href="/register" class="btn btn-outline btn-lg px-10 h-16 rounded-2xl border-2 hover:bg-primary hover:border-primary transition-all">
				Join the community
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer footer-center p-16 border-t border-base-200 text-base-content/40 bg-base-100">
		<aside>
			<div class="flex items-center gap-2 mb-6 opacity-60">
				<Sun size={24} />
				<span class="text-xl font-bold tracking-tight text-base-content">Daily Planner</span>
			</div>
			<p class="text-lg italic font-serif mb-4">Built for focus. Designed for peace.</p>
			<div class="flex gap-4 mb-8">
				<a href="/" class="link link-hover">Privacy</a>
				<a href="/" class="link link-hover">Terms</a>
				<a href="/" class="link link-hover">Contact</a>
			</div>
			<p class="text-xs tracking-widest uppercase">© 2024 Daily Planner Rituals</p>
		</aside>
	</footer>
</div>
