<template>
    <component :is="tag" :class="classes" :style="style">
        <slot />
    </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { TEXT_SIZE_VALUES } from './constants';
import type { NueSizeProps } from './types';
import './text.css';

defineOptions({ name: 'NueText' });
const props = withDefaults(defineProps<NueSizeProps>(), {
    tag: 'span'
});

const classes = computed(() => {
    const prefix = 'nue-text';
    return [prefix, ...parseTheme(props.theme, prefix), props.clamped && `${prefix}--clamped`];
});

const size = computed(() => {
    if (!props.size) return void 0;
    return TEXT_SIZE_VALUES[props.size] || props.size;
});

const style = computed(() => {
    return {
        '--nue-text-color': props.color,
        '--nue-text-font-size': size.value,
        '--nue-text-font-weight': props.weight,
        '--nue-text-decoration': props.decoration,
        '--nue-text-align': props.align,
        '--nue-text-clamped-lines': props.clamped
    };
});
</script>
