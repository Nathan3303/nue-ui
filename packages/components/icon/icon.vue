<template>
    <i :class="classes" :style="styles">
        <slot />
    </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueIconProps } from './types';
import './icon.css';

defineOptions({ name: 'NueIcon' });

const props = withDefaults(defineProps<NueIconProps>(), {});

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
        '--nue-icon-size': props.size,
        '--nue-icon-color': props.color,
        '--nue-icon-spin-speed': props.spinSpeed
    };
});
</script>
