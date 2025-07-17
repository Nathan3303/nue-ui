<template>
    <aside :class="classes" :style="styles">
        <slot />
    </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueAsideProps } from './types';

defineOptions({ name: 'NueAside' });
const props = defineProps<NueAsideProps>();

const classes = computed(() => {
    const prefix = 'nue-aside';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => {
    return {
        '--nue-aside-width': props.width,
        '--nue-aside-min-width': props.minWidth,
        '--nue-aside-max-width': props.maxWidth
    };
});
</script>
