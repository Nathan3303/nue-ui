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
import { ref } from "vue";

const itemsCount1 = ref(10);

const handleLoadMore1 = () => {
    itemsCount1.value += 10;
};
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
