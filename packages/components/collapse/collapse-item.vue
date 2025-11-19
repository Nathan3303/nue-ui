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
        <div ref="contentRef" class="nue-collapse-item__content">
            <slot>
                <nue-text class="nue-collapse-item__empty" color="#969696">暂无内容</nue-text>
            </slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { NueButton, NueText } from '@nue-ui/components';
import { generateId, parseTheme } from '@nue-ui/utils';
import { NUE_COLLAPSE_CONTEXT_KEY } from './constants';
import type { NueCollapseContext, NueCollapseItemName, NueCollapseItemProps } from './types';

defineOptions({ name: 'NueCollapseItem' });
const props = defineProps<NueCollapseItemProps>();

const { activedItemNames, active } = inject(NUE_COLLAPSE_CONTEXT_KEY) as NueCollapseContext;

const contentRef = ref<HTMLDivElement>();

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

const height = computed(() => {
    if (!contentRef.value) return 'auto';
    if (isCollapsed.value) return '0px';
    return contentRef.value.scrollHeight + 'px';
});

const styles = computed(() => ({
    '--nue-collapse-item-overflow': props.maxHeight ? 'auto' : 'hidden',
    '--nue-collapse-item-max-height': props.maxHeight,
    '--nue-collapse-item-height': height.value
}));

const handleCollapse = () => active(itemName.value);

defineExpose({
    name: itemName,
    isCollapsed,
    handleCollapse
});
</script>
