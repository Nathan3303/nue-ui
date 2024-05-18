<template>
    <nue-container>
        <nue-header>Header</nue-header>
        <nue-main>
            <template #aside>Aside</template>
            <template #content>
                <nue-infinite-scroll
                    @load-more="loadMore"
                    :loading="loading"
                    :disabled="disabled">
                    <ul class="list">
                        <li class="node" v-for="i in itemsCount" :key="i">
                            {{ i }}
                        </li>
                    </ul>
                </nue-infinite-scroll>
            </template>
        </nue-main>
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

defineOptions({ name: "App" });

const itemsCount = ref(10);
const loading = ref(false);

const disabled = computed(() => loading.value || itemsCount.value >= 100);

function loadMore() {
    if (loading.value) return;
    loading.value = true;
    setTimeout(() => {
        itemsCount.value += 10;
        loading.value = false;
    }, 128);
}
</script>

<style scoped>
.list {
    padding: 0;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 16px;

    .node {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #f0f0f0;
        border-radius: 12px;
    }
}
</style>
