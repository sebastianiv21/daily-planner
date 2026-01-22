# Daily Planner - Agent Development Guide

This file provides essential information for agentic coding agents working on the Daily Planner project.

## Project Overview

Daily Planner is a minimalist, daily-first planning application built with:

- **Frontend**: SvelteKit 5 with Svelte 5 (using runes)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Icons**: Lucide icons via `@lucide/svelte`
- **Testing**: Vitest with Playwright browser testing
- **Package Manager**: pnpm

## Essential Commands

### Development & Build

```bash
pnpm dev              # Start development server (http://localhost:5173)
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm check            # Run type checking (svelte-check)
pnpm check:watch      # Run type checking in watch mode
```

### Code Quality

```bash
pnpm lint             # Run ESLint + Prettier check
pnpm format           # Format code with Prettier
```

### Testing

```bash
pnpm test                          # Run all tests once
pnpm test:unit                     # Run tests in watch mode
pnpm test src/demo.spec.ts         # Run specific test file (server tests)
pnpm test src/routes/+page.svelte.spec.ts  # Run specific component test (browser)
```

Test files are organized into two environments:

- **Browser tests**: `*.svelte.spec.ts` or `*.svelte.test.ts` (Playwright + vitest-browser-svelte)
- **Server tests**: `*.spec.ts` or `*.test.ts` (Node environment)

### Database

```bash
pnpm db:start         # Start PostgreSQL with Docker Compose
pnpm db:push          # Push schema changes to database (dev only)
pnpm db:generate      # Generate migration files (production)
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio UI
```

## Code Style Guidelines

### General Formatting

- **Indentation**: Tabs (configured in Prettier)
- **Quotes**: Single quotes for strings
- **Trailing Commas**: None
- **Line Width**: 100 characters
- **Semicolons**: Required

### TypeScript Conventions

- Use strict TypeScript (`strict: true` in tsconfig.json)
- Prefer explicit return types for functions
- Use `const` by default, `let` only when reassignment is needed
- Never use `any` - use `unknown` or proper types
- Use `$env/dynamic/private` for server environment variables
- Use `$env/static/public` for client-safe environment variables

### Import Organization

Always organize imports in this order:

1. External libraries (svelte, drizzle-orm, better-auth, @lucide/svelte, etc.)
2. SvelteKit imports (`$lib/`, `$env/`, `$app/`, etc.)
3. Relative imports (`./`, `../`)

Example:

```typescript
import { Sun, Calendar } from '@lucide/svelte';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';
import './styles.css';
```

### Svelte 5 Specific Rules

**CRITICAL**: This project uses Svelte 5 with runes. Do NOT use legacy patterns.

- **State**: `let count = $state(0);`
- **Props**: `let { title, description = 'default' } = $props();`
- **Derived**: `let doubled = $derived(count * 2);`
- **Effects**: `$effect(() => { console.log(count); });`
- **Children**: `{@render children?.()}`
- **Event handlers**: Use `on:click={handler}` syntax
- **Two-way binding**: Use `bind:value` for forms

### Styling Guidelines

- Use DaisyUI component classes: `btn`, `btn-primary`, `card`, `navbar`, etc.
- Use Tailwind utility classes for spacing, layout, colors
- Custom fonts: `font-serif` (Playfair Display), `font-sans` (Instrument Sans)
- Theme colors: `bg-primary`, `text-base-content`, `border-base-200`
- Icons: Import from `@lucide/svelte` (e.g., `import { Sun } from '@lucide/svelte';`)

### Database Schema Patterns

- **Table names**: kebab-case (e.g., `daily-plan`, `task-completion`)
- **Column names**: camelCase in TypeScript, automatically maps to snake_case in PostgreSQL
- **Primary keys**: `text('id').primaryKey()`
- **Timestamps**: Use `createdAt` and `updatedAt` with `defaultNow()` and `$onUpdate()`
- **Foreign keys**: `references(() => otherTable.id, { onDelete: 'cascade' })`
- **Indexes**: Add for foreign keys and frequently queried columns
- **Relations**: Define using Drizzle's `relations()` helper

Example:

```typescript
export const task = pgTable('task', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdate(() => new Date()).notNull()
}, (table) => [
  index('task_userId_idx').on(table.userId)
]);
```

### File Organization

```
src/
├── lib/
│   ├── server/          # Server-only code (DB, auth, API)
│   │   ├── db/          # Database connection and schemas
│   │   │   └── schema/  # Individual table schemas
│   │   └── auth.ts      # Better Auth instance
│   ├── assets/          # Static assets
│   └── index.ts         # Public library exports
├── routes/              # SvelteKit routes
│   ├── +layout.svelte   # Root layout
│   ├── +page.svelte     # Homepage
│   ├── +page.server.ts  # Server load functions
│   └── api/             # API endpoints
├── app.html             # HTML template
├── app.css              # Global styles (Tailwind imports)
└── app.d.ts             # Type declarations (App.Locals, etc.)
```

### Naming Conventions

- **Files**: kebab-case for routes/modules, PascalCase for components
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **Database tables**: kebab-case
- **Database columns**: camelCase

### Error Handling

- Throw descriptive errors for missing environment variables
- Use proper TypeScript types to prevent runtime errors
- Implement proper database error handling in server code
- Use try-catch blocks for external API calls
- Use SvelteKit's `error()` helper for HTTP errors

Example:

```typescript
import { error } from '@sveltejs/kit';

if (!env.BETTER_AUTH_SECRET) {
  throw new Error('BETTER_AUTH_SECRET is not set in environment variables');
}

if (!user) {
  throw error(404, 'User not found');
}
```

## Testing Patterns

- **Browser tests**: Use `vitest-browser-svelte` with `render()` and `page` from `vitest/browser`
- **Server tests**: Use standard Vitest in Node environment
- Use `describe()`, `it()`, `expect()` from Vitest
- Test file naming: `*.spec.ts` or `*.test.ts` (server), `*.svelte.spec.ts` (component)
- Always include assertions in tests (`expect.requireAssertions: true`)

## Git Workflow

Always run before committing:

```bash
pnpm lint      # Ensures code style consistency
pnpm check     # TypeScript validation
pnpm test      # All tests pass
```

## Security Guidelines

- All sensitive operations in `/src/lib/server/`
- Use Better Auth for authentication, no custom auth logic
- Validate all user inputs
- Use parameterized queries (Drizzle handles this automatically)
- Never expose database errors to client
- Store secrets in `.env` file (never commit)
- Access server-side env vars via `$env/dynamic/private`

## Better Auth Integration

- Auth instance: `src/lib/auth.ts`
- Session handling: `src/hooks.server.ts`
- Types: `App.Locals.user` and `App.Locals.session` (defined in `app.d.ts`)
- API endpoints: Handled by `svelteKitHandler` in hooks
- Client: Use `authClient` from `$lib/auth-client.ts`

## Performance Considerations

- Svelte 5 runes are highly optimized for reactivity
- Use database indexes for foreign keys and frequently queried columns
- Implement proper caching strategies in SvelteKit load functions
- Optimize bundle size with proper imports (tree-shaking)
- Use lazy loading for heavy components

## Key Dependencies

- `@sveltejs/kit` ^2.49 - SvelteKit framework
- `svelte` ^5.45 - UI framework with runes
- `drizzle-orm` ^0.45 - Database ORM
- `better-auth` ^1.4 - Authentication framework
- `@lucide/svelte` ^0.562 - Icon library
- `tailwindcss` ^4.1 - CSS framework
- `daisyui` ^5.5 - Component library
- `vitest` ^4.0 - Testing framework
- `playwright` ^1.57 - Browser automation
