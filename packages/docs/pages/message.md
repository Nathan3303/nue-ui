<script setup>
import { ref } from "vue";
import { NueMessage } from 'nue-ui'

function showMsg() {
    NueMessage({ message: "创建Message成功" });
}

function showTypedMsg(type) {
    NueMessage({ message: "创建Message成功", type: type });
}

function showMsgWithIcon(icon) {
    NueMessage({ message: "创建Message成功", icon });
}

function showMsgWithDuration(duration) {
    NueMessage({ message: "创建Message成功", duration });
}
</script>

# Message 信息提示

用于提示用户操作执行结果或其他消息。

## 基本用法

使用库中暴露的 `NueMessage` 方法创建一个信息提示。

`NueMessage` 方法接收一个 `options` 对象作为参数，其中的 `message` 属性表示提示信息。

<nue-button @click="showMsg">创建一个消息提示</nue-button>

```vue
<template>
    <nue-button @click="showMsg">创建一个消息提示</nue-button>
</template>
<script setup>
import { NueMessage } from "nue-ui";

function showMsg() {
    NueMessage({ message: "创建Message成功" });
}
</script>
```

## 指定消息类型

通过 `type` 属性指定消息类型，可选值为 `success`、`info`、`warning`、`error` 以及 `log`。

<nue-div>
    <nue-button @click="showTypedMsg('success')">成功</nue-button>
    <nue-button @click="showTypedMsg('info')">信息</nue-button>
    <nue-button @click="showTypedMsg('warning')">警告</nue-button>
    <nue-button @click="showTypedMsg('error')">错误</nue-button>
    <nue-button @click="showTypedMsg('log')">日志</nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button @click="showTypedMsg('success')">成功</nue-button>
        <nue-button @click="showTypedMsg('info')">信息</nue-button>
        <nue-button @click="showTypedMsg('warning')">警告</nue-button>
        <nue-button @click="showTypedMsg('error')">错误</nue-button>
        <nue-button @click="showTypedMsg('log')">日志</nue-button>
    </nue-div>
</template>
<script setup>
import { NueMessage } from "nue-ui";

function showTypedMsg(type) {
    NueMessage({ message: "创建Message成功", type });
}
</script>
```

## 确定类型的快速使用

通过 `NueMessage` 中的子方法 `success`、`info`、`warn`、`error`、`log` 可以快速创建不同类型的消息提示。这些子方法都拥有同样的形参，包括 `message`、`duration` 以及 `icon` 。

<nue-div>
    <nue-button @click="NueMessage.success('成功', 5000, 'success')">
        成功
    </nue-button>
    <nue-button @click="NueMessage.error('错误', 5000, 'clear')">
        错误
    </nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button @click="NueMessage.success('成功', 5000, 'checked')">
            成功
        </nue-button>
        <nue-button @click="NueMessage.error('错误', 5000, 'clear')">
            错误
        </nue-button>
    </nue-div>
</template>
<script setup>
import { NueMessage } from "nue-ui";
</script>
```

## 设置图标

通过 `icon` 属性设置消息提示的图标，接受一个 `string` 类型的值。

::: tip
目前 `icon` 属性仅支持库中内置的 iconfont 图标库。
:::

<nue-button @click="showMsgWithIcon('completed')">
创建一个带图标的消息提示
</nue-button>

```vue
<template>
    <nue-button @click="showMsgWithIcon('completed')">
        创建一个带图标的消息提示
    </nue-button>
</template>
<script setup>
import { NueMessage } from "nue-ui";

function showMsgWithIcon(icon) {
    NueMessage({ message: "创建Message成功", icon });
}
</script>
```

## 设置显示持续时间

通过 `duration` 属性设置消息提示的显示持续时间，接收 `number` 类型的值。

持续时间的单位为毫秒，默认为 `3000`（即 3 秒）。

::: tip
`duration` 的值可以设置为 `0` 来表示持续时间为 `Infinity`，即消息提示不会自动消失，需要手动确认关闭。
:::

<nue-div>
    <nue-button @click="showMsgWithDuration(5000)">
    创建一个持续时间为 5 秒的消息提示
    </nue-button>
    <nue-button @click="showMsgWithDuration(0)">
    创建一个需要手动关闭的消息提示
    </nue-button>
</nue-div>

```vue
<template>
    <nue-div>
        <nue-button @click="showMsgWithDuration(5000)">
            创建一个持续时间为 5 秒的消息提示
        </nue-button>
        <nue-button @click="showMsgWithDuration(0)">
            创建一个需要手动关闭的消息提示
        </nue-button>
    </nue-div>
</template>
<script setup>
import { NueMessage } from "nue-ui";

function showMsgWithDuration() {
    NueMessage({ message: "创建Message成功", duration: 5000 });
}
</script>
```
