<template>
    <demo title="Infinite Scroll 无限滚动">
        <nue-div style="overflow: hidden" wrap="nowrap">
            <nue-div
                flex="1"
                height="32rem"
                style="overflow: auto"
                theme="card"
                vertical
                wrap="nowrap"
            >
                <nue-infinite-scroll
                    :disabled="is1Disabled"
                    trigger-height="8rem"
                    @load-more="handleIS1LoadMore"
                >
                    <nue-text tag="h3">基础用法</nue-text>
                    <nue-text style="margin-bottom: 1rem" tag="p">
                        使用组件时需要绑定事件 load-more
                        的执行函数，事件会在滚动到加载阈值时触发。
                        加载阈值表示当前滚动位置与列表底部的距离，可以通过属性
                        trigger-height 设置，默认为 150px 。 通过 height
                        属性设置可视区域的高度，默认为 100% 。
                    </nue-text>
                    <ul class="list">
                        <li v-for="i in is1ItemsCount" :key="i" class="node">
                            {{ i }}
                        </li>
                    </ul>
                </nue-infinite-scroll>
            </nue-div>
            <nue-div
                flex="1"
                height="32rem"
                style="overflow: auto"
                theme="card"
                vertical
            >
                <nue-infinite-scroll
                    :disabled="is2Disabled"
                    :loading="is2Loading"
                    @load-more="handleIS2LoadMore"
                >
                    <nue-text tag="h3">加载状态和禁用状态</nue-text>
                    <nue-text style="margin-bottom: 1rem" tag="p">
                        通过 loading 属性设置加载状态，当 loading 为 true
                        时，组件会显示加载文字，通过 loading
                        插槽可以自定义加载元素。 通过 disabled
                        属性设置禁用状态，当 disabled 为 true
                        时，组件不会触发加载事件。
                    </nue-text>
                    <ul class="list">
                        <li v-for="i in is2ItemsCount" :key="i" class="node">
                            {{ i }}
                        </li>
                    </ul>
                </nue-infinite-scroll>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NueDiv, NueText, NueInfiniteScroll } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const is1ItemsCount = ref(20);
const is1Disabled = computed(() => is1ItemsCount.value >= 100);
const handleIS1LoadMore = () => (is1ItemsCount.value += 10);

const is2ItemsCount = ref(20);
const is2Loading = ref(false);
const is2Disabled = computed(
    () => is2Loading.value && is2ItemsCount.value >= 100
);
const handleIS2LoadMore = () => {
    is2Loading.value = true;
    setTimeout(() => {
        is2ItemsCount.value += 10;
        is2Loading.value = false;
    }, 1000);
};
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
        margin: 0;
        padding: 0;
    }
}
</style>
