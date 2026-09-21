# 定制主题

定制按"从轻到重"的顺序进行：

1. **theme 属性** — 换现成风格，零 CSS（见[教程 - 主题属性](../tutorial/features/theme/index.md)）；
2. **覆盖 CSS 变量** — 换色、间距、圆角等 token；
3. **scoped 样式 + 类名** — 最后兜底。

## 全局换肤（覆盖 token）

主题包把可定制维度暴露为 `:root` 上的 token，在主题样式**之后**引入覆盖即可全局生效：

```css
:root {
    --nue-brand-hue: 210; /* 主色相：默认红(0)，换蓝(210) */
    --nue-primary-radius: 0.5rem; /* 全局圆角 */
    --nue-primary-font-family: 'Inter', sans-serif; /* 字体 */
}
```

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