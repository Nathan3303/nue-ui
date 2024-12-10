<template>
    <div
        ref="asideRef"
        :data-allow-resize="allowResize"
        :data-collapse="collapse"
        :data-float="float"
        :data-is-resizing="isResizing"
        :data-resizer-placement="resizerPlacement"
        :data-visible="visible"
        :style="style"
        class="nue-aside"
    >
        <div
            v-if="allowResize && !float"
            class="nue-aside__resizer"
            @mousedown.stop="handleMouseDown"
        ></div>
        <nue-div v-if="float" class="nue-aside__title-bar">
            <nue-text size="16px" weight="bold">
                {{ title }}
            </nue-text>
            <nue-button
                :icon="`arrow-${resizerPlacement === 'left' ? 'right' : 'left'}`"
                theme="pure"
                @click.stop="toggleVisible"
            />
        </nue-div>
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { NueButton, NueDiv, NueText } from '..';
import type { NueAsideProps } from './types';
import './aside.css';

defineOptions({ name: 'NueAside' });
const props = withDefaults(defineProps<NueAsideProps>(), {
    width: '256px',
    minWidth: '128px',
    maxWidth: '512px',
    allowResize: false,
    allowCollapse: false,
    allowHide: false,
    resizerPlacement: 'right',
    float: false,
    title: 'Aside title'
});

const asideRef = ref<HTMLDivElement>();
const isResizing = ref(false);
const visible = ref(!props.float);
const collapse = ref(false);
let originalX = 0;
let originalWidth = 0;

const style = computed(() => {
    return {
        '--nue-aside-width': props.width,
        '--nue-aside-min-width': props.minWidth,
        '--nue-aside-max-width': props.maxWidth
    };
});

const handleMouseDown = (event: MouseEvent) => {
    if (!props.allowResize) return;
    isResizing.value = true;
    originalX = event.clientX;
    if (!asideRef.value) return;
    originalWidth = parseInt(window.getComputedStyle(asideRef.value).width);
    document.documentElement.addEventListener('mousemove', handleResizeAside);
    document.documentElement.addEventListener('mouseup', handleMouseUp);
};

const handleMouseUp = () => {
    document.documentElement.removeEventListener(
        'mousemove',
        handleResizeAside
    );
    document.documentElement.removeEventListener('mouseup', handleMouseUp);
    isResizing.value = false;
    document.body.style.cursor = 'default';
};

const convertPercentageWidth = (width: string) => {
    width = width.trim();
    if (!asideRef.value) return parseInt(width);
    const parentElement = asideRef.value.parentElement;
    if (!parentElement || !width.endsWith('%')) return parseInt(width);
    const percent = parseFloat(width) / 100;
    const mainWidth = parentElement.clientWidth;
    return (mainWidth * percent) as number;
};

const handleResizeAside = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    document.body.style.cursor = 'ew-resize';
    let newWidth: number;
    if (props.resizerPlacement === 'left') {
        newWidth = originalWidth + (originalX - boundX);
    } else {
        newWidth = originalWidth + (boundX - originalX);
    }
    if (newWidth) setAsideWidth(newWidth);
};

const setAsideWidth = (newWidth: number) => {
    const numericMinWidth = convertPercentageWidth(props.minWidth);
    const numericMaxWidth = convertPercentageWidth(props.maxWidth);
    if (newWidth >= numericMaxWidth) return;
    asideRef.value!.style.width = newWidth + 'px';
    if (props.allowHide) {
        const isHidden = newWidth <= 24;
        visible.value = !isHidden;
        if (isHidden) return (collapse.value = false);
    }
    if (props.allowCollapse) {
        const isCollapsed = newWidth <= numericMinWidth;
        collapse.value = isCollapsed;
        if (isCollapsed) return;
    }
};

const toggleVisible = () => {
    if (!props.float) return;
    visible.value = !visible.value;
};

watch(
    () => props.float,
    nv => (visible.value = !nv)
);

defineExpose({
    toggleVisible
});
</script>
