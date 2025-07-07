<template>
    <div
        ref="separatorRef"
        :class="classes"
        @mousedown.stop="handleMouseDown"
        @dblclick.stop="handleResetOpElementWidth"
    />
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueSeparatorProps, NueSeparatorEmits } from './types';

defineOptions({ name: 'NueSeparator' });
const props = defineProps<NueSeparatorProps>();
const emit = defineEmits<NueSeparatorEmits>();

const separatorRef = ref<HTMLDivElement>();
const opElement = ref<HTMLElement>();
const opElementAttrs = { width: 0, minWidth: 0 };
const tempAttrs = { originalX: 0, originalWidth: 0 };

const classes = computed(() => {
    const prefix = 'nue-separator';
    return [prefix, ...parseTheme(props.theme, prefix), props.disabled && `${prefix}--disabled`];
});

const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (!opElement.value || props.disabled) return;
    tempAttrs.originalX = event.clientX;
    tempAttrs.originalWidth = opElement.value.offsetWidth;
    document.documentElement.addEventListener('mousemove', resizeOpElement, false);
    document.documentElement.addEventListener('mouseup', handleMouseUp, false);
};

const handleMouseUp = () => {
    document.documentElement.removeEventListener('mousemove', resizeOpElement, false);
    document.documentElement.removeEventListener('mouseup', handleMouseUp, false);
};

const resizeOpElement = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    const newWidth =
        props.opTarget === 'next'
            ? tempAttrs.originalWidth + (tempAttrs.originalX - boundX)
            : tempAttrs.originalWidth + (boundX - tempAttrs.originalX);
    // console.log('[NueSeparator/handleMouseDown] tempAttr', tempAttr);
    if (newWidth) {
        setOpElementWidth(newWidth);
        emit('resize', newWidth);
    }
};

const convertPercentageWidth = (width: string) => {
    width = width.trim();
    if (!separatorRef.value) return parseInt(width);
    const parentElement = separatorRef.value.parentElement;
    if (!parentElement || !width.endsWith('%')) return parseInt(width);
    const percent = parseFloat(width) / 100;
    const mainWidth = parentElement.clientWidth;
    return (mainWidth * percent) as number;
};

const setOpElementWidth = (newWidth: number) => {
    if (!opElement.value) return;
    const isMinimal = newWidth < opElementAttrs.minWidth;
    opElement.value.dataset.collapsed = `${isMinimal}`;
    if (isMinimal) return;
    (opElement.value as HTMLElement).style.width = newWidth + 'px';
    // console.log('[NueSeparator/setOpElementWidth] newWidth', newWidth);
};

const handleResetOpElementWidth = () => {
    if (!opElement.value) return;
    (opElement.value as HTMLElement).style.width = opElementAttrs.width + 'px';
};

onMounted(() => {
    if (!separatorRef.value) return;
    if (props.opTarget === 'previous') {
        opElement.value = separatorRef.value.previousElementSibling as HTMLElement;
    } else if (props.opTarget === 'next') {
        opElement.value = separatorRef.value.nextElementSibling as HTMLElement;
    } else {
        opElement.value = props.opTarget;
    }
    if (!opElement.value) return;
    opElementAttrs.width = opElement.value.offsetWidth;
    opElementAttrs.minWidth =
        convertPercentageWidth(window.getComputedStyle(opElement.value).minWidth) || 72;
    // console.log('[NueSeparator/handleMouseDown] opElementAttrs', opElementAttrs);
});
</script>
