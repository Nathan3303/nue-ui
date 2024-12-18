<template>
    <i :class="classes" :style="styles">
        <slot />
    </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { IconPropsType } from './types';
import './icon.css';

defineOptions({ name: 'NueIcon' });

const props = withDefaults(defineProps<IconPropsType>(), {});

const classes = computed(() => {
    const prefix = 'nue-icon';
    return [
        prefix,
        'iconfont',
        `icon-${props.name}`,
        { 'nue-icon--spin': props.spin },
        ...parseTheme(props.theme, prefix)
    ];
});

const styles = computed(() => {
    return {
        '--icon-size': props.size,
        '--icon-color': props.color,
        '--spin-speed': props.spinSpeed
    };
});
</script>
