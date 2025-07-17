<template>
    <div :id="id" ref="popupPoolRef" class="nue-popup-pool"></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { registerPopupPool, unregisterPopupPool } from './popup-pool';
import type { NuePopupPoolProps } from './types';
import './popup-pool.css';

defineOptions({ name: 'NuePopupPool' });
defineProps<NuePopupPoolProps>();

const popupPoolRef = ref<HTMLDivElement>();

onMounted(() => {
    if (!popupPoolRef.value) return;
    registerPopupPool(popupPoolRef.value);
});

onBeforeUnmount(() => {
    if (!popupPoolRef.value) return;
    unregisterPopupPool(popupPoolRef.value);
});
</script>
