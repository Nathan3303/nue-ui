<template>
    <div
        class="nue-tooltip-wrapper"
        @mouseenter="handleShow"
        @mouseleave="handleHide"
        ref="tooltipWrapperRef">
        <div
            v-if="visible"
            class="nue-tooltip__buffer"
            :data-direction="placementInfo.direction"></div>
        <slot></slot>
        <teleport to="#NueTooltipPool">
            <div
                v-if="visible"
                :class="tooltipClasses"
                :style="tooltipStyles"
                :data-direction="placementInfo.direction"
                @mouseenter="handleShow"
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
    const { showTriangle } = props;
    return {
        "--triangle-display": showTriangle ? "block" : void 0,
    };
});

const placementInfo = computed(() => {
    const placement = placementBuffer.value;
    const splited = placement.split("-");
    return {
        direction: splited[0] || "top",
        alignment: splited[1] || "center",
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
    const tooltipEl = tooltipRef.value!;
    if (checkOverflow()) {
        calculatePosition();
        return;
    }
    const { width, height, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
        rectInfo;
    const placement = placementBuffer.value;
    switch (placement) {
        case "top-center":
            tooltipEl.style.left = `${
                wrapperX + wrapperWidth / 2 - width / 2
            }px`;
            tooltipEl.style.top = `${wrapperY - height - 8}px`;
            break;
        case "top-start":
            tooltipEl.style.left = `${wrapperX}px`;
            tooltipEl.style.top = `${wrapperY - height - 8}px`;
            break;
        case "top-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth - width}px`;
            tooltipEl.style.top = `${wrapperY - height - 8}px`;
            break;
        case "bottom-center":
            tooltipEl.style.left = `${
                wrapperX + wrapperWidth / 2 - width / 2
            }px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight + 8}px`;
            break;
        case "bottom-start":
            tooltipEl.style.left = `${wrapperX}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight + 8}px`;
            break;
        case "bottom-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth - width}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight + 8}px`;
            break;
        case "left-center":
            tooltipEl.style.left = `${wrapperX - width - 8}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "left-start":
            tooltipEl.style.left = `${wrapperX - width - 8}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "left-end":
            tooltipEl.style.left = `${wrapperX - width - 8}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight - height}px`;
            break;
        case "right-center":
            tooltipEl.style.left = `${wrapperX + wrapperWidth + 8}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "right-start":
            tooltipEl.style.left = `${wrapperX + wrapperWidth + 8}px`;
            tooltipEl.style.top = `${
                wrapperY + wrapperHeight / 2 - height / 2
            }px`;
            break;
        case "right-end":
            tooltipEl.style.left = `${wrapperX + wrapperWidth + 8}px`;
            tooltipEl.style.top = `${wrapperY + wrapperHeight - height}px`;
            break;
        default:
            break;
    }
};

const handleShow = () => {
    placementBuffer.value = props.placement;
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
            deactiveTooltipPool();
        }, 160);
        hideTimer.value = null;
    }) as unknown as number;
};
</script>
