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
import { ref, computed } from "vue";

const itemsCount = ref(10);
const loading = ref(false);

const disabled = computed(() => loading.value || itemsCount.value >= 100);

const loadMore = () => {
    loading.value = true;
    setTimeout(() => {
        itemsCount.value += 10;
        loading.value = false;
    }, 1000);
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
