<template>
    <nue-div style="height: 420px" theme="card">
        <nue-infinite-scroll
            :disabled="disabled"
            height="512px"
            trigger-height="24px"
            @load-more="handleLoadMore"
        >
            <ul class="list">
                <li v-for="i in itemsCount1" :key="i" class="node">{{ i }}</li>
            </ul>
        </nue-infinite-scroll>
    </nue-div>
</template>

<script setup>
import { computed, ref } from 'vue';

const itemsCount1 = ref(12);

const disabled = computed(() => itemsCount1.value >= 100);

const handleLoadMore = () => {
    itemsCount1.value += 12;
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
        margin: 0px;
        padding: 0px;
    }
}
</style>
