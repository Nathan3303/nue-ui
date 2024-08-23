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
                @mouseenter="handleShow"
                @mouseleave="handleHide"
                ref="tooltipRef">
                <div class="nue-tooltip__inner">
                    <slot name="content">
                        <span class="nue-tooltip__text">{{ content }}</span>
                    </slot>
                </div>
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
const placementBuffer = ref(props.placement);
const tooltipWrapperRef = ref<HTMLDivElement>();
const tooltipRef = ref<HTMLDivElement>();
const hideTimer = ref<number | null>();

const tooltipClasses = computed(() => {
    const { theme, size } = props;
    const placement = placementBuffer.value;
    const prefix = "nue-tooltip";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size) list.push(`${prefix}--${size}`);
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

const getRectInfo = () => {
    const BCR = tooltipRef.value?.getBoundingClientRect();
    const wrapperBCR = tooltipWrapperRef.value?.getBoundingClientRect();
    rectInfo.width = BCR?.width || 0;
    rectInfo.height = BCR?.height || 0;
    rectInfo.wrapperX = wrapperBCR?.x || 0;
    rectInfo.wrapperY = wrapperBCR?.y || 0;
    rectInfo.wrapperWidth = wrapperBCR?.width || 0;
    rectInfo.wrapperHeight = wrapperBCR?.height || 0;
};

const updatePlacementBuffer = (
    direction: "top" | "bottom" | "left" | "right"
) => {
    const placement = placementBuffer.value;
    const splited = placement.split("-");
    splited[0] = direction;
    const newPlacement = splited.join("-") || "top-center";
    placementBuffer.value = (newPlacement as NueTooltipProps["placement"])!;
};

const checkOverflow = () => {
    const placement = placementBuffer.value;
    const direction = placement.split("-")[0];
    const { width, height, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
        rectInfo;
    switch (direction) {
        case "top":
            if (wrapperY - height < 0) {
                updatePlacementBuffer("bottom");
                return true;
            }
            break;
        case "bottom":
            if (wrapperY + wrapperHeight + height > window.innerHeight) {
                updatePlacementBuffer("top");
                return true;
            }
            break;
        case "left":
            if (wrapperX - width < 0) {
                updatePlacementBuffer("right");
                return true;
            }
            break;
        case "right":
            if (wrapperX + wrapperWidth + width > window.innerWidth) {
                updatePlacementBuffer("left");
                return true;
            }
            break;
    }
    return false;
};

const calculatePosition = () => {
    const tooltipEl = tooltipRef.value;
    if (!tooltipEl) return;
    if (checkOverflow()) return calculatePosition();
    const { width, height, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
        rectInfo;
    const placement = placementBuffer.value;
    switch (placement) {
        case "top-center":
            tooltipEl.style.left = `${
                wrapperX + wrapperWidth / 2 - width / 2
            }px`;
            tooltipEl.style.top = `${wrapperY - height}px`;
            break;
        case "top-start":
            tooltipEl.style.left = `${wrapperX}px`;
            tooltipEl.style.top = `${wrapperY - height}px`;
            break;
        case "top-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth - width}px`;
            tooltipEl.style.top = `${wrapperY - height}px`;
            break;
        case "bottom-center":
            tooltipEl.style.left = `${
                wrapperX + wrapperWidth / 2 - width / 2
            }px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight}px`;
            break;
        case "bottom-start":
            tooltipEl.style.left = `${wrapperX}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight}px`;
            break;
        case "bottom-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth - width}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight}px`;
            break;
        case "left-center":
            tooltipEl.style.left = `${wrapperX - width}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "left-start":
            tooltipEl.style.left = `${wrapperX - width}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "left-end":
            tooltipEl.style.left = `${wrapperX - width}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight - height}px`;
            break;
        case "right-center":
            tooltipEl.style.left = `${wrapperX + wrapperWidth}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "right-start":
            tooltipEl.style.left = `${wrapperX + wrapperWidth}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "right-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight - height}px`;
            break;
        default:
            break;
    }
};

const handleShow = () => {
    if (hideTimer.value) {
        clearTimeout(hideTimer.value);
        hideTimer.value = null;
    }
    visible.value = true;
    nextTick(() => {
        getRectInfo();
        calculatePosition();
        activeTooltipPool();
    });
};

const handleHide = () => {
    hideTimer.value = setTimeout(() => {
        if (!tooltipRef.value) return;
        tooltipRef.value.style.animationName = "slide-fade-out";
        setTimeout(() => {
            visible.value = false;
            placementBuffer.value = props.placement;
            deactiveTooltipPool();
        }, 160);
        hideTimer.value = null;
    }) as unknown as number;
};
</script>
