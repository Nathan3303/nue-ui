# NueUI Agent Guidelines

Guidelines for agentic coding agents in the NueUI repository.

## Project Overview

Vue 3 + TypeScript UI component library using pnpm monorepo.

### Structure

```
packages/
├── core/          # Component library build
├── components/   # Vue 3 components
├── hooks/        # Composition API hooks
├── utils/        # Utilities
└── themes/       # Themes (shadlike, iconfont)
apps/
├── playground/   # Component testing
├── document/    # Documentation
└── histoire/    # Component stories
```

---

## Commands

| Command                     | Description                      |
| --------------------------- | -------------------------------- |
| `pnpm install`              | Install dependencies             |
| `pnpm build`                | Build all packages               |
| `pnpm core build`           | Build component library          |
| `pnpm shadlike-theme build` | Build Shadlike theme             |
| `pnpm iconfont build`       | Build iconfont                   |
| `pnpm playground dev`       | Start playground (quick testing) |
| `pnpm document dev`         | Start documentation              |
| `pnpm histoire dev`         | Start Histoire storybook         |
| `pnpm lint`                 | Run ESLint                       |
| `pnpm lint -- --fix`        | Auto-fix ESLint                  |
| `pnpm format`               | Run Prettier                     |

---

## Code Style

### General

- TypeScript + Vue 3 Composition API
- Vue SFC: `<script lang="ts" setup>`
- Use `withInstall()` for component registration
- Naming: PascalCase (`NueButton`), camelCase (functions/variables)

### Prettier

`tabWidth: 4`, `singleQuote: true`, `printWidth: 100`, `trailingComma: "none"`

### ESLint

Flat config with `typescript-eslint` + `eslint-plugin-vue`. Key rules:

- `vue/multi-word-component-names`: OFF

### TypeScript

Strict mode: `strict: true`, `noEmitOnError: true`

---

## Component Pattern

```
components/button/
├── index.ts      # Exports + withInstall
├── types.ts     # TypeScript interfaces
└── button.vue   # Vue SFC
```

```typescript
// index.ts
import { withInstall } from '@nue-ui/utils';
import Button from './button.vue';
import type { NueButtonProps, NueButtonEmits } from './types';

export const NueButton = withInstall(Button);
export type { NueButtonProps, NueButtonEmits };
```

```typescript
// types.ts
import type { GlobalProps } from '@nue-ui/utils';

export interface NueButtonProps extends GlobalProps {
    disabled?: boolean;
    loading?: boolean;
    size?: 'small' | 'large';
}

export type NueButtonEmits = {
    click: [payload: MouseEvent];
};
```

```vue
<!-- Component.vue -->
<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueButtonProps, NueButtonEmits } from './types';

defineOptions({ name: 'NueButton' });
const emit = defineEmits<NueButtonEmits>();
const props = withDefaults(defineProps<NueButtonProps>(), { type: 'button' });

const classes = computed(() => {
    const prefix = 'nue-button';
    return [prefix, ...parseTheme(props.theme, prefix)];
});
</script>

<template>
    <button :class="classes" @click="emit('click', $event)"><slot /></button>
</template>
```

---

## Imports

```typescript
// Internal packages (path aliases)
import { withInstall, parseTheme } from '@nue-ui/utils';
import { useBoolState } from '@nue-ui/hooks';
import NueIcon from '../icon/icon.vue';

// Vue core
import { computed, ref, inject } from 'vue';
import type { Ref } from 'vue';
```

---

## Adding a Component

1. Create folder under `packages/components/`
2. Add `index.ts`, `types.ts`, `*.vue`
3. Export from `packages/components/index.ts`
4. Add story in `apps/histoire/stories/`
5. Build: `pnpm core build`

---

## Dependencies

Vue 3.5+, Vite 6.3, TypeScript 5.8+, ESLint 9, Prettier 3, Vitest 3

---

## Notes

- No Cursor/Copilot rules found
- Multi-word component names allowed
- CSS uses PostCSS with nested/var()
