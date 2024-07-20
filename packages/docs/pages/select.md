<script setup>
    import { ref } from 'vue'
    const select1Value = ref(null)
    const select2Value = ref(null)
    const select3Value = ref(null)
    const select4Value = ref(null)
</script>
<style scoped>
    
</style>

# Select 选择器

提供下拉选择功能。

## 基础用法

通过 `NueSelect` 以及 `NueSelectOption` 组件，实现下拉选择功能。

通过 `v-model` 绑定当前选择项的值。

:::raw
<nue-select v-model="select1Value">
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
</nue-select>
:::

```vue
<template>
  <nue-select v-model="select2Value">
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
  </nue-select>
</template>
<script setup>
import { ref } from 'vue'
const select1Value = ref(null)
</script>
```

## 禁用状态

通过 `disabled` 属性，可以禁用下拉选择器。

:::raw
<nue-select v-model="select1Value" disabled>
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
</nue-select>
:::

```vue
<template>
  <nue-select v-model="select1Value" disabled>
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
  </nue-select>
</template>
<script setup>
import { ref } from 'vue'
const select2Value = ref(null)
</script>
```

## 待选择时的占位文字

通过 `placeholder` 属性，可以设置下拉选择器的占位文字。

:::raw
<nue-select v-model="select3Value" placeholder="请选择">
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
</nue-select>
:::

```vue
<template>
  <nue-select v-model="select3Value" placeholder="请选择">
    <nue-select-option label="选项1" value="1" />
    <nue-select-option label="选项2" value="2" />
  </nue-select>
</template>
<script setup>
import { ref } from 'vue'
const select3Value = ref(null)
</script>
```

## 设置选择器大小

通过 `size` 属性，可以设置下拉选择器的大小。

:::raw
<nue-div align="center">
    <nue-select v-model="select4Value" size="small">
        <nue-select-option label="选项1" value="1" />
        <nue-select-option label="选项2" value="2" />
    </nue-select>
    <nue-select v-model="select4Value">
        <nue-select-option label="选项1" value="1" />
        <nue-select-option label="选项2" value="2" />
    </nue-select>
    <nue-select v-model="select4Value" size="large">
        <nue-select-option label="选项1" value="1" />
        <nue-select-option label="选项2" value="2" />
    </nue-select>
</nue-div>
:::


```vue
<template>
    <nue-div align="center">
        <nue-select v-model="select4Value" size="small">
            <nue-select-option label="选项1" value="1" />
            <nue-select-option label="选项2" value="2" />
        </nue-select>
        <nue-select v-model="select4Value">
            <nue-select-option label="选项1" value="1" />
            <nue-select-option label="选项2" value="2" />
        </nue-select>
        <nue-select v-model="select4Value" size="large">
            <nue-select-option label="选项1" value="1" />
            <nue-select-option label="选项2" value="2" />
        </nue-select>
    </nue-div>
</template>
<script setup>
import { ref } from 'vue'
const select4Value = ref(null)
</script>
```