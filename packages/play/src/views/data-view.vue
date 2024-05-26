<template>
    <nue-div vertical>
        <nue-div vertical>
            <nue-text size="large">Avatar</nue-text>
            <avatar-demo1></avatar-demo1>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Badge</nue-text>
            <badge-demo1></badge-demo1>
            <badge-demo2></badge-demo2>
        </nue-div>
        <nue-infinite-scroll
            @load-more="loadMore"
            :loading="loading"
            :disabled="disabled"
            trigger-height="200px"
            height="256px">
            <ul class="list">
                <li class="node" v-for="i in itemsCount" :key="i">
                    {{ i }}
                </li>
            </ul>
        </nue-infinite-scroll>
    </nue-div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AvatarDemo1 from "../components/avatar/demo1.vue";
import BadgeDemo1 from "../components/badge/demo1.vue";
import BadgeDemo2 from "../components/badge/demo2.vue";

const itemsCount = ref(10);
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
