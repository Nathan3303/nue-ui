<template>
    <main :class="classes">
        <slot />
    </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueMainProps } from './types';

defineOptions({ name: 'NueMain' });
const props = defineProps<NueMainProps>();

const classes = computed(() => {
    const prefix = 'nue-main';
    return [prefix, ...parseTheme(props.theme, prefix)];
});
</script>
