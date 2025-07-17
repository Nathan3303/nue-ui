<template>
    <nue-infinite-scroll height="360px" trigger-height="180px" @load-more="loadMore">
        <ul class="list">
            <li v-for="i in items" :key="i" class="node">
                {{ i }}
            </li>
        </ul>
    </nue-infinite-scroll>
</template>

<script setup>
import { ref } from 'vue';

const items = ref(8);
const loadMore = () => (items.value += 8);
</script>

<style scoped>
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 240px;
        background-color: #e4e4e7;
        border-radius: 12px;
        margin: 0;
        padding: 0;
    }
}
</style>
