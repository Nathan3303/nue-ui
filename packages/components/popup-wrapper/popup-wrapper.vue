<template>
    <div :id="id" ref="popupWrapperRef" class="nue-popup-wrapper"></div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { registerPopupWrapper, unregisterPopupWrapper } from './popup-wrapper';
import './popup-wrapper.css';

defineOptions({ name: 'NuePopupWrapper' });

defineProps<{ id?: string }>();

const popupWrapperRef = ref<HTMLDivElement>();

onMounted(() => {
    if (popupWrapperRef.value) {
        registerPopupWrapper(popupWrapperRef.value);
    }
});

onBeforeUnmount(() => {
    if (popupWrapperRef.value) {
        unregisterPopupWrapper(popupWrapperRef.value);
    }
});
</script>
