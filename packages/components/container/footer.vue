<template>
    <footer :class="classes">
        <slot />
    </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueFooterProps } from './types';

defineOptions({ name: 'NueFooter' });
const props = defineProps<NueFooterProps>();

const classes = computed(() => {
    const prefix = 'nue-footer';
    return [prefix, ...parseTheme(props.theme, prefix)];
});
</script>
