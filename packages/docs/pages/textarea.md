<script setup>
    import { ref } from 'vue'

    const val1 = ref('')
    const val2 = ref('')
    const val3 = ref('')
    const val4 = ref('')
    const val5 = ref("")
    const val6 = ref("")
    const val7 = ref("")
    const val8 = ref("")
    const val9 = ref("")
    const val10 = ref("")
    const val11 = ref("")
    const val12 = ref("")
    const val13 = ref("")
</script>
<style scoped>
    
</style>

# Textarea 富文本输入框

用于获取用户输入的长文本。

## 基础用法

通过 `NueTextarea` 组件生成输入框。

通过 `v-model` 绑定一个响应式数据，随输入内容变化。

<nue-textarea v-model="val1" />

```vue
<template>
    <nue-textarea v-model="val1" />
</template>
<script setup>
import { ref } from "vue";
const val1 = ref("");
</script>
```

## 设置占位字符

通过 `placeholder` 属性设置占位字符，接收 `string` 类型。

<nue-textarea v-model="val2" placeholder="请输入内容" />

```vue
<template>
    <nue-textarea v-model="val2" placeholder="请输入内容" />
</template>
<script setup>
import { ref } from "vue";
const val2 = ref("");
</script>
```

## 禁用状态

通过 `disabled` 属性设置禁用状态，接收 `boolean` 类型。

<nue-textarea v-model="val3" placeholder="请输入内容" disabled />

```vue
<template>
    <nue-textarea v-model="val3" placeholder="请输入内容" disabled />
</template>
<script setup>
import { ref } from "vue";
const val3 = ref("");
</script>
```

## 设置最大行数

通过 `rows` 属性设置图标，接收 `number` 类型，默认值为 `3`。

<nue-textarea v-model="val4" placeholder="请输入内容" :rows="2" />

```vue
<template>
    <nue-textarea v-model="val4" placeholder="请输入内容" :rows="2" />
</template>
<script setup>
import { ref } from "vue";
const val4 = ref("");
</script>
```

## 内容高度自适应以及最大高度限制

### 内容高度自适应

通过 `autosize` 属性设置是否自适应内容高度，接收 `boolean` 类型，默认值为 `false`。

<nue-textarea v-model="val5" placeholder="请输入内容" autosize />

```vue
<template>
    <nue-textarea v-model="val5" placeholder="请输入内容" autosize />
</template>
<script setup>
import { ref } from "vue";
const val5 = ref("");
</script>
```

### 最大高度限制

通过 `autosize` 搭配 `rows` 属性设置最大高度限制，当内容高度超过 `rows` 指定的行数时，则不会继续增加文本框高度，转而显示滚动条。

::: tip
`rows` 的默认值为 `3`，所以只设置 `autosize` 属性时，文本框的最大高度依然会被限制在 3 行内。解除该限制可以通过将 `rows` 属性设置为 `0` 来解除高度限制。
:::

<nue-div vertical align="stretch">
    <nue-textarea
        v-model="val6"
        placeholder="请输入内容（3行最大高度）"
        autosize />
    <nue-textarea
        v-model="val7"
        placeholder="请输入内容（999行最大高度）"
        autosize
        :rows="0" />
</nue-div>

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="val6"
            placeholder="请输入内容（3行最大高度）"
            autosize />
        <nue-textarea
            v-model="val7"
            placeholder="请输入内容（999行最大高度）"
            autosize
            :rows="0" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val6 = ref("");
const val7 = ref("");
</script>
```

## 字数限制与计数

### 字符限制

通过 `maxlength` 属性设置最大字符限制，接收 `string` 类型。

::: tip
`maxlength` 属性为原生 `HTMLElement.maxlength` 属性的映射。
:::

<nue-textarea v-model="val8" placeholder="请输入内容" maxlength="212" />

```vue
<template>
    <nue-textarea v-model="val8" placeholder="请输入内容" maxlength="212" />
</template>
<script setup>
import { ref } from "vue";
const val8 = ref("");
</script>
```

### 字数计数

与 `NueInput` 组件相同，可以通过 `counter` 属性设置是否显示字数统计，接收 `off*`、`word-limit`、`word-left` 以及 `both` 四个值之一。

-   `off*` 表示不显示字数统计。
-   `word-limit` 表示只显示最大字数限制。
-   `word-left` 表示只显示剩余字数。
-   `both` 表示同时显示最大字数限制和剩余字数。

::: tip
建议 `counter` 属性与 `maxlength` 属性配合使用。
:::

<nue-div vertical align="stretch">
    <nue-textarea
        v-model="val9"
        placeholder="请输入内容"
        maxlength="212"
        counter="word-limit" />
    <nue-textarea
        v-model="val9"
        placeholder="请输入内容"
        maxlength="212"
        counter="word-left" />
    <nue-textarea
        v-model="val9"
        placeholder="请输入内容"
        maxlength="212"
        counter="both" />
</nue-div>

```vue
<template>
    <nue-div vertical align="stretch">
        <nue-textarea
            v-model="val9"
            placeholder="请输入内容"
            maxlength="212"
            counter="word-limit" />
        <nue-textarea
            v-model="val9"
            placeholder="请输入内容"
            maxlength="212"
            counter="word-left" />
        <nue-textarea
            v-model="val9"
            placeholder="请输入内容"
            maxlength="212"
            counter="both" />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val9 = ref("");
</script>
```

## 防抖

组件内部在输入时会对输入内容进行防抖处理，防止短时间内大量输入导致可能出现的性能问题。

通过 `debounceTime` 属性设置防抖时间，单位为 `ms`，接收 `number` 类型，默认值为 `0`。

<nue-textarea v-model="val10" placeholder="请输入内容" :debounceTime="500" />

-   文本框内容：{{ val10 || "空" }}

```vue
<template>
    <nue-textarea
        v-model="val10"
        placeholder="请输入内容"
        :debounceTime="500" />
</template>
<script setup>
import { ref } from "vue";
const val10 = ref("");
</script>
```

## 样式设置

### 输入框尺寸

通过 `size` 属性设置输入框尺寸，接收 `string` 类型。`size` 属性值最终会应用到输入框的 CSS 属性 `font-size` 上，根据这个属性值自动计算文本框大小。

<nue-textarea v-model="val11" placeholder="请输入内容" size="24px" />

```vue
<template>
    <nue-textarea v-model="val11" placeholder="请输入内容" size="24px" />
</template>
<script setup>
import { ref } from "vue";
const val11 = ref("");
</script>
```

### 输入框外形

通过 `shape` 属性设置输入框外形，接收 `square*`、`round` 以及 `no-shape` 三个值之一。

<nue-div align="center">
    <nue-textarea
        v-model="val12"
        placeholder="请输入内容"
        shape="square"
        flex />
    <nue-textarea
        v-model="val12"
        placeholder="请输入内容"
        shape="round"
        flex />
    <nue-textarea
        v-model="val12"
        placeholder="请输入内容"
        shape="no-shape"
        flex />
</nue-div>

```vue
<template>
    <nue-div align="center">
        <nue-textarea
            v-model="val12"
            placeholder="请输入内容"
            shape="square"
            flex />
        <nue-textarea
            v-model="val12"
            placeholder="请输入内容"
            shape="round"
            flex />
        <nue-textarea
            v-model="val12"
            placeholder="请输入内容"
            shape="no-shape"
            flex />
    </nue-div>
</template>
<script setup>
import { ref } from "vue";
const val12 = ref("");
</script>
```

### 自定义样式

通过 `theme` 属性可以给按钮添加自定义的类名。

属性接受 `string` 以及 `string[]` 类型的值，表示一个或多个自定义的类名。

::: tip
添加后的类名为 `nue-input--` 加上 `theme` 属性的值。如 `theme="custom"`，则该类名为 `nue-input--custom`。
:::

<nue-textarea
    v-model="val13"
    placeholder="请输入内容"
    theme="linear"
    autosize
    :rows="0" />

```vue
<template>
    <nue-textarea
        v-model="val13"
        placeholder="请输入内容"
        theme="linear"
        autosize
        :rows="0" />
</template>

<script setup>
import { ref } from "vue";
const val13 = ref("");
</script>

<style scoped>
.nue-textarea--linear {
    --border-width: 0px;
    --hovered-border-color: #8ac7ab;
    --focused-border-color: #42b983;
    --focused-shadow-color: transparent;
    --focused-background-color: transparent;

    transition: all 0.3s;
    border: none;
    border-bottom: 2px solid #cccccc;
    border-radius: 0px;

    &:focus-within {
        border-bottom: 2px solid #42b983;
    }
}
</style>
```
