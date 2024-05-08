<script setup>
import { ref } from "vue";
</script>

# Divider 分隔符

用于显式地分隔内容区域。

## 基础用法

使用 `NueDivider` 组件来分隔内容区域。

通过 `direction` 属性设置分隔符的方向，可选值为 `horizontal*` 和 `vertical`。

-   `*` 表示属性默认值。

::: tip
**水平分隔符**通常用于分割**垂直排列**的区域，而**垂直分隔符**通常用于分割**水平排列**的区域。
:::

<nue-div align="center">
  <nue-button>Button 1</nue-button>
  <nue-divider direction="vertical" />
  <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button>Button 1</nue-button>
        <nue-divider direction="vertical" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```

## 设置分隔符文本及其对齐方式

### 设置分隔符文本

通过 `text` 属性设置分隔符的文本内容。

<nue-div vertical>
    <nue-button>Button 1</nue-button>
    <nue-divider text="abc"/>
    <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>Button 1</nue-button>
        <nue-divider text="abc" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```

### 设置分隔符对齐方式

通过 `align` 属性设置分隔符的对齐方式，可选值为 `left*`、`center`、`right`。

<nue-div vertical>
    <nue-button>Button 1</nue-button>
    <nue-divider text="abc" align="center"/>
    <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>Button 1</nue-button>
        <nue-divider text="abc" align="center" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```

## 设置分割线样式

### 设置分割线颜色

通过 `border-color` 属性设置分割线的颜色。

<nue-div vertical>
    <nue-button>Button 1</nue-button>
    <nue-divider border-color="#f30"/>    
    <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>Button 1</nue-button>
        <nue-divider border-color="#f30" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```

### 设置分割线宽度

通过 `border-width` 属性设置分割线的高度，接收 `string` 类型的 CSS 长度值，默认 `1px`。

<nue-div vertical>
    <nue-button>Button 1</nue-button>
    <nue-divider border-width="3px"/>
    <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>Button 1</nue-button>
        <nue-divider border-width="3px" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```

### 设置分割线类型

通过 `border-type` 属性设置分割线的类型，可选值为 `solid*`、`dashed` 以及 `dotted`。

<nue-div vertical>
    <nue-button>Button 1</nue-button>
    <nue-divider border-color="#f40" border-type="dashed"/>
    <nue-button>Button 2</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>Button 1</nue-button>
        <nue-divider border-color="#f40" border-type="dashed" />
        <nue-button>Button 2</nue-button>
    </nue-div>
</template>
```
