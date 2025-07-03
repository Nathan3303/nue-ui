<template>
    <div
        ref="dropdownWrapperRef"
        :data-visible="visible"
        :data-closing="closing"
        class="nue-dropdown-wrapper"
    >
        <slot :trigger="handleSwitchByMouseEvent" :visible="visible" name="trigger">
            <nue-button :disabled="disabled" :size="size" @click="handleSwitchByMouseEvent">
                {{ triggerText || text }}
                <template #append>
                    <nue-icon class="state-icon" name="arrow-down" />
                </template>
            </nue-button>
        </slot>
    </div>
    <template v-if="visible">
        <teleport :disabled="tpState.disabled" :to="tpState.to">
            <nue-overlay
                :closing="closing"
                :theme="transparent ? 'transparent' : 'no-background'"
                @click="handleClose"
            >
                <ul
                    v-show="visible"
                    ref="dropdownRef"
                    :class="classes"
                    :data-direction="placementInfo.direction"
                    :style="styles"
                    @click.stop="handleExecute"
                >
                    <slot>
                        <span class="nue-dropdown__empty-text">没有选项</span>
                    </slot>
                </ul>
            </nue-overlay>
        </teleport>
    </template>
</template>

<script lang="ts" setup>
import { computed, onUnmounted, ref } from 'vue';
import NueButton from '../button/button.vue';
import NueIcon from '../icon/icon.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseAnimationDurationToNumber, parseTheme } from '@nue-ui/utils';
import { usePopper, usePopperController } from '@nue-ui/hooks';
import { throttle } from 'lodash-es';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueDropdownProps, NueDropdownEmits } from './types';
import './dropdown.css';

defineOptions({ name: 'NueDropdown' });
const props = withDefaults(defineProps<NueDropdownProps>(), {
    transparent: false,
    disabled: false,
    text: 'Dropdown',
    triggerText: 'Dropdown',
    placement: 'bottom-start',
    dropType: 'click',
    closeWhenExecuted: false
});
const emit = defineEmits<NueDropdownEmits>();

const { tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const dropdownRef = ref<HTMLDivElement>();
const dropdownWrapperRef = ref<HTMLDivElement>();
const closing = ref(false);
const visible = ref(false);
const closeAnimationDuration = ref(0);
const { placement, rectInfo, calculatePosition } = usePopper(dropdownWrapperRef, dropdownRef, {
    placement: props.placement
});
const { show, hide } = usePopperController(visible);
let dropdownTimer: number | null = 0;

const classes = computed(() => {
    const prefix = 'nue-dropdown';
    return [prefix, ...parseTheme(props.theme, prefix), props.size && `${prefix}--${props.size}`];
});

const styles = computed(() => {
    const { wrapperWidth } = rectInfo;
    return {
        '--dropdown-wrapper-width': `${wrapperWidth.toFixed(2)}px`
    };
});

const placementInfo = computed(() => {
    const splited = placement.value.split('-');
    return {
        direction: splited[0] || 'top',
        alignment: splited[1] || 'center'
    };
});

const waitForAnimation = () => {
    const timeout = parseAnimationDurationToNumber(
        closeAnimationDuration.value ||
            window.getComputedStyle(dropdownRef.value!).animationDuration
    );
    return new Promise(resolve => {
        setTimeout(() => resolve(1), timeout);
    });
};

const handleCalculatePosition = throttle(() => {
    calculatePosition(props.placement);
}, 1);

const handleOpen = () => {
    show(
        () => {
            closing.value = false;
            if (!visible.value) document.body.click();
        },
        () => {
            handleCalculatePosition();
            emit('open');
            mountPopupAnchor();
        }
    );
    if (!props.transparent) return;
    window.addEventListener('scroll', handleCalculatePosition, false);
    window.addEventListener('resize', handleCalculatePosition, false);
    window.addEventListener('click', handleClose, false);
};

const handleClose = () => {
    hide(
        160,
        async () => {
            closing.value = true;
            await waitForAnimation();
        },
        () => {
            emit('close');
        }
    );
    if (!props.transparent) return;
    window.removeEventListener('scroll', handleCalculatePosition, false);
    window.removeEventListener('resize', handleCalculatePosition, false);
    window.removeEventListener('click', handleClose, false);
};

const handleDrop = (type: 'close' | 'open') => {
    if (dropdownTimer) return;
    switch (type) {
        case 'open':
            handleOpen();
            break;
        case 'close':
            handleClose();
            break;
    }
    dropdownTimer = setTimeout(() => {
        dropdownTimer = null;
    }, 200) as unknown as number;
};

const handleSwitchByMouseEvent = (event: MouseEvent) => {
    event.stopPropagation();
    switch (props.dropType) {
        case 'hover':
            switch (event.type) {
                case 'mouseenter':
                    handleDrop('open');
                    break;
                case 'mouseleave':
                    handleDrop('close');
                    break;
            }
            break;
        case 'click':
        default:
            handleDrop(visible.value ? 'close' : 'open');
            break;
    }
};

const handleExecute = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const executeId = clickedElement.dataset.executeid;
    if (executeId === void 0) return;
    emit('execute', executeId);
    if (!props.closeWhenExecuted) return;
    handleClose();
    dropdownWrapperRef.value?.click();
};

onUnmounted(() => {
    unmountPopupAnchor();
});

defineExpose({ open: handleOpen, close: handleClose });
</script>
