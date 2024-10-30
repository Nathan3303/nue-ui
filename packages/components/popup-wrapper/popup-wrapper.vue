<template>
    <div ref="popupWrapperRef" :id="id" class="nue-popup-wrapper"></div>
</template>

<script setup lang="ts">
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import {
        registerPopupWrapper,
        unregisterPopupWrapper
    } from './popup-wrapper';
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
