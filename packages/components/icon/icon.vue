<template>
    <i class="iconfont" :class="classes" :style="styles"> <slot /> </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueIconProps } from './types';

defineOptions({ name: 'NueIcon' });

const props = withDefaults(defineProps<NueIconProps>(), {
    name: 'blank',
    hinting: true
});

const classes = computed(() => {
    const prefix = 'nue-icon';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.name ? `icon-${props.name}` : void 0,
        props.spin ? 'nue-icon--spin' : void 0,
        props.hinting ? 'nue-icon--hinting' : void 0
    ];
});

const styles = computed(() => ({
    '--nue-icon-size': props.size,
    '--nue-icon-color': props.color,
    '--nue-icon-spin-speed': props.spinSpeed
}));
</script>
