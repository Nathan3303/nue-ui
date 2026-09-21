# 主题（Theme）

NueUI 组件库本身**不携带任何样式**，所有可见的视觉（颜色、尺寸、暗色模式）都来自主题包 `nue-ui-theme-shadlike`。它是一套 Shadcn-like 风格的样式主题，通过 CSS 变量（设计 token）驱动，支持深色模式与深度定制。

> 当前版本：`nue-ui-theme-shadlike@0.13.x`，`<Badge text="模块" type="info" />` 按需按样式。

## 为什么需要主题包

组件 `.vue` 只负责渲染 DOM 结构与挂载类名，真正的样式在主题包的 CSS 里。因此：

- 组件渲染出来但"没有样式/长得很素"，第一反应是主题 CSS 没有引入；
- 想让组件"好看"，改的是主题包 / 覆盖 token，而不是组件源码。

## 快速开始

```shell
pnpm add nue-ui-theme-shadlike
```

全量引入（最简单的用法）：

```ts
// main.ts
import 'nue-ui-theme-shadlike/dist/index.css';
```

引入后即可看到组件库的完整样式。若只需部分组件样式，见 [安装与引入](./install.md)；想了解背后的设计 token，见 [设计系统](./design-tokens.md)。

## 板块导航

- [安装与引入](./install.md) — 全量 / 按需 / 图标字体
- [设计系统（Design Tokens）](./design-tokens.md) — 颜色、字体、间距、圆角、阴影、动画等 token 一览
- [深色模式](./dark-mode.md) — `--nue-dark-switch` 的原理与用法
- [定制主题](./customize.md) — 换主色、微调单个组件、样式兜底
- [按需引入组件样式](./components-css.md) — `dist/components/<name>.css` 清单与依赖说明