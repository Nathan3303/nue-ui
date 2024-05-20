<template>
    <nue-div vertical>
        <nue-div align="center" wrap>
            <nue-avatar src="https://picsum.photos/150" />
            <nue-avatar src="https://picsum.photos/150" shape="round" />
            <nue-avatar
                src="https://picsum.photos/150"
                shape="round"
                size="large" />
            <nue-avatar icon="icon-dingwei" />
            <nue-avatar shape="round">N</nue-avatar>
        </nue-div>
        <nue-div gap="36px" wrap>
            <nue-badge value="New">
                <nue-button>Button</nue-button>
            </nue-badge>
            <nue-badge :value="100" :max="99">
                <nue-button icon="mail">Mail</nue-button>
            </nue-badge>
            <nue-badge dot>
                <nue-button icon="mail">Mail</nue-button>
            </nue-badge>
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
