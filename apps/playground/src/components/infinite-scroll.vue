<template>
    <demo title="基础">
        <nue-infinite-scroll height="360px" trigger-height="200px" @load-more="IS1.loadMore">
            <ul class="list">
                <li v-for="i in IS1.count" :key="i" class="node">{{ i }}</li>
            </ul>
        </nue-infinite-scroll>
    </demo>
    <demo title="加载">
        <nue-infinite-scroll
            :disabled="IS2.disabled"
            :loading="IS2.loading"
            height="360px"
            @load-more="IS2.loadMore"
        >
            <ul class="list">
                <li v-for="i in IS2.count" :key="i" class="node">{{ i }}</li>
            </ul>
        </nue-infinite-scroll>
    </demo>
    <demo title="自定义">
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
    </demo>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { NueInfiniteScroll, NueIcon, NueEmpty } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const IS1 = reactive({
    count: 8,
    loading: false,
    disabled: false,
    loadMore: () => (IS1.count += 8)
});
const IS2 = reactive({
    count: 8,
    loading: false,
    disabled: false,
    loadMore: () => {
        IS2.loading = true;
        setTimeout(() => {
            IS2.count += 8;
            IS2.loading = false;
            IS2.disabled = IS2.count >= 32;
        }, 2000);
    }
});
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
