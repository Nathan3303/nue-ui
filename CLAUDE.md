# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

NueUI is a Vue 3 UI component library (~30+ components) organized as a pnpm monorepo. Published package: `nue-ui`.

## Commands

```bash
# Testing
pnpm test              # Vitest in watch mode
pnpm test:run          # Single run
pnpm test:coverage     # With coverage report

# Code quality
pnpm lint              # ESLint (flat config: eslint.config.mjs)
pnpm format            # Prettier

# Build
pnpm build             # Build all: core + shadlike theme + iconfont
pnpm core build        # Build just the component library (ES + UMD)

# Dev servers
pnpm document dev      # VitePress docs site
pnpm histoire dev      # Histoire component explorer
pnpm playground dev    # Playground app
```

## Architecture

### Monorepo Structure

```text
apps/          - Dev tools (not published)
  document/    - VitePress documentation site
  histoire/     - Histoire-based component explorer
  playground/  - Component sandbox
packages/
  components/  - Vue components (one directory each: *.vue, index.ts, types.ts, __tests__/)
  core/        - Build assembly: aggregates all components into the publishable `nue-ui` package
  hooks/       - Vue 3 composables (usePopper, useBoolState, useLoadingState, etc.)
  plugins/     - Plugins (e.g., unplugin-vue-components resolver for auto-import)
  themes/      - Theme packages (shadlike, iconfont)
  utils/       - Shared utilities (install.ts, parsers.ts, utils.ts, types.ts)
```

### Component Pattern

Every component follows the same pattern. Example (`button/`):

- `button.vue` - SFC using `<script lang="ts" setup>`, named `NueButton` via `defineOptions({ name: 'NueButton' })`
- `types.ts` - Props interface extends `GlobalProps` (from `@nue-ui/utils`), which provides `theme?: string | string[] | ObjectLikeThemes`
- `index.ts` - Wraps component with `withInstall()` from `@nue-ui/utils`, re-exports types
- `__tests__/` - Vitest tests using `@vue/test-utils`

### Key Abstractions

**`@nue-ui/utils`** — The shared foundation:

- `withInstall(component)` — Makes a component installable as a Vue plugin (`app.component(name, comp)`)
- `makeInstaller(components[])` — Creates the global installer used by `nue-ui`'s default export
- `parseTheme(value, prefix)` — Normalizes theme prop (string/array/object) to CSS class array like `['nue-button--primary']`
- `parseFlex()`, `parseFlexWrap()`, `parsePopupItemAnimation()` — Other CSS value parsers
- `debounce()`, `throttle()`, `generateId()` — Generic utilities
- `GlobalProps` — Base interface with `theme` prop, extended by all component props

**`packages/core/`** — Build aggregation (not component source):

- `components.ts` — Imports all components from `@nue-ui/components` into a flat `Plugin[]` array
- `index.ts` — Calls `makeInstaller(components)`, re-exports everything from `@nue-ui/components` and `@nue-ui/utils`, adds dev/prod console banner
- `vite.es.config.ts` / `vite.umd.config.ts` — Vite lib mode builds; ES build does manual chunk splitting per component

**Compound components** — Parent-child communication via `provide/inject` (e.g., `ButtonGroup` provides `BUTTON_GROUP_CTX_KEY` with shared size/disabled; children inject it).

### Testing

- Framework: Vitest with jsdom, globals enabled
- Setup: `test-setup.ts` mocks `ResizeObserver`, `matchMedia`, `IntersectionObserver`, `getComputedStyle`
- Test utils: `test-utils.ts` provides `waitFor()`, `flushPromises()`, `getComponentWrapper()`
- Tests co-located in each component's `__tests__/` directory
- `vitest.config.ts` maps workspace aliases (`@nue-ui/components`, `@nue-ui/hooks`, `@nue-ui/utils`) to source directories

### Pre-commit

Husky runs `lint-staged` + `prettier --write .` + `pnpm test:run` on commit.

## Feature Planning & Development Logs

### Feature Planning

- Before developing new features, create a plan. Planning documents should be placed in the docs/plans directory. If the directory doesn't exist, create it and add a new .md file.
- When planning new features, ensure all work revolves around the MVP approach - only the core features needed are developed, and everything else is not considered.

### Development Logs

- When executing plans, work is typically done in phases. Development logs for each phase should be saved in docs/devlogs/`<plan-name>/`/`<phase-x.md>` files.
- Log content should briefly record: what was implemented, how it was implemented, and which files were affected.
