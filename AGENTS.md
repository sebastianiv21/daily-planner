# Daily Planner - Agent Development Guide

This file provides essential information for agentic coding agents working on the Daily Planner project.

## Project Overview

Daily Planner is a minimalist, daily-first planning application built with:

- **Frontend**: SvelteKit 5 with Svelte 5 (using runes)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Testing**: Vitest with Playwright browser testing
- **Package Manager**: pnpm

## Essential Commands

### Development & Build

```bash
pnpm dev              # Start development server
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
pnpm test             # Run all tests once
pnpm test:unit        # Run tests in watch mode
pnpm test path/to/file.test.ts  # Run specific test file
```

### Database

```bash
pnpm db:start         # Start database with Docker Compose
pnpm db:push          # Push schema changes to database
pnpm db:generate      # Generate migration files
pnpm db:migrate       # Run migrations
pnpm db:studio        # Open Drizzle Studio
```

## Code Style Guidelines

### General Formatting

- **Indentation**: Tabs (configured in Prettier)
- **Quotes**: Single quotes for strings
- **Trailing Commas**: None
- **Line Width**: 100 characters
- **Semicolons**: Required

### TypeScript/JavaScript Conventions

- Use strict TypeScript (`strict: true`)
- Prefer explicit return types for functions
- Use `const` by default, `let` only when reassignment is needed
- Import statements should be organized: external libs → internal modules
- Use `$env/dynamic/*` for environment variables

### Svelte 5 Specific Rules

- **Use Svelte 5 runes**: `$state()`, `$props()`, `$derived()`, `$effect()`
- Component props: `let { propName } = $props();`
- State management: `$state()` for reactive state
- Derived values: `$derived(() => expression)`
- Side effects: `$effect(() => { ... })`
- Event handlers: Use `on:click` syntax consistently
- Slot rendering: `{@render children()}` for default slot

### Database Schema Patterns

- Use Drizzle ORM conventions from existing schema
- Table names: kebab-case (e.g., "user", "verification")
- Column names: camelCase in code, snake_case in database
- Primary keys: `text("id").primaryKey()`
- Timestamps: `createdAt` and `updatedAt` with proper defaults
- Foreign keys: `references(() => otherTable.id, { onDelete: "cascade" })`

### File Organization

```
src/
├── lib/
│   ├── server/          # Server-only code (DB, auth, API)
│   ├── assets/          # Static assets
│   └── index.ts         # Public library exports
├── routes/              # SvelteKit routes
│   ├── +layout.svelte   # Root layout
│   ├── +page.svelte     # Homepage
│   └── *.svelte         # Other pages
├── app.html             # HTML template
└── app.d.ts             # Type declarations
```

### Import Organization

1. External libraries (drizzle, better-auth, etc.)
2. SvelteKit imports (`$lib/`, `$env/`, etc.)
3. Relative imports

Example:

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import { betterAuth } from 'better-auth';
import { db } from '$lib/server/db';
import { env } from '$env/dynamic/private';
import './layout.css';
```

### Testing Patterns

- Test files: `*.spec.ts` or `*.test.ts`
- Component tests: Use `vitest-browser-svelte`
- Use `describe()`, `it()`, `expect()` from Vitest
- Browser tests: Use `page` from `vitest/browser`
- Server tests: Node environment

### Error Handling

- Throw descriptive errors for missing environment variables
- Use proper TypeScript types to prevent runtime errors
- Implement proper database error handling in server code
- Use try-catch blocks for external API calls

### Naming Conventions

- **Files**: kebab-case for routes, PascalCase for components
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Database tables**: kebab-case
- **Database columns**: camelCase (maps to snake_case)

### Environment Variables

- Store in `.env` (local) or use platform env vars
- Access via `$env/dynamic/private` for server-side
- Use `$env/static/public` for client-safe variables
- Never commit `.env` files to git

## Key Dependencies

- `@sveltejs/kit` - SvelteKit framework
- `svelte` v5 - UI framework
- `drizzle-orm` - Database ORM
- `better-auth` - Authentication
- `postgres` - PostgreSQL client
- `tailwindcss` - CSS framework
- `vitest` - Testing framework
- `playwright` - Browser automation

## Git Hooks & Quality Gates

Always run before committing:

```bash
pnpm lint      # Ensures code style consistency
pnpm check     # TypeScript validation
pnpm test      # All tests pass
```

## Database Development Workflow

1. Modify schema in `src/lib/server/db/schema/`
2. Run `pnpm db:push` for development (quick schema sync)
3. Run `pnpm db:generate` for production migrations
4. Use `pnpm db:studio` to inspect database
5. Start with `pnpm db:start` for local development

## Security Guidelines

- All sensitive operations in `/src/lib/server/`
- Use Better Auth for authentication, no custom auth logic
- Validate all user inputs
- Use parameterized queries (Drizzle handles this)
- Never expose database errors to client

## Performance Considerations

- Svelte 5 runes are optimized for reactivity
- Use database indexes for foreign keys
- Implement proper caching strategies in SvelteKit
- Optimize bundle size with proper imports

## Testing Strategy

- **Unit tests**: Server logic, utilities, database functions
- **Component tests**: UI components with browser environment
- **Integration tests**: Full user flows (e.g., authentication)
- Run both client (Playwright) and server (Node) test suites
