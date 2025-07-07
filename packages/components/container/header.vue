<template>
    <header :class="classes" :style="styles">
        <slot />
    </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueHeaderProps } from './types';

defineOptions({ name: 'NueHeader' });
const props = defineProps<NueHeaderProps>();

const classes = computed(() => {
    const prefix = 'nue-header';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => ({
    '--nue-header-width': props.width,
    '--nue-header-height': props.height
}));
</script>
