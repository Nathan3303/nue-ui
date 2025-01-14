<template>
    <div
        v-show="!isHidden"
        :data-collapsed="isCollapsed"
        class="nue-collapse-item"
    >
        <div class="nue-collapse-item__header">
            <slot :collapse="handleCollapse" :state="isCollapsed" name="header">
                <nue-text
                    :clamped="1"
                    class="nue-collapse-item__title"
                    @click="handleCollapse"
                >
                    <slot name="title">{{ title }}</slot>
                </nue-text>
                <nue-button
                    class="nue-collapse-item__toggle-button"
                    icon="arrow-down"
                    theme="pure"
                    @click="handleCollapse"
                />
            </slot>
        </div>
        <div ref="contentRef" class="nue-collapse-item__content">
            <div ref="contentInnerRef" class="nue-collapse-item__inner">
                <slot>
                    <nue-text
                        v-if="!hideWhenEmpty"
                        class="nue-collapse-item__empty"
                    >
                        暂无内容
                    </nue-text>
                </slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUpdated, ref, watch } from 'vue';
import { COLLAPSE_CONTEXT_KEY } from './constants';
import NueButton from '../button/button.vue';
import NueText from '../text/text.vue';
import { generateId } from '@nue-ui/utils';
import type {
    CollapseContextType,
    CollapseItemName,
    CollapseItemPropsType
} from './types';

defineOptions({ name: 'NueCollapseItem' });

const props = withDefaults(defineProps<CollapseItemPropsType>(), {});

const { activedItems, pushActivedItem } = inject(
    COLLAPSE_CONTEXT_KEY,
    {} as CollapseContextType
);

const contentRef = ref<HTMLDivElement>();
const contentInnerRef = ref<HTMLDivElement>();
const isHidden = ref(false);
const timer = ref<number>();

const itemName = computed(() => {
    const name = props.name || generateId();
    return name as CollapseItemName;
});
const isCollapsed = computed(() => {
    return !activedItems.value.includes(itemName.value);
});

function handleCollapse() {
    pushActivedItem(itemName.value);
}

function handleCollapseAnimation() {
    if (contentRef.value) {
        contentRef.value.style.height = contentRef.value.scrollHeight + 'px';
        contentRef.value.scrollHeight;
        if (isCollapsed.value) {
            if (timer.value) clearTimeout(timer.value);
            contentRef.value.style.height = '0px';
        } else {
            timer.value = setTimeout(
                () => (contentRef.value!.style.height = 'auto'),
                300
            ) as unknown as number;
        }
    }
}

function handleHideWhenEmpty() {
    if (props.hideWhenEmpty) {
        if (contentInnerRef.value) {
            isHidden.value = contentInnerRef.value.children.length === 0;
            return;
        }
    }
    isHidden.value = false;
}

watch(
    () => isCollapsed.value,
    () => handleCollapseAnimation()
);

onMounted(() => {
    handleCollapseAnimation();
    handleHideWhenEmpty();
});

onUpdated(() => {
    handleHideWhenEmpty();
});

defineExpose({
    name: itemName,
    isCollapsed,
    handleCollapse
});
</script>
