<script setup>
import { ref } from "vue";
import { NueConfirm } from "nue-ui"

const drawer1Open = ref(false);
const drawer2Open = ref(false);
const drawer3Open = ref(false);
const drawer4Open = ref(false);
const drawer5Open = ref(false);
const drawer6Open = ref(false);
const drawer7Open = ref(false);
const drawer8Open = ref(false);
const drawer2From = ref("left");

function handleDrawer2Open(openFrom) {
    drawer2From.value = openFrom;
    drawer2Open.value = true;
}

function beforeDrawer6Close(finish) {
    NueConfirm({
        title: "关闭确认",
        content: "确认是否关闭抽屉",
        confirmButtonText: "确认",
        cancelButtonText: "取消"
    })
        .then(() => finish())
        .catch(() => {});
}
</script>

# Drawer 抽屉

抽屉组件用于在屏幕上显示临时内容，从而提供额外的操作或信息。

## 基本用法

通过 `NueDrawer` 组件创建一个抽屉。

需要传入一个 `v-model:visible` 的响应式属性，用于控制抽屉的显示和隐藏。

通过 `title` 属性设置抽屉的标题，接受一个 `String` 类型的值。

<nue-button @click="drawer1Open = true">打开抽屉</nue-button>
<teleport to="body">
<nue-drawer v-model:visible="drawer1Open" title="抽屉标题">
<nue-text>抽屉内容</nue-text>
</nue-drawer>
</teleport>

```vue
<template>
    <nue-button @click="drawer1Open = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer v-model:visible="drawer1Open" title="抽屉标题">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer1Open = ref(false);
</script>
```

## 打开方向

通过属性 `open-from` 设置抽屉组件打开的方向。

`open-form` 属性值必须是 `left`、`right*`、`top`、`bottom` 中的一个。

-   `*` 表示属性默认值。

<nue-div>
    <nue-button @click="handleDrawer2Open('top')">
        打开抽屉（上）
    </nue-button>
    <nue-button @click="handleDrawer2Open('bottom')">
        打开抽屉（下）
    </nue-button>
    <nue-button @click="handleDrawer2Open('left')">
        打开抽屉（左）
    </nue-button>
    <nue-button @click="handleDrawer2Open('right')">
        打开抽屉（右）
    </nue-button>
</nue-div>
<teleport to="body">
    <nue-drawer
        v-model:visible="drawer2Open"
        title="抽屉标题"
        :open-from="drawer2From">
        <nue-text>抽屉内容</nue-text>
    </nue-drawer>
</teleport>

```vue
<template>
    <nue-div>
        <nue-button @click="handleDrawer2Open('top')">
            打开抽屉（上）
        </nue-button>
        <nue-button @click="handleDrawer2Open('bottom')">
            打开抽屉（下）
        </nue-button>
        <nue-button @click="handleDrawer2Open('left')">
            打开抽屉（左）
        </nue-button>
        <nue-button @click="handleDrawer2Open('right')">
            打开抽屉（右）
        </nue-button>
    </nue-div>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer2Open"
            title="抽屉标题"
            :open-from="drawer2From">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>
```

## 自定义头部、主体以及底部

通过指定插槽完成对应内容的自定义。

-   `header` 插槽用于自定义抽屉的头部内容。头部插槽可以解构出 `close` 方法用于关闭抽屉。
-   `default` 默认插槽用于自定义抽屉的主体内容。
-   `footer` 插槽用于自定义抽屉的底部内容。

<nue-button @click="drawer3Open = true">打开抽屉</nue-button>
<teleport to="body">
<nue-drawer v-model:visible="drawer3Open" title="抽屉标题">
<template #header="{ close }">
<nue-text>自定义头部</nue-text>
<nue-button @click="close">关闭抽屉</nue-button>
</template>
<template #default>
<nue-text>自定义主体</nue-text>
</template>
<template #footer>
<nue-text>自定义底部</nue-text>
</template>
</nue-drawer>
</teleport>

```vue
<template>
    <nue-button @click="drawer3Open = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer v-model:visible="drawer3Open" title="抽屉标题">
            <template #header="{ close }">
                <nue-text>自定义头部</nue-text>
                <nue-button @click="close">关闭抽屉</nue-button>
            </template>
            <template #default>
                <nue-text>自定义主体</nue-text>
            </template>
            <template #footer>
                <nue-text>自定义底部</nue-text>
            </template>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer3Open = ref(false);
</script>
```

## 展开范围以及最小展开范围

通过属性 `span` 和 `min-span` 分别设置抽屉的展开范围以及最小展开范围。

`span` 和 `min-span` 属性接收 `string` 类型的值，具体应用到 CSS 的 `width`、`height`、`min-width`、`min-height` 这些属性上。

::: tip
由于抽屉的开启方向可以是上下左右四个方向，因此在上下方向时，`span` 和 `min-span` 分别指的是高度和最小高度；在左右方向时，`span` 和 `min-span` 分别指的是宽度和最小宽度。
:::

::: tip
`span` 和 `min-span` 的效果会在视口发生变化时体现出来。
:::

<nue-button @click="drawer4Open = true">打开抽屉</nue-button>
<teleport to="body">
<nue-drawer
        v-model:visible="drawer4Open"
        title="抽屉标题"
        span="50%"
        min-span="360px">
<nue-text>抽屉内容</nue-text>
</nue-drawer>
</teleport>

```vue
<template>
    <nue-button @click="drawer4Open = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer4Open"
            title="抽屉标题"
            span="50%"
            min-span="360px">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer4Open = ref(false);
</script>
```

## 仅允许通过关闭按钮关闭

抽屉组件默认允许点击抽屉以外的区域触发关闭动作，通过属性 `close-by-button-only` 设置仅允许通过关闭按钮关闭。

<nue-button @click="drawer5Open = true">打开抽屉</nue-button>
<teleport to="body">
<nue-drawer
        v-model:visible="drawer5Open"
        title="抽屉标题"
        span="50%"
        min-span="360px"
        close-by-button-only>
<nue-text>抽屉内容</nue-text>
</nue-drawer>
</teleport>

```vue
<template>
    <nue-button @click="drawer5Open = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer5Open"
            title="抽屉标题"
            span="50%"
            min-span="360px"
            close-by-button-only>
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer5Open = ref(false);
</script>
```

## 设置关闭前的回调函数

通过属性 `before-close` 设置关闭前的回调函数，该函数会在抽屉关闭之前执行。

回调函数在被调用时会传入一个 `finish` 函数，只有在调用该函数后才会执行抽屉的关闭操作。

<nue-button @click="drawer6Open = true">打开抽屉</nue-button>
<teleport to="body">
<nue-drawer
        v-model:visible="drawer6Open"
        title="抽屉标题"
        span="50%"
        min-span="360px"
        :before-close="beforeDrawer6Close">
<nue-text>抽屉内容</nue-text>
</nue-drawer>
</teleport>

```vue
<template>
    <nue-button @click="drawer6Open = true">打开抽屉</nue-button>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer6Open"
            title="抽屉标题"
            span="50%"
            min-span="360px"
            :before-close="beforeDrawer6Close">
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer6Open = ref(false);
function beforeDrawer6Close(finish) {
    NueConfirm({
        title: "关闭确认",
        content: "确认是否关闭抽屉",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    })
        .then(() => finish())
        .catch(() => {});
}
</script>
```

## 连续打开多个抽屉

抽屉组件可以连续使用，在同一个页面上可以打开多个抽屉，这些抽屉元素会根据打开顺序进行显示而非文档结构。

<nue-div>
    <nue-button @click="drawer7Open = true">打开抽屉1</nue-button>
    <nue-button @click="drawer8Open = true">打开抽屉2</nue-button>
</nue-div>
<teleport to="body">
    <nue-drawer
        v-model:visible="drawer7Open"
        title="抽屉1"
        span="50%"
        min-span="360px">
        <nue-button @click="drawer8Open = true">打开抽屉2</nue-button>
    </nue-drawer>
    <nue-drawer
        v-model:visible="drawer8Open"
        title="抽屉2"
        open-from="left">
        <nue-button @click="drawer7Open = true">打开抽屉1</nue-button>
    </nue-drawer>
</teleport>

```vue
<template>
    <nue-div>
        <nue-button @click="drawer7Open = true">打开抽屉1</nue-button>
        <nue-button @click="drawer8Open = true">打开抽屉2</nue-button>
    </nue-div>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer7Open"
            title="抽屉1"
            span="50%"
            min-span="360px">
            <nue-button @click="drawer8Open = true">打开抽屉2</nue-button>
        </nue-drawer>
        <nue-drawer
            v-model:visible="drawer8Open"
            title="抽屉2"
            open-from="left">
            <nue-button @click="drawer7Open = true">打开抽屉1</nue-button>
        </nue-drawer>
    </teleport>
</template>
<script>
import { ref } from "vue";
const drawer7Open = ref(false);
const drawer8Open = ref(false);
</script>
```
