# 主题与样式体系（packages/themes/shadlike）

**核心事实：组件 SFC 无样式；一切可见样式由主题包提供。** 想让东西"看起来对"，改这里。改完要 `pnpm shadlike-theme build` 重建 dist（文档站/演练场/消费方 import 的是 dist）。

## 1. 主题包结构

```
packages/themes/shadlike/
├── postcss.config.js        # cssnano + postcss-nested（可用嵌套语法）
└── src/
    ├── index.css            # @import global + components
    ├── global/
    │   ├── index.css        # 聚合
    │   ├── variables.css    # 设计 token（颜色/字体/间距/圆角/阴影/动画/暗色开关）
    │   ├── animations.css   # 共享 keyframes
    │   ├── html-reset.css
    │   └── scrollbar.css
    └── components/
        ├── index.css        # @import './<name>.css' —— 新组件样式要在这里注册
        └── <name>.css       # 一个组件的样式一个文件
```

构建：`postcss src/index.css src/**/*.css --dir dist --base src`，产物保留同构目录（dist/index.css、dist/global/...、dist/components/<name>.css）。这就是消费方"按需引入组件样式"的文件来源。

## 2. 全局 token（variables.css）——写样式先查这里

- **语义色阶**：`--nue-primary-color-0..1000`、`--nue-success-color-10..100`、`--nue-warning-color-*`、`--nue-error-color-*`（全部是 HSL 派生，主色由 `--nue-brand-hue` 决定）；文本 `--nue-primary-text-color` / `--nue-secondary-text-color`；`--nue-border-color`、`--nue-divider-color`、`--nue-disabled-color`、`--nue-link-color`。
- **字体**：`--nue-primary-font-family`（含中文字体栈）；文本尺寸 `--nue-text-2xs..3xl`（`--nue-text-df` = 1rem 基准）。
- **间距/尺寸**：padding/gap/radius/box-size 各有 `--nue-padding-xs`、`--nue-gap-2xs` 这类刻度 + `--nue-primary-*` 别名；阴影 `--nue-primary-shadow(-color)` / `--nue-secondary-shadow(-color)`；`--nue-box-size-xs..lg` 等常用作控件高度。
- **动画**：`--nue-animation-duration(-xshort/short/long)`、`--nue-animation-timing-function`。
- **暗色模式开关**：`:root { --nue-dark-switch: 0|1 }`。全套 `--nue-hsl-*` 明度/饱和度刻度根据开关翻转（参考 `--nue-dark-prefix` 的 `cos(pi * switch) * -1` 技巧）。

**规则：颜色永远引用 token / 用 `hsl(from ...)` 从现有色派生，禁止写死 hex。** 这样暗色模式与主题定制自动生效。典型派生：`hsl(from var(--nue-primary-color-500) h s calc(l + var(--nue-dark-prefix) * 10))`（在基础色上加减明度得到 hover/active 等状态色）。

## 3. 组件 css 的写法套路（以 button.css 为准）

每个组件 css 通常分两个阶段：

**(a) 先给该组件的 CSS 变量设默认值**（变量默认值集中声明，方便覆盖与派生）：

```css
.nue-button {
    --nue-button-base-color: var(--nue-primary-color-0);
    --nue-button-font-size: var(--nue-text-sm);
    --nue-button-color: var(--nue-primary-text-color);
    --nue-button-bg-color: var(--nue-button-base-color);
    --nue-button-hover-bg-color: hsl(
        from var(--nue-button-bg-color) h s calc(l + var(--nue-dark-prefix) * var(--nue-button-lo))
    );
    /* ... */
}
```

**(b) 用这些变量写实际视觉规则**（可以嵌套写伪类与状态）：

```css
.nue-button {
    display: flex;
    align-items: center;
    height: var(--nue-box-size-df);
    border-radius: var(--nue-primary-radius);
    color: var(--nue-button-color);
    background-color: var(--nue-button-bg-color);
    &:hover {
        background-color: var(--nue-button-hover-bg-color);
    }
    &.nue-button--disabled {
        cursor: not-allowed;
        opacity: 0.8;
    }
}
```

变量默认值块与规则块分开声明是 button.css 的既有风格（同一选择器两个规则块），跟随即可。

**尺寸/主题/状态都靠"追加类名提升作用域"来覆盖变量**：

```css
.nue-button.nue-button--small {
    /* 双类选择器：提高优先级，覆盖默认变量 */
    --nue-button-font-size: var(--nue-text-xs);
    height: var(--nue-box-size-xs);
}
.nue-button.nue-button--primary {
    --nue-button-color: var(--nue-primary-color-100);
    --nue-button-base-color: hsl(
        from var(--nue-primary-color-900) h s calc(l - var(--nue-dark-switch) * 10)
    );
}
```

组件每声明一个 `--nue-<block>-<prop>` 变量（组件里通过 `:style` 暴露的）或可修饰类，主题就多一个可定制点。写组件时（见 component-conventions.md）就要想好这份"样式契约"。

## 4. 状态/动画的配合方式

- 状态类由组件端决定（`nue-xxx--disabled/loading/checked/...`），主题端负责"这个类长什么样"。**两端类名必须对得上**——改组件时同步查 css，改 css 时同步查组件。
- 弹层动画：overlay/弹层内容通过 `animation` props（`parsePopupItemAnimation`）输出 `--nue-overlay-animation-name/-duration`、`--nue-xxx-close-animation-*` 变量；主题 css 为这些变量提供 `animation` 声明并配 keyframes（共享动画在 global/animations.css，组件专用可写在组件 css 里）。参考 `overlay.css` + `dialog.css`。
- 简单动效可直接用 `transition`（如 hover），旋转类图标用 `animation`（见 `icon.css` 的 `nue-icon--spin`）。

## 5. 暗色模式写作要点

- 一律通过 `--nue-dark-switch` 体系（`--nue-dark-prefix`、`--nue-hsl-*`、`hsl(from ...)` 派生），而不是 `@media (prefers-color-scheme)` 里另写一套色值；
- 深浅主题下自动正确的写法：用语义色阶（`color-N` 的低 N 浅、高 N 深；暗色下 token 整体翻转明度）与文本/边框/阴影 token；
- 新写组件 css 前，先看一个已适配暗色的组件 css（如 button.css、text.css）找手感。

## 6. 常见坑

- **忘注册**：css 文件建了但 `src/components/index.css` 没 `@import` → 全量样式里没有它（dist 里也没有对应文件）。
- **忘重建**：src 改了但没跑 `pnpm shadlike-theme build` → 文档站/演练场看不到变化。
- **写死颜色**：违背 token 体系 → 暗色模式/换肤会破功。
- **类名不同步**：组件发 `nue-xxx--foo`，css 写 `.nue-yyy--foo`，样式静默失效——靠 `grep` 交叉核对。
- **变量默认值缺失**：组件在 :style 里用了 `--nue-xxx-gap`，主题没给默认值 → 该变量可能为 initial/无效；默认值应落在组件 css 里。