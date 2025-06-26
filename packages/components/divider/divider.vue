<template>
    <div :class="classes" :style="styles">
        <div v-if="$slots.default || text" class="nue-divider__content">
            <slot>{{ text }}</slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueDividerProps } from './types';
import './divider.css';

defineOptions({ name: 'NueDivider' });

const props = defineProps<NueDividerProps>();

const classes = computed(() => {
    const prefix = 'nue-divider';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.vertical ? `${prefix}--vertical` : void 0
    ];
});

const styles = computed(() => {
    const { lineStyle, lineWidth, lineColor, alignment } = props;
    return {
        '--nue-divider-border-width': lineWidth,
        '--nue-divider-border-style': lineStyle,
        '--nue-divider-border-color': lineColor,
        '--nue-divider-alignment': alignment
    };
});
</script>
