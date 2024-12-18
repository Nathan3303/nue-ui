<template>
    <div
        ref="tooltipWrapperRef"
        class="nue-tooltip-wrapper"
        @mouseenter="handleShow"
        @mouseleave="handleHide"
    >
        <slot />
        <teleport to="#NueTooltipPool">
            <div
                v-if="visible"
                ref="tooltipRef"
                :class="tooltipClasses"
                :data-direction="placementInfo.direction"
                :style="tooltipStyles"
                @mouseenter="handleShow"
                @mouseleave="handleHide"
            >
                <div
                    :data-direction="placementInfo.direction"
                    class="nue-tooltip__padding"
                ></div>
                <slot name="content">
                    <span class="nue-tooltip__text">{{ content }}</span>
                </slot>
            </div>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useTooltipPool } from './use-tooltip-pool';
import { usePopper, usePopperController } from '@nue-ui/hooks';
import { parseTheme } from '@nue-ui/utils';
import type { NueTooltipProps } from './types';
import './tooltip.css';

defineOptions({ name: 'NueTooltip' });
const props = withDefaults(defineProps<NueTooltipProps>(), {
    content: 'No content.',
    placement: 'top-center'
});

const visible = ref(false);
const tooltipWrapperRef = ref<HTMLDivElement>();
const tooltipRef = ref<HTMLDivElement>();

const { activeTooltipPool, deactiveTooltipPool } = useTooltipPool();
const { placement, calculatePosition } = usePopper(
    tooltipWrapperRef,
    tooltipRef,
    {
        placement: props.placement
    }
);
const { show, hide } = usePopperController(visible);

const tooltipClasses = computed(() => {
    const prefix = 'nue-tooltip';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.size && `${prefix}--${props.size}`,
        placement.value && `${prefix}--${placement.value}`
    ];
});

const tooltipStyles = computed(() => {
    return {
        '--triangle-display': props.showTriangle ? 'block' : void 0
    };
});

const placementInfo = computed(() => {
    const splited = placement.value.split('-');
    return {
        direction: splited[0] || 'top',
        alignment: splited[1] || 'center'
    };
});

const handleShow = () => {
    show(void 0, () => {
        calculatePosition(props.placement);
        activeTooltipPool();
        window.addEventListener('wheel', handleHide);
    });
};

const handleHide = () => {
    hide(
        160,
        () => {
            if (!tooltipRef.value) return;
            tooltipRef.value.style.animationName = 'slide-fade-out';
        },
        () => {
            deactiveTooltipPool();
            window.removeEventListener('wheel', handleHide);
        }
    );
};
</script>
