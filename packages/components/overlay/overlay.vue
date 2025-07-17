<template>
    <div :class="classes" :data-closing="closing" :style="styles">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import './overlay.css';
import { isString } from 'lodash-es';
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NuePopupItemAnimation } from '@nue-ui/utils';
import type { NueOverlayProps } from './types';

defineOptions({ name: 'NueOverlay' });
const props = defineProps<NueOverlayProps>();

const classes = computed(() => {
    const prefix = 'nue-overlay';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => {
    const { animation, closeAnimation } = props;
    const animationStyles = handleAnimationStyles(animation);
    const closeAnimationStyles = handleAnimationStyles(closeAnimation, true);
    return {
        ...animationStyles,
        ...closeAnimationStyles
    };
});

const handleAnimationStyles = (
    value: NuePopupItemAnimation | undefined,
    isCloseState?: boolean
) => {
    if (value === null || value === void 0) return {};
    let result: Record<string, string> = {};
    let target: Exclude<NuePopupItemAnimation, string> = isString(value) ? { name: value } : value;
    const prefix = `--nue-overlay${isCloseState ? '-close' : ''}-animation`;
    result[`${prefix}-name`] = target.name;
    result[`${prefix}-duration`] = `${target.duration || 240}ms`;
    return result;
};
</script>
