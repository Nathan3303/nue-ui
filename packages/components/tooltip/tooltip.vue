<template>
    <div
        class="nue-tooltip-wrapper"
        @mouseenter="handleShow"
        @mouseleave="handleHide"
        ref="tooltipWrapperRef">
        <slot></slot>
        <teleport to="#NueTooltipPool">
            <div
                v-if="visible"
                :class="tooltipClasses"
                :style="tooltipStyles"
                @mouseenter="handleKeepTooltip"
                @mouseleave="handleHide"
                ref="tooltipRef">
                <slot name="content">
                    <span class="nue-tooltip__text">{{ content }}</span>
                </slot>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from "vue";
import { useTooltipPool } from "./use-tooltip-pool";
import { parseTheme } from "@nue-ui/utils";
import type { NueTooltipProps, NueTooltipEmits } from "./types";
import "./tooltip.css";

defineOptions({ name: "NueTooltip" });
const props = withDefaults(defineProps<NueTooltipProps>(), {
    content: "No content.",
    placement: "top-center",
});
const emit = defineEmits<NueTooltipEmits>();

const { activeTooltipPool, deactiveTooltipPool } = useTooltipPool();

const visible = ref(false);
const rectInfo = reactive({
    width: 0,
    height: 0,
    wrapperX: 0,
    wrapperY: 0,
    wrapperWidth: 0,
    wrapperHeight: 0,
});
const tooltipWrapperRef = ref<HTMLDivElement>();
const tooltipRef = ref<HTMLDivElement>();
const hideTimer = ref<number | null>();

const tooltipClasses = computed(() => {
    const { placement, theme } = props;
    const prefix = "nue-tooltip";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (placement) list.push(`${prefix}--${placement}`);
    return list;
});

const tooltipStyles = computed(() => {
    const { width, height, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
        rectInfo;
    return {
        "--tooltip-width": `${width}px`,
        "--tooltip-height": `${height}px`,
        "--tooltip-wrapper-x": `${wrapperX}px`,
        "--tooltip-wrapper-y": `${wrapperY}px`,
        "--tooltip-wrapper-width": `${wrapperWidth}px`,
        "--tooltip-wrapper-height": `${wrapperHeight}px`,
    };
});

const handleShow = () => {
    visible.value = true;
    nextTick(() => {
        const BCR = tooltipRef.value?.getBoundingClientRect();
        const wrapperBCR = tooltipWrapperRef.value?.getBoundingClientRect();
        rectInfo.width = BCR?.width || 0;
        rectInfo.height = BCR?.height || 0;
        rectInfo.wrapperX = wrapperBCR?.x || 0;
        rectInfo.wrapperY = wrapperBCR?.y || 0;
        rectInfo.wrapperWidth = wrapperBCR?.width || 0;
        rectInfo.wrapperHeight = wrapperBCR?.height || 0;
        activeTooltipPool();
    });
};

const handleHide = () => {
    hideTimer.value = setTimeout(() => {
        if (!tooltipRef.value) return;
        tooltipRef.value.style.animationName = "slide-fade-out";
        setTimeout(() => {
            visible.value = false;
            deactiveTooltipPool();
        }, 160);
        hideTimer.value = null;
    }, 640) as unknown as number;
};

const handleKeepTooltip = () => {
    if (hideTimer.value) {
        clearTimeout(hideTimer.value);
        hideTimer.value = null;
    }
};
</script>
