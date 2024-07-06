<script setup>
import { ref } from "vue";
</script>
<style scoped>
.nue-link--custom {
    --color: orange;
    --font-weight: bolder;
    --text-decoration: none;
    --font-size: 16px;
    --hover-background-color: #a5a5a5;
    --hover-font-color: blue;
}
</style>

# Link 链接

文字超链接

## 基础用法

通过 `NueLink` 组件可以实现文字超链接的功能。

通过 `href` 属性设置链接的目标地址。

::: raw
<nue-link href="https://www.baidu.com">链接到百度</nue-link>
:::

```vue
<template>
    <nue-link href="https://www.baidu.com">链接到百度</nue-link>
</template>
```

## 禁用状态

通过 `disabled` 属性可以禁用链接。

::: raw

<nue-link href="https://www.baidu.com" disabled>链接到百度</nue-link>

:::

```vue
<template>
    <nue-link href="https://www.baidu.com" disabled>链接到百度</nue-link>
</template>
```

## 链接前置图标

通过 `icon` 属性可以给链接添加前置图标，接受 `string` 类型的值，表示图标的类名。

::: raw
<nue-div align="center">
    <nue-text>
        一些文字
        <nue-link icon="search">搜索</nue-link>
        一些文字
    </nue-text>
</nue-div>
:::

```vue
<template>
    <nue-div align="center">
        <nue-text>
            一些文字
            <nue-link icon="search">搜索</nue-link>
            一些文字
        </nue-text>
    </nue-div>
</template>
```

## 添加自定义类名以及使用预设主题

### 添加自定义类名

通过 `theme` 属性可以给按钮添加自定义的类名，接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: raw
<nue-link theme="custom" icon="theme">自定义主题</nue-link>
:::

```vue
<template>
    <nue-link theme="custom" icon="theme">自定义主题</nue-link>
</template>
<style scoped>
.nue-link--custom {
    --color: orange;
    --font-weight: bolder;
    --text-decoration: none;
    --font-size: 16px;
    --hover-background-color: #a5a5a5;
    --hover-font-color: blue;
}
</style>
```

### 使用预设主题

预设主题的使用依然是通过 `theme` 属性设置。预设主题包括 `btnlike`。

::: raw
<nue-div>
    <nue-link theme="btnlike" icon="theme">Btnlike</nue-link>
</nue-div>
:::

```vue
<template>
    <nue-div>
        <nue-link theme="btnlike" icon="theme">Btnlike</nue-link>
    </nue-div>
</template>
```

## 使用路由连接

通过 `route` 属性可以实现 VueRouter 路由。

`route` 属性接收 `string` 或 `{ name: string, params?: any, query?: any }` 类型的值。

::: tip
-   `route` 属性的值会被转换为 `to` 用于匹配 VueRouter 的路由，因此当 `route` 属性存在时，`href` 属性失效。
-   组件标签会变为使用 `<router-link>`，以实现路由跳转。
-   当使用 `route` 属性后，链接的激活状态会被启用，若想要修改激活状态的样式，通过 `nue-link--actived` 类名进行样式修改，目前不支持指定其他的激活状态类名。
-   通过 `theme` 属性能够模拟激活状态的样式。
:::

::: raw
<nue-div align="center">
    <nue-link :theme="['btnlike', 'actived']" route="/a/b/c">
        已激活的路由链接
    </nue-link>
    <nue-link
        theme="btnlike"
        :route="{ name: 'routeName', params: { id: 123 } }">
        待激活的路由连接
    </nue-link>
</nue-div>
:::

```vue
<template>
    <nue-div align="center">
        <nue-link :theme="['btnlike', 'actived']" route="/a/b/c">
            已激活的路由链接
        </nue-link>
        <nue-link
            theme="btnlike"
            :route="{ name: 'routeName', params: { id: 123 } }">
            待激活的路由连接
        </nue-link>
    </nue-div>
</template>
```
