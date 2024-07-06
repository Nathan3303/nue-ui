<script setup>
import { ref } from "vue";
</script>

# (Flex)Div 弹性盒

使用 `Flex` 布局方式的弹性盒组件。

## 基础用法

使用 `NueDiv` 包裹使用。

默认的布局方向 `flex-direction` 为 `row`。

<nue-div>
    <nue-button>按钮</nue-button>
    <nue-button>按钮</nue-button>
    <nue-button>按钮</nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
</template>
```

## 垂直排列

通过属性 `vertical` 设置布局方向 `flex-direction` 为 `column`。属性接收 `boolean` 类型。

<nue-div vertical>
    <nue-button>按钮</nue-button>
    <nue-button>按钮</nue-button>
    <nue-button>按钮</nue-button>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
</template>
```

## 设置元素对齐方式

对齐方式拥有主轴和副轴两个方向，具体应用到 CSS 的 `justify-content` 和 `align-items` 两个属性。

通过 `justify` 和 `align` 属性设置主轴和副轴的对齐方式。它们的值类型都为 `string`，可选值与 CSS 一致。

<nue-div vertical>
    <nue-div align="center">
        <nue-button size="small">按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
    <nue-div align="center" justify="space-between" width="100%">
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-div align="center">
            <nue-button size="small">按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
        <nue-div align="center" justify="space-between" width="100%">
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </nue-div>
</template>
```

## 断行

通过 `wrap` 属性设置是否断行，具体应用到 CSS 的 `flex-wrap` 样式。

<nue-div wrap>
    <nue-button v-for="i in 10" :key="i">按钮</nue-button>
</nue-div>

```vue
<template>
    <nue-div wrap>
        <nue-button v-for="i in 10" :key="i">按钮</nue-button>
    </nue-div>
</template>
```

## 设置元素分隔符

通过 `divider` 属性设置元素之间的分隔符。

`divider` 属性接收 `string`、`number` 以及 `object` 类型。

::: tip
当 `divider` 为 `object` 类型时，所插入的分隔符会渲染为 `NueDivider` 组件，其中的键值对将被作为 `NueDivider` 的 props。
组件具体的 props 请参考 [`NueDivider`](/pages/divider.html) 文档。
:::

<nue-div vertical>
    <nue-div align="center" divider="|">
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
    <nue-div
        vertical
        :divider="{
            text: 'NueDivider',
            borderWidth: '2px',
            borderType: 'dashed',
            borderColor: '#a72230',
        }"
        align="center">
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
        <nue-button>按钮</nue-button>
    </nue-div>
</nue-div>

```vue
<template>
    <nue-div vertical>
        <nue-div align="center" divider="|">
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
        <nue-div
            vertical
            align="center"
            :divider="{
                text: 'NueDivider',
                borderWidth: '2px',
                borderType: 'dashed',
                borderColor: '#a72230',
            }">
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
            <nue-button>按钮</nue-button>
        </nue-div>
    </nue-div>
</template>
```
