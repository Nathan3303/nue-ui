<template>
    <main ref="mainRef" :class="classes" :style="style">
        <div
            v-if="$slots.aside"
            ref="asideRef"
            class="nue-main__aside-wrapper"
            :data-visible="asideData.visible"
            :data-collapse="asideData.collapse">
            <aside class="nue-main__aside">
                <slot name="aside"></slot>
            </aside>
            <div class="nue-main__resizer" @mousedown.capture="handleMouseDown">
                <div
                    class="nue-main__resizer__line"
                    data-target="aside"
                    :data-actived="allowResizeAside"></div>
            </div>
        </div>
        <div v-if="$slots.content" class="nue-main__content">
            <slot name="content"></slot>
        </div>
        <div
            v-if="$slots.outline"
            ref="outlineRef"
            class="nue-main__outline-wrapper"
            :data-visible="outlineData.visible"
            :data-collapse="outlineData.collapse">
            <div class="nue-main__resizer" @mousedown.capture="handleMouseDown">
                <div
                    class="nue-main__resizer__line"
                    data-target="outline"
                    :data-actived="allowResizeOutline"></div>
            </div>
            <aside class="nue-main__outline">
                <slot name="outline"></slot>
            </aside>
        </div>
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { parseTheme } from "@nue-ui/utils";
import type { NueMainProps } from "./types";

defineOptions({ name: "NueMain" });
const props = withDefaults(defineProps<NueMainProps>(), {
    asideWidth: "256px",
    asideMinWidth: "128px",
    asideMaxWidth: "512px",
    allowResizeAside: true,
    allowCollapseAside: true,
    allowHideAside: true,
    outlineWidth: "256px",
    outlineMinWidth: "128px",
    outlineMaxWidth: "512px",
    allowResizeOutline: true,
    allowCollapseOutline: true,
    allowHideOutline: true,
});

const mainRef = ref<HTMLElement>();
const asideRef = ref<HTMLElement>();
const outlineRef = ref<HTMLElement>();
const isResizing = ref(false);
const asideData = reactive({ visible: true, float: false, collapse: false });
const outlineData = reactive({ visible: true, float: false, collapse: false });
let target = "aside";
let originalX = 0;
let originalWidth = 0;

const classes = computed(() => {
    const { theme } = props;
    const prefix = "nue-main";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (isResizing.value) list.push(`${prefix}--resizing`);
    return list;
});

const style = computed(() => {
    const {
        asideWidth,
        asideMinWidth,
        asideMaxWidth,
        outlineWidth,
        outlineMinWidth,
        outlineMaxWidth,
    } = props;
    return {
        "--nue-main-aside-width": asideWidth,
        "--nue-main-aside-min-width": asideMinWidth,
        "--nue-main-aside-max-width": asideMaxWidth,
        "--nue-main-outline-width": outlineWidth,
        "--nue-main-outline-min-width": outlineMinWidth,
        "--nue-main-outline-max-width": outlineMaxWidth,
    };
});

const handleMouseDown = (event: MouseEvent) => {
    target = (event.target as HTMLDivElement).dataset.target || "aside";
    if (target === "outline" && !props.allowResizeOutline) return;
    if (target === "aside" && !props.allowResizeAside) return;
    isResizing.value = true;
    originalX = event.clientX;
    const targetRef = target === "outline" ? outlineRef : asideRef;
    originalWidth = parseInt(window.getComputedStyle(targetRef.value!).width);
    const targetFn =
        target === "aside" ? handleResizeAside : handleResizeOutline;
    document.documentElement.addEventListener("mousemove", targetFn);
    document.documentElement.addEventListener("mouseup", handleMouseUp);
};

const handleResizeAside = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    const { asideMinWidth, asideMaxWidth, allowCollapseAside, allowHideAside } =
        props;
    document.body.style.cursor = "ew-resize";
    const newWidth = originalWidth + (boundX - originalX);
    if (newWidth >= parseInt(asideMaxWidth)) return;
    asideRef.value!.style.width = newWidth + "px";
    if (allowHideAside) {
        const isHidden = newWidth <= 24;
        asideData.visible = !isHidden;
        if (isHidden) return (asideData.collapse = false);
    }
    if (allowCollapseAside) {
        const isCollapsed = newWidth <= parseInt(asideMinWidth);
        asideData.collapse = isCollapsed;
        if (isCollapsed) return;
    }
};

const handleResizeOutline = (event: MouseEvent) => {
    const { clientX: boundX } = event;
    const {
        outlineMinWidth,
        outlineMaxWidth,
        allowCollapseOutline,
        allowHideOutline,
    } = props;
    document.body.style.cursor = "ew-resize";
    const newWidth = originalWidth + (originalX - boundX);
    if (newWidth >= parseInt(outlineMaxWidth)) return;
    outlineRef.value!.style.width = newWidth + "px";
    if (allowHideOutline) {
        const isHidden = newWidth <= 24;
        outlineData.visible = !isHidden && allowHideOutline;
        if (isHidden) return (outlineData.collapse = false);
    }
    if (allowCollapseOutline) {
        const isCollapsed = newWidth <= parseInt(outlineMinWidth);
        outlineData.collapse = isCollapsed && allowCollapseOutline;
        if (isCollapsed) return;
    }
};

const handleMouseUp = () => {
    const targetFn =
        target === "aside" ? handleResizeAside : handleResizeOutline;
    document.documentElement.removeEventListener("mousemove", targetFn);
    document.documentElement.removeEventListener("mouseup", handleMouseUp);
    isResizing.value = false;
    document.body.style.cursor = "default";
};
</script>
