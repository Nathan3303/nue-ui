<script setup>
import { ref, computed } from 'vue';

const itemsCount1 = ref(10);
const handleLoadMore1 = () => (itemsCount1.value += 10);

const itemsCount = ref(10);
const loading = ref(false);
const disabled = computed(() => loading.value || itemsCount.value >= 100);
function loadMore() {
    loading.value = true;
    setTimeout(() => {
        itemsCount.value += 10;
        loading.value = false;
    }, 1000);
}
</script>
<style scoped>
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 12px;
        margin: 0px;
        padding: 0px;
    }
}
</style>

# Infinite Scroll 无限滚动

无限滚动组件实现了滚动到底部时自动加载更多内容的功能。

## 基础用法

通过 `NueInfiniteScroll` 组件可以实现无限滚动功能。

使用组件时需要绑定事件 `load-more` 的执行函数，事件会在滚动到加载阈值时触发。

加载阈值表示当前滚动位置与列表底部的距离，可以通过属性 `trigger-height` 设置，默认为 `150px` 。

通过 `height` 属性设置可视区域的高度，默认为 `100%` 。

<nue-infinite-scroll @load-more="handleLoadMore1" trigger-height="256px" height="512px">
<ul class="list">
<li class="node" v-for="i in itemsCount1" :key="i">{{ i }}</li>
</ul>
</nue-infinite-scroll>

```vue
<template>
    <nue-infinite-scroll
        @load-more="handleLoadMore1"
        trigger-height="256px"
        height="512px">
        <ul class="list">
            <li class="node" v-for="i in itemsCount1" :key="i">{{ i }}</li>
        </ul>
    </nue-infinite-scroll>
</template>

<script setup>
import { ref, computed } from "vue";
const itemsCount1 = ref(10);
const handleLoadMore1 = () => (itemsCount1.value += 10);
</script>

<style scoped>
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 12px;

        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
```

## 加载状态和禁用状态

通过 `loading` 属性设置加载状态，当 `loading` 为 `true` 时，组件会显示加载文字，通过 `loading` 插槽可以自定义加载元素。

通过 `disabled` 属性设置禁用状态，当 `disabled` 为 `true` 时，组件不会触发加载事件。

<nue-infinite-scroll
    @load-more="loadMore"
    :loading="loading"
    :disabled="disabled"
    trigger-height="200px"
    height="512px">
    <ul class="list">
        <li class="node" v-for="i in itemsCount" :key="i">
            {{ i }}
        </li>
    </ul>
</nue-infinite-scroll>

```vue
<template>
    <nue-infinite-scroll
        @load-more="loadMore"
        :loading="loading"
        :disabled="disabled"
        trigger-height="200px"
        height="512px">
        <ul class="list">
            <li class="node" v-for="i in itemsCount" :key="i">
                {{ i }}
            </li>
        </ul>
    </nue-infinite-scroll>
</template>

<script setup>
const itemsCount = ref(10);
const loading = ref(false);
const disabled = computed(() => loading.value || itemsCount.value >= 100);
function loadMore() {
    loading.value = true;
    setTimeout(() => {
        itemsCount.value += 10;
        loading.value = false;
    }, 1000);
}
</script>

<style scoped>
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 12px;
    }
}
</style>
```
