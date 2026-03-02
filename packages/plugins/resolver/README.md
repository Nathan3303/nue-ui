# @nue-ui/resolver

Resolver for `unplugin-vue-components` to auto-import NueUI Vue 3 components.

## Installation

```bash
# npm
npm install @nue-ui/resolver -D

# pnpm
pnpm add @nue-ui/resolver -D
```

## Usage

### Vite Configuration

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [NueUiResolver()]
        })
    ]
});
```

### With Additional Options

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                NueUiResolver({
                    // Custom import path (default: '@nue-ui/components')
                    importPath: '@nue-ui/components'
                })
            ]
        })
    ]
});
```

## Important: Manual CSS Import

This resolver only handles **component auto-import**. You must manually import the component CSS:

```ts
// main.ts
import 'nue-ui/dist/index.css';
```

Or import individual component CSS:

```ts
// main.ts
import 'nue-ui/dist/theme/button.css';
import 'nue-ui/dist/theme/dialog.css';
```

## Supported Components

- NueAside
- NueAvatar
- NueBadge
    - NueBreadcrumb
- NueBreadcrumbItem
- NueButton
- NueButtonGroup
- NueCheckbox
- NueCheckboxGroup
- NueCollapse
- NueCollapseItem
- NueContainer
- NueContent
- NueDialog
- NueDiv
- NueDivider
- NueDrawer
- NueDropdown
- NueDropdownItem
- NueEmpty
- NueFooter
- NueHeader
- NueIcon
- NueInfiniteScroll
- NueInput
- NueLink
- NueMain
- NueMarquee
- NueMessageWrapper
- NuePopupPool
- NueProgress
- NueSwitch
- NueSelect
- NueSelectOption
- NueSeparator
- NueText
- NueTextarea
- NueTooltip

## Options

| Option       | Type     | Default              | Description                |
| ------------ | -------- | -------------------- | -------------------------- |
| `importPath` | `string` | `@nue-ui/components` | Import path for components |

## TypeScript

This package includes TypeScript declarations.
