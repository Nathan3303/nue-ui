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

通过 `size` 属性设置大小，属性接收一个 `string` 类型的值，该值会被直接作为 CSS 的 `width` 和 `height` 值。

<nue-div align="center">
    <nue-avatar src="https://picsum.photos/200?3" size="36px" />
    <nue-avatar src="https://picsum.photos/200?3" size="48px" />
    <nue-avatar src="https://picsum.photos/200?3" size="56px" />
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-avatar src="https://picsum.photos/200?3" size="36px" />
        <nue-avatar src="https://picsum.photos/200?3" size="48px" />
        <nue-avatar src="https://picsum.photos/200?3" size="56px" />
    </nue-div>
</template>
```

## 圆形头像

通过 `rounded` 属性设置组件形状，接收 `boolean` 类型的值。

<nue-avatar src="https://picsum.photos/200?8" rounded />

```vue
<template>
    <nue-avatar src="https://picsum.photos/200?8" rounded />
</template>
```

## 设置图标

通过 `icon` 属性设置头像的图标，该属性接受一个 `string` 类型的值。

::: tip
当 `src` 属性所指定的 **图片无法显示时** 或者 **未指定时**，`icon` 属性将会生效。
:::

<nue-div>
    <nue-avatar src="/abc.jpg" icon="location" />
    <nue-avatar icon="scan" />
</nue-div>

```vue
<template>
    <nue-div>
        <nue-avatar src="/abc.jpg" icon="location" />
        <nue-avatar icon="scan" />
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
