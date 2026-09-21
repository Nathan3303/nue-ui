# 安装与引入

`nue-ui-theme-shadlike` 与组件库 `nue-ui` 分开安装。组件的安装方式见[教程 - 安装](../tutorial/usage/install.md)，本章只讲主题样式怎么引。

## 安装

```shell
# npm
npm install nue-ui-theme-shadlike

# pnpm
pnpm add nue-ui-theme-shadlike

# yarn
yarn add nue-ui-theme-shadlike
```

## 方式一：全量引入（省事）

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import NueUI from 'nue-ui'; // 组件库（逻辑）
import 'nue-ui-theme-shadlike/dist/index.css'; // 主题样式（全量）
import 'nue-ui-iconfont/dist/iconfont.css'; // 图标字体（用到 <nue-icon> 时）

createApp(App).use(NueUI).mount('#app');
```

- `dist/index.css` 内含 `@import` 聚合了 `dist/global/*` 与 `dist/components/*`，一行全齐；
- 图标是独立字体包 `nue-ui-iconfont`，不引入时 `<nue-icon>` 会空白。

## 方式二：按需引入（树摇友好）

先引入全局基线（token 与基础样式），再按用到的组件引入对应 css：

```ts
// main.ts
import 'nue-ui-theme-shadlike/dist/global/index.css';
import 'nue-ui-theme-shadlike/dist/components/button.css';
import 'nue-ui-theme-shadlike/dist/components/input.css';
```

::: warning 组件样式之间的依赖
部分组件样式依赖其它组件的样式（如 `dialog` 依赖 `overlay`、`container`、`text` 等）。拿不准依赖时，直接全量 `import 'nue-ui-theme-shadlike/dist/index.css'` 最稳。
:::

可引入的组件 css 清单见[按需引入组件样式](./components-css.md)。

## 方式三：只引入全局基线

不需要任何组件视觉、只想用 token（如自己写的页面引用 `var(--nue-gap-sm)`）时：

```ts
import 'nue-ui-theme-shadlike/dist/global/index.css';
```

`global/index.css` 包含设计 token（`variables.css`）、动画、HTML 基础样式与滚动条样式，详见[设计系统](./design-tokens.md)。