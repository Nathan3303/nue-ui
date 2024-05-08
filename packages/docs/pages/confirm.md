<script setup>
import { NueConfirm } from "nue-ui";

function showConfirm1() {
    NueConfirm({ content: "确认删除吗？" }).then(
        () => {},
        () => {}
    );
}

function showConfirm2() {
    NueConfirm({ content: "确认删除吗？", title: "删除确认" }).then(
        () => {},
        () => {}
    );
}

function showConfirm3() {
    NueConfirm({
        content: "确认删除吗？",
        title: "删除确认",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
    }).then(
        () => {},
        () => {}
    );
}

function showConfirm4() {
    NueConfirm({
        content: "确认删除吗？",
        title: "删除确认",
        confirmBtnText: "确认删除",
        cancelBtnText: "取消",
        beforeClose: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 2000);
            });
        },
    }).then(
        () => {
            console.log("确认删除");
        },
        () => {
            console.log("取消删除");
        }
    );
}
</script>

# Confirm 消息确认框

消息确认框用于确认用户的操作，常用于删除、确认等场景。

## 基本用法

通过库中的 `NueConfirm` 方法可以快速创建消息确认框。

`NueConfirm` 方法接收一个 `options` 对象作为参数，其中的 `content` 用于指定确认框的内容。

<nue-button @click="showConfirm1">弹出确认框</nue-button>

```vue
<template>
    <nue-button @click="showConfirm1">弹出确认框</nue-button>
</template>
<script setup>
import { NueConfirm } from "nue-ui";

function showConfirm1() {
    NueConfirm({ content: "确认删除吗？" }).then(
        () => {},
        () => {}
    );
}
</script>
```

## 自定义标题文字

通过 `title` 属性来自定义确认框的标题文字。

<nue-button @click="showConfirm2">弹出自定义标题的确认框</nue-button>

```vue
<template>
    <nue-button @click="showConfirm2">弹出自定义标题的确认框</nue-button>
</template>
<script setup>
import { NueConfirm } from "nue-ui";

function showConfirm2() {
    NueConfirm({ content: "确认删除吗？", title: "删除确认" }).then(
        () => {},
        () => {}
    );
}
</script>
```

## 自定义按钮文字

通过 `confirmButtonText` 和 `cancelButtonText` 属性来自定义确认框的按钮文字。

<nue-button @click="showConfirm3">弹出自定义按钮文字的确认框</nue-button>

```vue
<template>
    <nue-button @click="showConfirm3">弹出自定义按钮文字的确认框</nue-button>
</template>
<script setup>
import { NueConfirm } from "nue-ui";

function showConfirm3() {
    NueConfirm({
        content: "确认删除吗？",
        title: "删除确认",
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
    }).then(
        () => {},
        () => {}
    );
}
</script>
```
