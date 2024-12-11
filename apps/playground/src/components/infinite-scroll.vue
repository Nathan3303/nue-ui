<template>
    <demo title="Infinite Scroll 无限滚动">
        <nue-infinite-scroll
            :disabled="disabled"
            :loading="loading"
            height="360px"
            trigger-height="1px"
            @load-more="loadMore"
        >
            <ul class="list">
                <li v-for="i in itemsCount" :key="i" class="node">
                    {{ i }}
                </li>
            </ul>
        </nue-infinite-scroll>
    </demo>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import Demo from '../layouts/demo.vue';

const itemsCount = ref(15);
const loading = ref(false);
const disabled = computed(() => loading.value || itemsCount.value >= 64);

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
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        background-color: #e4e4e7;
        border-radius: 12px;
        margin: 0px;
        padding: 0px;
    }
}
</style>
