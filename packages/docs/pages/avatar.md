# Avatar 头像

用于展示用户头像或者其他图形。

## 基础使用

通过 `NueAvatar` 组件展示用户头像

通过 `src` 属性指定头像图片的 URL。

<nue-div>
    <nue-avatar src="https://picsum.photos/200?1" />
    <nue-avatar src="https://picsum.photos/200?2" />
</nue-div>

```vue
<template>
    <nue-div>
        <nue-avatar src="https://picsum.photos/200?1" />
        <nue-avatar src="https://picsum.photos/200?2" />
    </nue-div>
</template>
```

## 设置大小

通过 `size` 属性设置头像的大小。

`size` 属性接受 `string` 以及 `number` 类型的值。

对于 `string` 类型的值，可选值为 `small`、`normal*`、`medium`、`large`，分别对应 24px、32px、40px、48px 四种尺寸。

对于 `number` 类型的值，单位为 `px`，可设置任意大小。

<nue-div align="center">
    <nue-avatar src="https://picsum.photos/200?3" size="small" />
    <nue-avatar src="https://picsum.photos/200?4" size="normal" />
    <nue-avatar src="https://picsum.photos/200?5" size="medium" />
    <nue-avatar src="https://picsum.photos/200?6" size="large" />
    <nue-avatar src="https://picsum.photos/200?7" :size="72" />
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-avatar src="https://picsum.photos/200?3" size="small" />
        <nue-avatar src="https://picsum.photos/200?4" size="normal" />
        <nue-avatar src="https://picsum.photos/200?5" size="medium" />
        <nue-avatar src="https://picsum.photos/200?6" size="large" />
        <nue-avatar src="https://picsum.photos/200?7" :size="72" />
    </nue-div>
</template>
```

## 设置形状

通过 `shape` 属性设置组件形状。

`shape` 属性接受 `circle`、`square*` 两个可选值，分别对应圆形和方形头像。

-   `*` 表示为该属性的默认值

<nue-div>
    <nue-avatar src="https://picsum.photos/200?8" shape="round" />
    <nue-avatar src="https://picsum.photos/200?9" shape="square" />
</nue-div>

```vue
<template>
    <nue-div>
        <nue-avatar src="https://picsum.photos/200?8" shape="round" />
        <nue-avatar src="https://picsum.photos/200?9" shape="square" />
    </nue-div>
</template>
```

## 设置图标

通过 `icon` 属性设置头像的图标，该属性接受一个 `string` 类型的值。

::: tip
目前 `icon` 属性仅支持库中内置的 `iconfont` 图标库。
:::

::: tip
当 `src` 属性所指定的 **图片无法显示时** 或者 **未指定时**，`icon` 属性将会生效。
:::

<nue-div>
    <nue-avatar src="/abc.jpg" icon="icon-dingwei" />
    <nue-avatar icon="icon-target" />
</nue-div>

```vue
<template>
    <nue-div>
        <nue-avatar src="/abc.jpg" icon="icon-dingwei" />
        <nue-avatar icon="icon-target" />
    </nue-div>
</template>
```

## 设置图片填充方式

通过 `fit` 属性设置图片填充方式。

`fit` 属性接受 `fill`、`contain`、`cover*`、`none` 以及 `scale-down` 五个可选值，分别对应填充、包含、覆盖、不填充、缩小填充五种方式。

<nue-div>
    <nue-avatar src="https://picsum.photos/200?10" fit="fill" />
    <nue-avatar src="https://picsum.photos/200?10" fit="cover" />
    <nue-avatar src="https://picsum.photos/200?10" fit="contain" />
    <nue-avatar src="https://picsum.photos/200?10" fit="none" />
    <nue-avatar src="https://picsum.photos/200?10" fit="scale-down" />
</nue-div>

```vue
<template>
    <nue-div>
        <nue-avatar src="https://picsum.photos/200?10" fit="fill" />
        <nue-avatar src="https://picsum.photos/200?10" fit="cover" />
        <nue-avatar src="https://picsum.photos/200?10" fit="contain" />
        <nue-avatar src="https://picsum.photos/200?10" fit="none" />
        <nue-avatar src="https://picsum.photos/200?10" fit="scale-down" />
    </nue-div>
</template>
```
