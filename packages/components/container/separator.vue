<template>
    <div
        ref="separatorRef"
        :class="classes"
        @mousedown.stop="handleMouseDown"
        @dblclick.stop="handleResetOpElementWidth"
    >
        <slot />
    </div>
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
    // `data-collapsed` 是 NueAside 的公共契约（受控折叠）：
    // 宽度由 collapsed / collapsedWidth 决定，拖拽只会写出与 prop 不一致的宽度，直接不响应。
    if (opElement.value.dataset.collapsed === 'true') return;
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

const convertPercentageWidth = (rawWidth: string | undefined) => {
    // 有些环境（jsdom）对未声明的 min-width 返回 undefined，直接 trim 会抛错
    const width = (rawWidth ?? '').trim();
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
    // 私有属性：不动 `data-collapsed`（那是 aside 的公共契约，会误触发其折叠样式）
    opElement.value.dataset.resizeCollapsed = `${isMinimal}`;
    if (isMinimal) return;
    (opElement.value as HTMLElement).style.width = newWidth + 'px';
    // console.log('[NueSeparator/setOpElementWidth] newWidth', newWidth);
};

const handleResetOpElementWidth = () => {
    if (!opElement.value) return;
    // 同上：受控折叠的目标不写内联宽度（双击复位会留下一份与 collapsed 不一致的宽度）
    if (opElement.value.dataset.collapsed === 'true') return;
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