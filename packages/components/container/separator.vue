<template>
    <div
        ref="separatorRef"
        class="nue-separator"
        @mousedown.stop="handleMouseDown"
        @dblclick.stop="handleResetOpElementWidth"
    ></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { NueSeparatorProps } from './types';
import './separator.css';

defineOptions({ name: 'NueSeparator' });
const props = defineProps<NueSeparatorProps>();

const separatorRef = ref<HTMLDivElement>();
const opElement = ref<HTMLElement>();
let startWidth = 0;
let opElementMinWidth = 0;
let originalX = 0;
let originalWidth = 0;

const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    if (!opElement.value) return;
    originalX = event.clientX;
    originalWidth = opElement.value.offsetWidth;
    document.documentElement.addEventListener('mousemove', resizeOpElement);
    document.documentElement.addEventListener('mouseup', handleMouseUp);
};

const handleMouseUp = () => {
    document.documentElement.removeEventListener('mousemove', resizeOpElement);
    document.documentElement.removeEventListener('mouseup', handleMouseUp);
};

const resizeOpElement = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    const newWidth =
        props.opTarget === 'next'
            ? originalWidth + (originalX - boundX)
            : originalWidth + (boundX - originalX);
    if (newWidth) setOpElementWidth(newWidth);
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
    // const numericMinWidth = convertPercentageWidth(props.minWidth);
    // const numericMaxWidth = convertPercentageWidth(props.maxWidth);
    // if (newWidth >= numericMaxWidth || newWidth <= numericMinWidth) return;
    (opElement.value as HTMLElement).style.width = newWidth + 'px';
    opElement.value.dataset.collapsed = `${newWidth <= opElementMinWidth}`;
};

const handleResetOpElementWidth = () => {
    if (!opElement.value) return;
    (opElement.value as HTMLElement).style.width = startWidth + 'px';
};

onMounted(() => {
    if (!separatorRef.value) return;
    if (props.opTarget === 'previous') {
        opElement.value = separatorRef.value
            .previousElementSibling as HTMLElement;
    } else if (props.opTarget === 'next') {
        opElement.value = separatorRef.value.nextElementSibling as HTMLElement;
    } else {
        opElement.value = props.opTarget;
    }
    if (!opElement.value) return;
    startWidth = opElement.value.offsetWidth;
    opElementMinWidth =
        convertPercentageWidth(opElement.value.style.minWidth) || 64;
});
</script>
