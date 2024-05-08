<script setup>
import { ref } from "vue";

const loadingState = ref(false);
const changeLoadingState = () => {
    loadingState.value = true;
    setTimeout(() => {
        loadingState.value = false;
    }, 3000);
};
</script>
<style scoped>
.nue-button--custom {
    --font-color: white;
    --font-weight: bold;
    --border-color: transparent;
    --background-color: #7878c4;
    --hover-background-color: #6464a0;
    --active-background-color: #50508c;
}
</style>

# Button 按钮

常用的操作按钮组件。

## 基础用法

使用 `NueButton` 组件创建一个按钮。

<nue-button>默认按钮</nue-button>

```vue
<template>
    <nue-button>默认按钮</nue-button>
</template>
```

## 禁用状态

使用 `disabled` 属性可以禁用按钮。

`disabled` 属性接受 `boolean` 类型的值，`true` 表示禁用，`false` 表示启用。

<nue-div>
    <nue-button disabled>禁用状态</nue-button>
    <nue-button :disabled="false">启用状态</nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button disabled>禁用状态</nue-button>
        <nue-button :disabled="false">启用状态</nue-button>
    </nue-div>
</template>
```

## 不同的尺寸和形状

### 尺寸

按钮有不同的尺寸，可以通过 `size` 属性设置。

`size` 的属性值最终会被设置为 CSS 中的 `font-size` 值，可以接受 `px`、`em`、`rem` 等单位。

按钮整体大小受其中的文本大小影响，因此也可以通过 CSS 的方式设置按钮的大小。

<nue-div align="center">
    <nue-button size="18px">按钮A</nue-button>
    <nue-button size="22px">按钮B</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button size="18px">按钮A</nue-button>
        <nue-button size="22px">按钮B</nue-button>
    </nue-div>
</template>
```

### 形状

按钮有不同的形状，可以通过 `shape` 属性设置。

`shape` 属性的值可以是 `square*`、`round`、`round-no-border`、`square-no-border` 以及 `no-shape`。

-   `*` 表示为该属性的默认值

<nue-div align="center">
    <nue-button shape="square">Square</nue-button>
    <nue-button shape="round">Round</nue-button>
    <nue-button shape="square-no-border">SquareNoBorder</nue-button>
    <nue-button shape="round-no-border">RoundNoBorder</nue-button>
    <nue-button shape="no-shape">NoShape</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button shape="square">Square</nue-button>
        <nue-button shape="round">Round</nue-button>
        <nue-button shape="square-no-border">SquareNoBorder</nue-button>
        <nue-button shape="round-no-border">RoundNoBorder</nue-button>
        <nue-button shape="no-shape">NoShape</nue-button>
    </nue-div>
</template>
```

## 图标按钮

按钮可以添加图标，通过 `icon` 属性设置。

::: tip
目前 `icon` 属性仅支持 `nue-ui` 中的 iconfont 图标。
:::

<nue-div align="center">
    <nue-button icon="icon-search">搜索</nue-button>
    <nue-button icon="icon-mail">消息</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button icon="icon-search">搜索</nue-button>
        <nue-button icon="icon-mail">消息</nue-button>
    </nue-div>
</template>
```

## 加载状态以及加载图标

### 设置加载状态

按钮可以显示加载状态，通过 `loading` 属性设置。

`loading` 属性接受 `boolean` 类型的值，`true` 表示显示加载状态，`false` 表示隐藏加载状态。

<nue-button
icon="icon-search"
@click="changeLoadingState"
:loading="loadingState">
Search
</nue-button>

```vue
<template>
    <nue-button
        icon="icon-search"
        @click="changeLoadingState"
        :loading="loadingState">
        Search
    </nue-button>
</template>
<script setup>
import { ref } from "vue";
const loadingState = ref(false);
const changeLoadingState = () => {
    loadingState.value = true;
    setTimeout(() => (loadingState.value = false), 3000);
};
</script>
```

### 自定义加载图标

按钮可以自定义加载图标，通过 `loading-icon` 属性设置。

`loading-icon` 属性接受 `string` 类型的值，表示自定义的加载图标的类名。

::: tip
目前 `loading-icon` 属性仅支持 `nue-ui` 中的 iconfont 图标。
:::

<nue-button
icon="icon-search"
@click="changeLoadingState"
:loading="loadingState"
loading-icon="icon-target" >
Search
</nue-button>

```vue
<template>
    <nue-button
        icon="icon-search"
        @click="changeLoadingState"
        :loading="loadingState"
        loading-icon="icon-target">
        Search
    </nue-button>
</template>
<script setup>
import { ref } from "vue";
const loadingState = ref(false);
const changeLoadingState = () => {
    loadingState.value = true;
    setTimeout(() => (loadingState.value = false), 3000);
};
</script>
```

## 添加自定义类名以及使用预设主题

### 添加自定义类名

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: tip
添加后的类名为 `nue-button--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-button--custom`。
:::

<nue-button theme="custom" icon="icon-dianzan">点赞</nue-button>

```vue
<template>
    <nue-button theme="custom" icon="icon-dianzan">点赞</nue-button>
</template>
<style scoped>
.nue-button--custom {
    --font-color: white;
    --font-weight: bold;
    --border-color: transparent;
    --background-color: #7878c4;
    --hover-background-color: #6464a0;
    --active-background-color: #50508c;
}
</style>
```

### 使用预设主题

预设主题的使用依然是通过 `theme` 属性设置。

预设主题包括 `icon-only` 和 `text-only`。

<nue-div align="center">
    <nue-button theme="icon-only" icon="icon-theme">IconOnly</nue-button>
    <nue-button theme="text-only" icon="icon-theme">TextOnly</nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button theme="icon-only" icon="icon-theme">IconOnly</nue-button>
        <nue-button theme="text-only" icon="icon-theme">TextOnly</nue-button>
    </nue-div>
</template>
```
