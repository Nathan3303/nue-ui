# Div 盒组件

盒组件是对基本元素 `div` 和 `flex` 流式布局的封装。

## 基础用法

通过标签 `NueDiv` 声明一个盒组件，默认的布局方向为水平。

排列间距 `gap` 默认为 `1rem`，可以通过属性 `gap` 自定义。

::: preview
demo-preview=./basic.vue
:::

### 垂直排列

通过属性 `vertical` 设置布局方向为垂直，具体应用为 `flex-direction` 为 `column`。

::: preview
demo-preview=./vertical.vue
:::

### 对齐方式

流式布局的对齐方式拥有主轴和副轴两个方向，具体应用到 CSS 的 `justify-content` 和 `align-items` 两个属性。

通过属性 `justify` 和 `align` 设置主轴和副轴的对齐方式，值类型同 CSS 属性值。

::: preview
demo-preview=./justify-align.vue
:::

## 溢出控制

### 溢出断行

通过属性 `wrap` 设置是否在溢出时断行，具体应用到 CSS 的 `flex-wrap`，属性值类型同 CSS 属性值，默认不换行。

::: preview
demo-preview=./wrap.vue
:::

### 溢出隐藏或滚动

通过属性 `overflow` 设置溢出时的处理方式，值类型为 CSS `overflow` 属性值，默认值为 `hidden`。

::: preview
demo-preview=./overflow.vue
:::

## 组件属性与事件

下方涵盖了 `NueDiv` 组件所有的可用属性与事件。

### 属性

| 属性        | 类型                                    | 默认值 | 说明         |
| ----------- | --------------------------------------- | ------ | ------------ |
| `direction` | `string`                                | -      | 布局方向     |
| `vertical`  | `boolean`                               | -      | 垂直排列     |
| `align`     | `string`                                | -      | 副轴对齐方式 |
| `justify`   | `string`                                | -      | 主轴对齐方式 |
| `flex`      | `string`                                | -      | 弹性布局     |
| `wrap`      | `string`                                | -      | 换行方式     |
| `gap`       | `string`                                | -      | 间距         |
| `width`     | `string`                                | -      | 宽度         |
| `height`    | `string`                                | -      | 高度         |
| `divider`   | `string \| number \| boolean \| object` | -      | 分割线       |
| `theme`     | `string \| string[]`                    | -      | 主题样式     |
| `inline`    | `boolean`                               | -      | 行内元素     |
| `overflow`  | `string`                                | -      | 溢出处理     |
| `autoFit`   | `boolean`                               | -      | 自动适应     |