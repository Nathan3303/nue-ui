<template>
    <div
        v-show="!isHidden"
        class="nue-collapse-item"
        :data-collapse="isCollapsed">
        <div class="nue-collapse-item__header">
            <slot name="header" :collapse="handleCollapse" :state="isCollapsed">
                <div
                    class="nue-collapse-item__title"
                    @dblclick.stop.prevent="handleCollapse">
                    <slot name="title">
                        <span>{{ title }}</span>
                    </slot>
                </div>
                <nue-button
                    class="nue-collapse-item__toggle-button"
                    icon="icon-arrow-down"
                    shape="no-shape"
                    @click="handleCollapse" />
            </slot>
        </div>
        <div ref="contentRef" class="nue-collapse-item__content">
            <div ref="contentInnerRef" class="nue-collapse-item__inner">
                <slot>
                    <p v-if="!hideWhenEmpty" class="nue-collapse-item__empty">
                        Empty
                    </p>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, inject, computed } from "vue";
import { NueButton } from "../../index";
import type { CollapseContextType } from "./collapse";
import "../style/collapse-item.css";

defineOptions({
    name: "NueCollapseItem",
});

const props = withDefaults(
    defineProps<{
        title?: string;
        name?: string | number;
        hideWhenEmpty?: boolean;
    }>(),
    {
        title: "",
        hideWhenEmpty: false,
    }
);

const contentRef = ref<HTMLDivElement>();
const contentInnerRef = ref<HTMLDivElement>();
const { activeItems, registActiveItem } =
    inject<CollapseContextType>("collapseContext")!;
const isHidden = ref(false);
const timer = ref<number>();

const itemName = computed(() => {
    return props.name || props.title;
});
const isCollapsed = computed(() => {
    return !activeItems.value.includes(itemName.value);
});

function handleCollapse() {
    registActiveItem(itemName.value);
}

function handleCollapseAnimation() {
    if (contentRef.value) {
        contentRef.value.style.height = contentRef.value.scrollHeight + "px";
        contentRef.value.scrollHeight;
        if (isCollapsed.value) {
            if (timer.value) clearTimeout(timer.value);
            contentRef.value.style.height = "0px";
        } else {
            timer.value = setTimeout(
                () => (contentRef.value!.style.height = "max-content"),
                300
            );
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
</script>
