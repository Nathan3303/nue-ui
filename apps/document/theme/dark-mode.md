# 深色模式

主题体系内建深色模式：无需额外引入文件，给 `:root`（或任意容器）设 `--nue-dark-switch` 即可。

## 原理

`--nue-dark-switch`（`0` 浅色 / `1` 深色）控制整套 HSL 明度/饱和度刻度（`--nue-hsl-l*`、`--nue-hsl-s*`）是否翻转；`--nue-dark-prefix` 由 `cos(pi * switch) * -1` 得到 `-1`（浅色）或 `+1`（深色），状态色用它加减明度生成 hover/active 等派生色。

因此**只要样式引用了 token，深浅色下都会自动协调**；写死色值的地方则不会。

## 用法

```ts
// 跟随系统或手动切换
document.documentElement.style.setProperty('--nue-dark-switch', isDark ? '1' : '0');
```

也支持作用在指定容器上（该容器及其子树切深色）：

```css
.dark-area {
    --nue-dark-switch: 1;
}
```

## 示例

::: preview
demo-preview=./dark-mode.vue
:::

## 注意事项

1. 深色模式是"明度翻转"，色相保持不变（如主色仍偏红）；
2. 自己写的样式务必引用 token，否则深色下不会自动适配；
3. 组件级变量（如 `--nue-button-bg-color`）多数已由主题包按 token 派生，深色下自动生效。