<template>
    <aside :class="classes" :style="styles" :data-collapsed="isCollapsed">
        <slot />
    </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueAsideProps } from './types';

defineOptions({ name: 'NueAside' });
const props = defineProps<NueAsideProps>();

/** 图标模式（默认形态）的收起宽度；`collapsed-width="0"` 即完全隐藏。 */
const DEFAULT_COLLAPSED_WIDTH = '4.5rem';

const isCollapsed = computed(() => props.collapsed ?? false);

const classes = computed(() => {
    const prefix = 'nue-aside';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

/**
 * 折叠宽度走既有的三个宽度变量（主题的 `.nue-aside` 规则直接消费它们），
 * 靠内联自定义属性盖过主题默认的 24% / 16% / 32%，因此不需要 `!important`。
 * 收起时三个变量取同一个值：只改 width 的话，min-width 会把 aside 撑回原宽。
 */
const styles = computed(() => {
    const collapsedWidth = props.collapsedWidth || DEFAULT_COLLAPSED_WIDTH;
    return {
        '--nue-aside-width': isCollapsed.value ? collapsedWidth : props.width,
        '--nue-aside-min-width': isCollapsed.value ? collapsedWidth : props.minWidth,
        '--nue-aside-max-width': isCollapsed.value ? collapsedWidth : props.maxWidth
    };
});
</script>