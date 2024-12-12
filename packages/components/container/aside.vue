<template>
    <div ref="asideRef" :style="style" class="nue-aside">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { NueAsideProps } from './types';
import './aside.css';

defineOptions({ name: 'NueAside' });
const props = withDefaults(defineProps<NueAsideProps>(), {
    width: '200px',
    minWidth: '100px',
    maxWidth: '300px',
    collapsedWidth: ''
});

const asideRef = ref<HTMLDivElement>();

const style = computed(() => {
    return {
        '--nue-aside-width': props.width,
        '--nue-aside-min-width': props.minWidth,
        '--nue-aside-max-width': props.maxWidth
    };
});
</script>
