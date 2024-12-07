<template>
    <footer :class="classes">
        <slot />
    </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueFooterProps } from './types';
import './footer.css';

defineOptions({ name: 'NueFooter' });
const props = defineProps<NueFooterProps>();

const classes = computed(() => {
    const { theme } = props;
    const prefix = 'nue-footer';
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});
</script>
