<template>
    <div
        ref="overlayRef"
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
import { computed, ref, watch } from 'vue';
import { parsePopupItemAnimation, parseTheme } from '@nue-ui/utils';
import type { NueOverlayProps, NueOverlayEmits } from './types';

defineOptions({ name: 'NueOverlay' });
const props = defineProps<NueOverlayProps>();
const emit = defineEmits<NueOverlayEmits>();

// @ref 元素引用
const overlayRef = ref<HTMLDivElement>();

// @computed 计算类名
const classes = computed(() => {
    const prefix = 'nue-overlay';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

// @computed 动画样式
const animationStyles = computed(() => {
    return parsePopupItemAnimation(props.animation);
});

// @computed 关闭动画样式
const closeAnimationStyles = computed(() => {
    return parsePopupItemAnimation(props.closeAnimation);
});

// @computed 样式
const styles = computed(() => ({
    '--nue-overlay-animation-name': animationStyles.value.name,
    '--nue-overlay-animation-duration': animationStyles.value.duration,
    '--nue-overlay-close-animation-name': closeAnimationStyles.value.name,
    '--nue-overlay-close-animation-duration': closeAnimationStyles.value.duration
}));

// @watch 组件显示完成后聚焦
watch(
    () => props.visible,
    visible => {
        if (!visible) return;
        setTimeout(() => overlayRef.value?.focus());
    },
    { immediate: true }
);
</script>
