# 定制主题

定制按"从轻到重"的顺序进行：

1. **theme 属性** — 换现成风格，零 CSS（见[教程 - 主题属性](../tutorial/features/theme/index.md)）；
2. **覆盖 CSS 变量** — 换色、间距、圆角等 token；
3. **scoped 样式 + 类名** — 最后兜底。

## 全局换肤（覆盖 token）

先在主题样式**之后**引入覆盖样式，再按主题改对应的 token。两个主题的**变量名一致**，但默认值不同——改动前建议先对照 [两主题数值差异](./design-tokens.md#两个主题的数值差异)。

### 换主色

```css
/* shadlike：主色是【灰的】——primary 色阶引用 --nue-hsl-s0（0% 饱和），
   只改 hue 不会出现颜色，必须同时放开饱和阶梯（见下方「注意事项」） */
:root {
    --nue-brand-hue: 210;
}

/* glass：主色自带 38% 饱和，通常只改 hue 即可 */
:root {
    --nue-brand-hue: 210; /* 冷青 → 冷蓝 */
}
```

### 调密度

```css
/* shadlike：默认 padding-df 1rem / box-size-df 2.25rem */
:root {
    --nue-padding-df: 1rem;
    --nue-box-size-df: 2.25rem;
}

/* glass：默认已更紧凑（0.875rem / 2rem），如需更宽松可回调 */
:root {
    --nue-padding-df: 1rem;
    --nue-box-size-df: 2.25rem;
}
```

### 改玻璃观感（仅 glass）

```css
:root {
    --nue-glass-bg: hsl(192 22% 98% / 0.9); /* 更实 */
    --nue-glass-blur: blur(12px) saturate(110%); /* 硬上限：blur ≤24px、saturate ≤140% */
}
```

> 玻璃效果只由 6 个 `--nue-glass-*` 驱动，不要在组件里覆盖 `backdrop-filter`——那会绕过统一退化逻辑。

### 其余常用维度

```css
:root {
    --nue-primary-radius: 0.5rem; /* 全局圆角（两主题默认都是 0.375rem） */
    --nue-primary-font-family: 'Inter', sans-serif; /* 字体 */
    --nue-gap-df: 0.75rem; /* 常规间距（shadlike 1rem / glass 0.75rem） */
}
```

> 覆盖必须引入在**主题样式之后**，否则会被主题的 `:root` 默认值盖回去。

## 局部覆盖 token

token 是 CSS 变量，可以在任意作用域覆盖（容器、组件实例、类）。例如给一块区域单独换主色：

::: preview
demo-preview=./customize.vue
:::

## 覆盖组件级变量

每个组件把"可定制维度"暴露成 `--nue-<组件>-<属性>` 形式的组件级变量（如 `--nue-button-font-size`、`--nue-icon-*`），多数可直接在实例上覆盖：

```vue
<nue-button class="my-btn" theme="primary">确定</nue-button>

<style scoped>
.my-btn {
    --nue-button-font-size: var(--nue-text-lg); /* 覆盖默认字号变量 */
}
</style>
```

某个组件支持哪些变量、默认值多少，直接看主题源码对应文件顶部的变量默认值块：`packages/themes/shadlike/src/components/<name>.css`；或在文档站/消费方的 `node_modules/nue-ui-theme-shadlike/dist/components/<name>.css` 中查找。

## 兜底：类名 + scoped 样式

组件根元素上有稳定的 BEM 类（`nue-button`、`nue-dialog`…），挂自定义 class 后用 scoped 样式（或非 scoped + 更高优先级）覆盖：

```vue
<nue-button class="danger-zone" theme="primary">危险操作</nue-button>

<style scoped>
.danger-zone {
    background-color: var(--nue-error-color-50); /* 尽量引用 token */
}
</style>
```

## 注意事项

1. **写死色值 = 深色模式破功**，一律引用 token；
2. `theme` 属性不是"直接给颜色"的地方，自定义颜色走 CSS 变量；
3. 覆盖需放在主题样式之后（CSS 变量覆盖顺序决定生效优先级）。