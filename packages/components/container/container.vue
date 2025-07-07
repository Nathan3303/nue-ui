<template>
    <section :class="classes" :style="styles">
        <slot />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueContainerProps } from './types';
import './container.css';

defineOptions({ name: 'NueContainer' });
const props = defineProps<NueContainerProps>();

const classes = computed(() => {
    const prefix = 'nue-container';
    return [prefix, `${prefix}--${props.type}`, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => ({
    '--nue-container-width': props.width,
    '--nue-container-height': props.height
}));
</script>
