<template>
    <div
        :class="classes"
        :style="styles"
        :data-visible="visible"
        tabindex="-1"
        @keydown.esc.exact="emit('escape')"
    >
        <slot />
    </div>
</template>

<script lang="ts" setup>
import './overlay.css';
import { computed } from 'vue';
import { parsePopupItemAnimation, parseTheme } from '@nue-ui/utils';
import type { NueOverlayProps, NueOverlayEmits } from './types';

defineOptions({ name: 'NueOverlay' });
const props = defineProps<NueOverlayProps>();
const emit = defineEmits<NueOverlayEmits>();

const classes = computed(() => {
    const prefix = 'nue-overlay';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const animationStyles = computed(() => {
    return parsePopupItemAnimation(props.animation);
});

const closeAnimationStyles = computed(() => {
    return parsePopupItemAnimation(props.closeAnimation);
});

const styles = computed(() => ({
    '--nue-overlay-animation-name': animationStyles.value.name,
    '--nue-overlay-animation-duration': animationStyles.value.duration,
    '--nue-overlay-close-animation-name': closeAnimationStyles.value.name,
    '--nue-overlay-close-animation-duration': closeAnimationStyles.value.duration
}));
</script>
