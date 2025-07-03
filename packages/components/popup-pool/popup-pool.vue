<template>
    <div :id="id" ref="popupPoolRef" class="nue-popup-pool"></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { NuePopupPoolProps } from './types';
import './popup-pool.css';

defineOptions({ name: 'NuePopupPool' });
defineProps<NuePopupPoolProps>();

const popupPoolRef = ref<HTMLDivElement>();
</script>
