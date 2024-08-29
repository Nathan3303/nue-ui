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
                :data-direction="placementInfo.direction"
                @mouseenter="handleShow"
                @mouseleave="handleHide"
                ref="tooltipRef">
                <div
                    class="nue-tooltip__padding"
                    :data-direction="placementInfo.direction"></div>
                <slot name="content">
                    <span class="nue-tooltip__text">{{ content }}</span>
                </slot>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useTooltipPool } from "./use-tooltip-pool";
import { usePopper, usePopperController } from "@nue-ui/hooks";
import { parseTheme } from "@nue-ui/utils";
import type { NueTooltipProps, NueTooltipEmits } from "./types";
import "./tooltip.css";

defineOptions({ name: "NueTooltip" });
const props = withDefaults(defineProps<NueTooltipProps>(), {
    content: "No content.",
    placement: "top-center",
});
const emit = defineEmits<NueTooltipEmits>();

const visible = ref(false);
const tooltipWrapperRef = ref<HTMLDivElement>();
const tooltipRef = ref<HTMLDivElement>();

const { activeTooltipPool, deactiveTooltipPool } = useTooltipPool();
const { placement, calculatePosition } = usePopper(
    tooltipWrapperRef,
    tooltipRef,
    {
        placement: props.placement,
    }
);
const { show, hide } = usePopperController(visible);

const tooltipClasses = computed(() => {
    const { theme, size } = props;
    const prefix = "nue-tooltip";
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size) list.push(`${prefix}--${size}`);
    if (placement.value) list.push(`${prefix}--${placement.value}`);
    return list;
});

const tooltipStyles = computed(() => {
    const { showTriangle } = props;
    return {
        "--triangle-display": showTriangle ? "block" : void 0,
    };
});

const placementInfo = computed(() => {
    const splited = placement.value.split("-");
    return {
        direction: splited[0] || "top",
        alignment: splited[1] || "center",
    };
});

const handleShow = () => {
    show(void 0, () => {
        calculatePosition(props.placement);
        activeTooltipPool();
        window.addEventListener("wheel", handleHide);
    });
};

const handleHide = () => {
    hide(
        160,
        () => {
            if (!tooltipRef.value) return;
            tooltipRef.value.style.animationName = "slide-fade-out";
        },
        () => {
            deactiveTooltipPool();
            window.removeEventListener("wheel", handleHide);
        }
    );
};
</script>
