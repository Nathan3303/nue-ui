<template>
    <main :class="classes" :style="style">
        <aside v-if="$slots.aside" ref="asideRef" class="nue-main__aside">
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
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { MainPropsType } from "./types";
import "./main.css";

defineOptions({ name: "NueMain" });

const props = withDefaults(defineProps<MainPropsType>(), {});

const asideRef = ref<HTMLElement>();
const resizerRef = ref<HTMLElement>();
const isResizing = ref(false);
let originalX = 0;
let originalWidth = 0;

const style = computed(() => {
    const {
        allowResizeAside,
        asideWidth,
        asideMinWidth,
        asideMaxWidth,
        contentPadding,
    } = props;
    return {
        "--aside-width": allowResizeAside ? void 0 : asideWidth,
        "--aside-min-width": asideMinWidth,
        "--aside-max-width": asideMaxWidth,
        "--content-padding": contentPadding,
    };
});

const classes = computed(() => {
    const list = [];
    list.push("nue-main");
    if (isResizing.value) list.push("nue-main--resizing");
    return list;
});

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
</script>
