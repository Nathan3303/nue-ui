<script setup>
    import { ref } from 'vue'

    const val1 = ref('')
    const val2 = ref('')
    const val3 = ref('')
    const val4 = ref('')
    const val5 = ref("text...")
    const val6 = ref("password...")
    const val7 = ref("")
    const val8 = ref("")
    const val9 = ref("")
    const val10 = ref("")
    const val11 = ref("")
    const val12 = ref("")
</script>
<style scoped>
    
</style>

# Input 输入框

用于获取用户输入。

## 基础用法

通过 `NueInput` 组件生成输入框。

通过 `v-model` 绑定一个响应式数据，随输入内容变化。

通过 `type` 属性设置输入框类型，属性值可以是 `text*`、`password`、`number`、`email`、`textarea`、`url` 的其中之一。

-   `*` 表示属性默认值。

<nue-input v-model="val1" type="text" />

```vue
<template>
    <nue-input v-model="val1" type="text" />
</template>
<script setup>
import { ref } from "vue";
const val1 = ref("");
</script>
```

## 设置占位字符

通过 `placeholder` 属性设置占位字符，接收 `string` 类型。

<nue-input v-model="val2" placeholder="请输入内容" />

```vue
<template>
    <nue-input v-model="val2" placeholder="请输入内容" />
</template>
<script setup>
import { ref } from "vue";
const val2 = ref("");
</script>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态，接收 `boolean` 类型。

<nue-input v-model="val3" placeholder="请输入内容" disabled />

```vue
<template>
    <nue-input v-model="val3" placeholder="请输入内容" disabled />
</template>
<script setup>
import { ref } from "vue";
const val3 = ref("");
</script>
```

## 设置图标

通过 `icon` 属性设置图标，接收 `string` 类型。

<nue-input v-model="val4" placeholder="搜索" icon="search" />

```vue
<template>
    <nue-input v-model="val4" placeholder="搜索" icon="search" />
</template>
<script setup>
import { ref } from "vue";
const val4 = ref("");
</script>
```

## 清除控制与密码显示控制

### 清除控制

通过 `clearable` 属性设置是否显示清除按钮，接收 `boolean` 类型。

::: raw
<nue-div vertical align="stretch">
    <nue-input v-model="val5" placeholder="请输入内容" clearable/>
</nue-div>
:::

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-input v-model="val5" placeholder="请输入内容" clearable />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val5 = ref("text...");
</script>
```

### 密码显示控制

通过 `allow-show-password` 属性设置是否显示密码，接收 `boolean` 类型。

::: tip
`allow-show-password` 属性仅在 `type` 属性为 `password` 时生效。
:::

<nue-div vertical align="stretch">
    <nue-input
        v-model="val6"
        type="password"
        placeholder="请输入密码"
        allow-show-password />
</nue-div>

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="val6"
            type="password"
            placeholder="请输入密码"
            allow-show-password />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val6 = ref("password...");
</script>
```

## 字数限制与计数

### 字符限制

通过 `maxlength` 属性设置最大字符限制，接收 `string` 类型。

::: tip
`maxlength` 属性为原生 `HTMLElement.maxlength` 属性的映射。
:::

<nue-input v-model="val7" placeholder="请输入内容" maxlength="16" />

```vue
<template>
    <nue-input v-model="val7" placeholder="请输入内容" maxlength="16" />
</template>
<script setup>
import { ref } from "vue";
const val7 = ref("");
</script>
```

### 字数计数

通过 `counter` 属性设置是否显示字数统计，接收 `off*`、`word-limit`、`word-left` 以及 `both` 四个值之一。

-   `off*` 表示不显示字数统计。
-   `word-limit` 表示只显示最大字数限制。
-   `word-left` 表示只显示剩余字数。
-   `both` 表示同时显示最大字数限制和剩余字数。

::: tip
建议 `counter` 属性与 `maxlength` 属性配合使用。
:::

<nue-div vertical align="stretch">
    <nue-input
        v-model="val8"
        placeholder="请输入内容"
        maxlength="16"
        counter="word-limit" />
    <nue-input
        v-model="val8"
        placeholder="请输入内容"
        maxlength="16"
        counter="word-left" />
    <nue-input
        v-model="val8"
        placeholder="请输入内容"
        maxlength="16"
        counter="both" />
</nue-div>

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="val8"
            placeholder="请输入内容"
            maxlength="16"
            counter="word-limit" />
        <nue-input
            v-model="val8"
            placeholder="请输入内容"
            maxlength="16"
            counter="word-left" />
        <nue-input
            v-model="val8"
            placeholder="请输入内容"
            maxlength="16"
            counter="both" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val8 = ref("");
</script>
```

## 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致的性能问题。

通过 `debounceTime` 属性设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

<nue-input v-model="val9" placeholder="请输入内容" :debounceTime="500" />

-   文本框内容：{{ val9 || "空" }}

```vue
<template>
    <nue-input v-model="val9" placeholder="请输入内容" :debounceTime="500" />
</template>
<script setup>
import { ref } from "vue";
const val9 = ref("");
</script>
```

## 样式设置

### 输入框尺寸

输入框拥有小、正常、大三种尺寸，通过 `size` 属性设置，小和大分别对应 `size` 值中的 `small` 和 `large`，不指定 `size` 则表示正常尺寸。

<nue-div align="center" wrap="nowrap" gap="12px">
    <nue-input v-model="val10" placeholder="请输入" size="small" />
    <nue-input v-model="val10" placeholder="请输入" />
    <nue-input v-model="val10" placeholder="请输入" size="large" />
</nue-div>

```vue
<template>
    <nue-div align="center" wrap="nowrap" gap="12px">
        <nue-input v-model="val10" placeholder="请输入" size="small" />
        <nue-input v-model="val10" placeholder="请输入" />
        <nue-input v-model="val10" placeholder="请输入" size="large" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val10 = ref("");
</script>
```

### 输入框外形

通过 `shape` 属性设置输入框外形，接收 `rounded` 或 `noshape`。

<nue-div align="center">
    <nue-input
        v-model="val11"
        placeholder="请输入内容"
        shape="rounded" />
    <nue-input
        v-model="val11"
        placeholder="请输入内容"
        shape="noshape" />
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-input
            v-model="val11"
            placeholder="请输入内容"
            shape="rounded" />
        <nue-input
            v-model="val11"
            placeholder="请输入内容"
            shape="noshape" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val11 = ref("");
</script>
```

### 自定义样式

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: tip
添加后的类名为 `nue-input--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-input--custom`。
:::

<nue-div vertical align="stretch">
    <nue-input
        v-model="val12"
        placeholder="搜索"
        icon="search"
        theme="linear" />
</nue-div>

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="val12"
            placeholder="搜索"
            icon="search"
            theme="linear" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val12 = ref("");
</script>
<style scoped>
.nue-input--linear {
    transition: all 0.3s;
    border: none;
    border-bottom: 2px solid #cccccc;
    border-radius: 0px;

    --border-width: 0px;
    --padding-y: 4px;
    --hover-border-color: #8ac7ab;
    --focus-border-color: #42b983;
    --focus-shadow-color: transparent;
    --focus-background-color: transparent;

    &:focus-within {
        border: none;
        border-bottom: 2px solid #42b983;
    }
}
</style>
```
