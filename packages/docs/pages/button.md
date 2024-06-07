<script setup>
import { ref } from "vue";

const count = ref(0);
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
    --color: white;
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

<nue-button>按钮</nue-button>

```vue
<template>
    <nue-button>按钮</nue-button>
</template>
```

## 禁用状态

使用 `disabled` 属性可以禁用按钮，类型为 `boolean`。

<nue-button disabled>禁用状态</nue-button>

```vue
<template>
    <nue-button disabled>禁用状态</nue-button>
</template>
```

## 设置按钮大小

按钮拥有小、正常、大三种尺寸，通过 `size` 属性设置。小和大尺寸分别对应 `size` 属性的值 `small` 和 `large`，不指定 `size` 属性则为正常尺寸。

<nue-div align="center">
    <nue-button size="small">按钮</nue-button>
    <nue-button>按钮</nue-button>
    <nue-button size="large">按钮</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button size="small">按钮</nue-button>
        <nue-button>按钮</nue-button>
        <nue-button size="large">按钮</nue-button>
    </nue-div>
</template>
```

## 图标按钮

按钮可以添加图标，通过 `icon` 属性设置。

::: tip
目前 `icon` 属性仅支持 `nue-ui` 中的 iconfont 图标。
:::

<nue-div align="center">
    <nue-button icon="search">搜索</nue-button>
    <nue-button icon="mail">消息</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button icon="search">搜索</nue-button>
        <nue-button icon="mail">消息</nue-button>
    </nue-div>
</template>
```

## 按钮组及统一属性控制

### 按钮组组件

通过 `NueButtonGroup` 组件可以将多个按钮以按钮组的形式排列。

<nue-button-group>
    <nue-button icon="search">搜索</nue-button>
    <nue-button icon="plus" disabled>添加</nue-button>
    <nue-button icon="more">更多</nue-button>
</nue-button-group>

```vue
<template>
    <nue-button-group>
        <nue-button icon="search">搜索</nue-button>
        <nue-button icon="plus" disabled>添加</nue-button>
        <nue-button icon="more">更多</nue-button>
    </nue-button-group>
</template>
```

### 统一属性控制

按钮组组件 `NueButtonGroup` 接收 `size` 和 `disabled` 属性控制组中按钮的属性。

-   `size` 用于控制按钮组中的按钮大小。
-   `disabled` 用于控制按钮组中的按钮是否禁用。

::: tip
按钮组组件中对按钮的属性控制优先级高于按钮组组件自身的属性。
:::

<nue-button-group size="small" disabled>
    <nue-button icon="search">搜索</nue-button>
    <nue-button icon="plus-circle">添加</nue-button>
    <nue-button icon="more">更多</nue-button>
</nue-button-group>

```vue
<template>
    <nue-button-group size="small" disabled>
        <nue-button icon="search">搜索</nue-button>
        <nue-button icon="plus-circle">添加</nue-button>
        <nue-button icon="more">更多</nue-button>
    </nue-button-group>
</template>
```

## 加载状态以及加载图标

### 设置加载状态

按钮可以显示加载状态，通过 `loading` 属性设置。

`loading` 属性接受 `boolean` 类型的值，`true` 表示显示加载状态，`false` 表示隐藏加载状态。

<nue-button
icon="search"
@click="changeLoadingState"
:loading="loadingState">
搜索
</nue-button>

```vue
<template>
    <nue-button
        icon="search"
        @click="changeLoadingState"
        :loading="loadingState">
        搜索
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
icon="search"
@click="changeLoadingState"
:loading="loadingState"
loading-icon="scan" >
Search
</nue-button>

```vue
<template>
    <nue-button
        icon="search"
        @click="changeLoadingState"
        :loading="loadingState"
        loading-icon="scan">
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

## 节流

通过 `use-throttle` 属性启用节流模式，默认值为 `false`。

通过 `throttle-duration` 属性设置节流间隔，单位为 `ms`，默认值为 `200` 。

<nue-button use-throttle :throttle-duration="360" @click="count++">
Count: {{ count }}
</nue-button>

```vue
<template>
    <nue-button use-throttle :throttle-duration="360" @click="count++">
        Count: {{ count }}
    </nue-button>
</template>
<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
```

## 添加自定义类名以及使用预设主题

### 添加自定义类名

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: tip
-   除了以 `string[]` 的方式传递多个主题名，还支持通过 `,` 分隔的字符串形式传递多个主题名。如 `theme="custom1,custom2"` 等价于 `:theme="['custom1', 'custom2']`。
-   添加后的类名为 `nue-button--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-button--custom`。
:::

<nue-button theme="custom" icon="subscribe">点赞</nue-button>

```vue
<template>
    <nue-button theme="custom" icon="subscribe">点赞</nue-button>
</template>
<style scoped>
.nue-button--custom {
    --color: white;
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

预设主题包括 `icon-only`、 `primary` 以及 `pure`。

<nue-div align="center">
    <nue-button theme="icon-only" icon="theme"></nue-button>
    <nue-button theme="primary" icon="theme">按钮</nue-button>
    <nue-button theme="pure" icon="theme">按钮</nue-button>
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-button theme="icon-only" icon="theme"></nue-button>
        <nue-button theme="primary" icon="theme">按钮</nue-button>
        <nue-button theme="pure" icon="theme">按钮</nue-button>
    </nue-div>
</template>
```
