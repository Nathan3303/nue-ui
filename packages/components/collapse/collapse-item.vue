<template>
    <div :data-collapsed="isCollapsed" :class="classes" :style="styles">
        <div class="nue-collapse-item__header">
            <slot :collapse="handleCollapse" :state="isCollapsed" name="header">
                <nue-text :clamped="1" class="nue-collapse-item__title" @click="handleCollapse">
                    <slot name="title">{{ title }}</slot>
                </nue-text>
                <nue-button
                    class="nue-collapse-item-state-icon"
                    icon="arrow-down"
                    theme="pure"
                    @click="handleCollapse"
                />
            </slot>
        </div>
        <div
            ref="contentRef"
            class="nue-collapse-item__content"
            @transitionend="handleTransitionEnd"
        >
            <slot>
                <nue-text class="nue-collapse-item__empty" color="#969696">暂无内容</nue-text>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { NueButton, NueText } from '@nue-ui/components';
import { generateId, parseTheme } from '@nue-ui/utils';
import { NUE_COLLAPSE_CONTEXT_KEY } from './constants';
import type { NueCollapseContext, NueCollapseItemName, NueCollapseItemProps } from './types';

defineOptions({ name: 'NueCollapseItem' });
const props = defineProps<NueCollapseItemProps>();

const { activedItemNames, active } = inject<NueCollapseContext>(NUE_COLLAPSE_CONTEXT_KEY)!;

const contentRef = ref<HTMLDivElement>();
const styleVO = reactive({
    height: '0px',
    minHeight: 'unset',
    maxHeight: props.maxHeight || 'unset',
    overflow: 'hidden'
});

const itemName = computed(() => {
    return props.name || (generateId() as NueCollapseItemName);
});

const isCollapsed = computed(() => {
    return !activedItemNames.value.includes(itemName.value);
});

const classes = computed(() => {
    const prefix = 'nue-collapse-item';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => ({
    '--nue-collapse-item-height': styleVO.height,
    '--nue-collapse-item-min-height': styleVO.minHeight,
    '--nue-collapse-item-max-height': styleVO.maxHeight,
    '--nue-collapse-item-overflow': styleVO.overflow
}));

const handleExpandAnimation = () => {
    styleVO.height = '0px';
    nextTick(() => {
        if (!contentRef.value) return;
        void contentRef.value.scrollHeight;
        styleVO.height = `max(${props.minHeight || '0px'}, min(${props.maxHeight || '9999px'}, ${contentRef.value.scrollHeight}px))`;
        styleVO.overflow = props.maxHeight ? 'auto' : 'hidden';
    });
};

const handleCollapseAnimation = () => {
    if (!contentRef.value) return;
    styleVO.height = `${contentRef.value.clientHeight}px`;
    styleVO.minHeight = 'unset';
    nextTick(() => {
        if (!contentRef.value) return;
        void contentRef.value.clientHeight;
        styleVO.height = '0px';
        styleVO.overflow = 'hidden';
    });
};

const handleTransitionEnd = () => {
    // if (!contentRef.value) return;
    if (isCollapsed.value) return;
    styleVO.minHeight = props.minHeight || 'unset';
    styleVO.height = 'auto';
};

const handleCollapse = () => {
    active(itemName.value);
};

watch(isCollapsed, value => {
    if (value) {
        handleCollapseAnimation();
    } else {
        handleExpandAnimation();
    }
});

onMounted(() => {
    // if (!contentRef.value) return;
    styleVO.height = isCollapsed.value ? '0px' : 'auto';
    styleVO.minHeight = !isCollapsed.value && props.minHeight ? props.minHeight : 'unset';
});

defineExpose({ name: itemName, isCollapsed, handleCollapse });
</script>