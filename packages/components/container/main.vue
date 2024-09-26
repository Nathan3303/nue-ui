<template>
    <main ref="mainRef" :class="classes" :style="style">
        <aside
            v-if="$slots.aside"
            ref="asideRef"
            class="nue-main__aside"
            :data-visible="asideData.visible"
            :data-float="asideData.float">
            <nue-button
                v-if="useVisibleButton"
                class="nue-main__aside__visible-button"
                theme="pure"
                :icon="`arrow-${asideData.visible ? 'left' : 'right'}`"
                @click.stop="asideData.visible = !asideData.visible" />
            <slot name="aside"></slot>
            <i
                v-show="allowResizeAside"
                ref="resizerRef"
                class="nue-main__aside__resizer"
                @mousedown="handleMouseDown"
                @dblclick="handleDoubleClick"></i>
        </aside>
        <div v-if="$slots.content" class="nue-main__content">
            <slot name="content"></slot>
        </div>
        <div
            v-if="$slots.outline"
            class="nue-main__outline"
            :data-visible="outlineData.visible"
            :data-float="outlineData.float">
            <nue-button
                v-if="useVisibleButton"
                class="nue-main__outline__visible-button"
                theme="pure"
                :icon="`arrow-${outlineData.visible ? 'right' : 'left'}`"
                @click.stop="outlineData.visible = !outlineData.visible" />
            <slot name="outline"></slot>
        </div>
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { NueButton } from "../button";
import { useWindowResize } from "@nue-ui/hooks";
import type { NueMainProps } from "./types";

defineOptions({ name: "NueMain" });
const props = withDefaults(defineProps<NueMainProps>(), {
    responsive: false,
    useVisibleButton: false,
});

const { addCallback } = useWindowResize();

const mainRef = ref<HTMLElement>();
const asideRef = ref<HTMLElement>();
const resizerRef = ref<HTMLElement>();
const isResizing = ref(false);
const asideData = reactive({ visible: true, float: false });
const outlineData = reactive({ visible: true, float: false });
let originalX = 0;
let originalWidth = 0;

const classes = computed(() => {
    const { responsive } = props;
    const prefix = "nue-main";
    const list: string[] = [prefix];
    if (isResizing.value) list.push(`${prefix}--resizing`);
    if (responsive) list.push(`${prefix}--responsive`);
    return list;
});

const style = computed(() => {
    const {
        allowResizeAside,
        asideWidth,
        asideMinWidth,
        asideMaxWidth,
        contentPadding,
    } = props;
    return {
        "--nue-main-aside-width": allowResizeAside ? void 0 : asideWidth,
        "--nue-main-aside-min-width": asideMinWidth,
        "--nue-main-aside-max-width": asideMaxWidth,
        "--nue-main-content-padding": contentPadding,
    };
});

const handleResize = () => {
    if (!props.responsive) return;
    if (!mainRef.value) return;
    const _rect = mainRef.value?.getBoundingClientRect();
    console.info(_rect);
    outlineData.float = _rect.width <= 1024;
    asideData.float = _rect.width <= 800;
};

const handleMouseMove = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    document.body.style.cursor = "col-resize";
    const newWidth = boundX - originalX + originalWidth;
    asideRef.value!.style.width = newWidth + "px";
};

const handleMouseUp = () => {
    document.documentElement.removeEventListener("mousemove", handleMouseMove);
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
    isResizing.value = false;
    document.body.style.cursor = "default";
};

const handleMouseDown = (event: MouseEvent) => {
    isResizing.value = true;
    originalX = event.clientX;
    originalWidth = parseInt(window.getComputedStyle(asideRef.value!).width);
    document.documentElement.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseup", handleMouseUp);
};

const handleDoubleClick = () => {
    asideRef.value!.style.width = "200px";
};

addCallback(handleResize);
</script>
