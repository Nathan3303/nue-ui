<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueContentProps } from './types';

defineOptions({ name: 'NueContent' });
const props = defineProps<NueContentProps>();

const classes = computed(() => {
    const prefix = 'nue-content';
    return [prefix, ...parseTheme(props.theme, prefix), props.fill && `${prefix}--fill`];
});
</script>
