<script setup>
import { NueMessage } from 'nue-ui'

function handleExecute(id) {
    NueMessage({ message: `执行选项 ${id}`});
}
</script>

# Dropdown 下拉菜单

下拉菜单（Dropdown）是一种常见的交互组件，在页面中提供一个下拉菜单，用户可以从中选择某项操作或选项。

## 基本使用

通过 `NueDropdown` 组件创建一个基本的按钮式的下拉菜单。

通过 `text` 属性设置下拉菜单触发按钮中的文字。

<nue-dropdown text="打开下拉菜单">
    <template #dropdown>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </template>
</nue-dropdown>

```vue
<template>
    <nue-dropdown text="打开下拉菜单">
        <template #dropdown>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </template>
    </nue-dropdown>
</template>
```

## 设置触发方式

通过 `trigger` 属性设置下拉菜单的触发方式，可选值为 `hover` 和 `click`。

<nue-dropdown text="鼠标悬停打开下拉菜单" trigger="hover">
    <template #dropdown>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </template>
</nue-dropdown>

```vue
<template>
    <nue-dropdown text="鼠标悬停打开下拉菜单" trigger="hover">
        <template #dropdown>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </template>
    </nue-dropdown>
</template>
```

## 设置菜单的对齐方式

通过 `align` 属性设置下拉菜单的对齐方式，可选值为 `left`、`center`、`right`。

<nue-div>
    <nue-dropdown text="打开左对齐的下拉菜单" align="left">
        <template #dropdown>
            <li>Item 1</li>
        </template>
    </nue-dropdown>
    <nue-dropdown text="打开居中的下拉菜单" align="center">
        <template #dropdown>
            <li>Item 1</li>
        </template>
    </nue-dropdown>
    <nue-dropdown text="打开右对齐的下拉菜单" align="right">
        <template #dropdown>
            <li>Item 1</li>
        </template>
    </nue-dropdown>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-dropdown text="打开左对齐的下拉菜单" align="left">
            <template #dropdown>
                <li>Item 1</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="打开居中的下拉菜单" align="center">
            <template #dropdown>
                <li>Item 1</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="打开右对齐的下拉菜单" align="right">
            <template #dropdown>
                <li>Item 1</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>
```

## 菜单选项事件处理

通过事件 `execute` 处理下拉菜单选项的点击事件。

在 `dropdown` 插槽内，通过给对应的元素添加 `data-executeid` 属性来指定可执行选项的动作标识，并在 `execute` 事件所传递的 `id` 参数中获取该标识，根据标识执行对应的动作。

<nue-dropdown text="打开下拉菜单" @execute="handleExecute">
<template #dropdown>
<li data-executeid="Coding">Coding</li>
<li data-executeid="Testing">Testing</li>
<li data-executeid="Maintaining">Maintaining</li>
</template>
</nue-dropdown>

```vue
<template>
    <nue-dropdown text="打开下拉菜单" @execute="handleExecute">
        <template #dropdown>
            <li data-executeid="Coding">Coding</li>
            <li data-executeid="Testing">Testing</li>
            <li data-executeid="Maintaining">Maintaining</li>
        </template>
    </nue-dropdown>
</template>
<script setup>
import { NueMessage } from "nue-ui";
function handleExecute(id) {
    NueMessage({ message: `执行选项 ${id}` });
    // switch (id) { ... }
}
</script>
```

## 自定义下拉菜单的触发元素

通过默认插槽指定下拉菜单的触发元素。

通过插槽传递出来的 `switchVisible` 方法来控制下拉菜单的显示。

<nue-dropdown align="center">
    <template #default="{ switchVisible }">
        <nue-avatar
            src="https://picsum.photos/200/200"
            size="small"
            @click="switchVisible" />
    </template>
    <template #dropdown>
        <li>Profile</li>
        <li>Logout</li>
    </template>
</nue-dropdown>

```vue
<template>
    <nue-dropdown align="center">
        <template #default="{ switchVisible }">
            <nue-avatar
                src="https://picsum.photos/200/200"
                size="small"
                @click="switchVisible" />
        </template>
        <template #dropdown>
            <li>Profile</li>
            <li>Logout</li>
        </template>
    </nue-dropdown>
</template>
```
