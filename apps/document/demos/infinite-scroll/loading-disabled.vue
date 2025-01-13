<template>
    <nue-div style="height: 420px; overflow: auto">
        <nue-infinite-scroll
            :disabled="disabled"
            :loading="loading"
            height="512px"
            trigger-height="24px"
            @load-more="loadMore"
        >
            <ul class="list">
                <li v-for="i in itemsCount" :key="i" class="node">
                    {{ i }}
                </li>
            </ul>
        </nue-infinite-scroll>
    </nue-div>
</template>

<script setup>
import { computed, ref } from 'vue';

const itemsCount = ref(12);
const loading = ref(false);

const disabled = computed(() => loading.value || itemsCount.value >= 100);

const loadMore = () => {
    loading.value = true;
    setTimeout(() => {
        itemsCount.value += 12;
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
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 12px;
        margin: 0;
        padding: 0;
    }
}
</style>
