<script lang="ts" setup>
import { ref } from 'vue';
import type { NueOverlayProps } from './types';
import './overlay.css';

defineOptions({ name: 'NueOverlay' });
defineProps<NueOverlayProps>();
// defineEmits<NueOverlayEmits>()

const closing = ref(false);
</script>

<template>
    <div :data-closing="closing" class="nue-overlay">
        <slot />
    </div>
</template>
