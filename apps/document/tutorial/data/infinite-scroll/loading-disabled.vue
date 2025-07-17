<template>
    <nue-infinite-scroll
        :disabled="IS3.disabled"
        :loading="IS3.loading"
        height="360px"
        theme="custom"
        @load-more="IS3.loadMore"
    >
        <ul class="list">
            <li v-for="i in IS3.count" :key="i" class="node">{{ i }}</li>
        </ul>
        <template #loading>
            <nue-icon name="loading" size="2rem" spin />
        </template>
        <template #disabled>
            <nue-empty description="没有更多内容了 >_<" />
        </template>
    </nue-infinite-scroll>
</template>

<script setup>
import { reactive } from 'vue';

const IS3 = reactive({
    count: 8,
    loading: false,
    disabled: false,
    loadMore: () => {
        IS3.loading = true;
        setTimeout(() => {
            IS3.count += 8;
            IS3.loading = false;
            IS3.disabled = IS3.count >= 32;
        }, 2000);
    }
});
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
