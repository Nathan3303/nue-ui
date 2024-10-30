<template>
    <component :is="tag" :class="classes" :style="style">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { parseTheme } from '@nue-ui/utils';
    import type { TextProps } from './types';
    import { TEXT_SIZE_VALUES } from './constants';
    import './text.css';

    defineOptions({ name: 'NueText' });

    const props = withDefaults(defineProps<TextProps>(), {
        tag: 'span'
    });

    const size = computed(() => {
        const { size } = props;
        if (!size) return null;
        const isPresetValue = TEXT_SIZE_VALUES[size];
        return isPresetValue || size;
    });

    const style = computed(() => {
        const { color, decoration, weight, align, clamped } = props;
        return {
            '--color': color,
            '--font-size': size.value,
            '--font-weight': weight,
            '--text-decoration': decoration,
            '--text-align': align,
            '--clamped-lines': clamped
        };
    });

    const classes = computed(() => {
        const { theme, clamped } = props;
        const prefix = 'nue-text';
        let list: string[] = [];
        list.push(prefix);
        if (theme) list = list.concat(parseTheme(theme, prefix));
        if (clamped) list.push(`${prefix}--clamped`);
        return list;
    });
</script>
