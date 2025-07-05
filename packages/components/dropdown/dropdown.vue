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
                        :data-direction="relativePosition.direction"
                        :style="styles"
                        @click.stop="handleExecute"
                    >
                        <slot>
                            <span class="nue-dropdown__empty-text">No options.</span>
                        </slot>
                    </ul>
                </nue-overlay>
            </teleport>
        </template>
    </div>
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
import { register, unregister, closeDropdownsInGroup } from './dropdown-group';
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

const dropdownRef = ref<HTMLDivElement>();
const dropdownWrapperRef = ref<HTMLDivElement>();
const { popupAnchorId, tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const { relativePosition, rectInfo, calculatePosition } = usePopper(
    dropdownWrapperRef,
    dropdownRef
);
const visible = ref(false);
const { show, hide } = usePopperController(visible);
const closing = ref(false);
const closeAnimationDuration = ref(0);
let dropdownTimer: number | null = 0;

const classes = computed(() => {
    const prefix = 'nue-dropdown';
    return [prefix, ...parseTheme(props.theme, prefix), props.size && `${prefix}--${props.size}`];
});

const styles = computed(() => {
    return {
        '--dropdown-wrapper-width': `${rectInfo.wrapperW.toFixed(2)}px`
    };
});

const handleCalculatePosition = throttle(() => calculatePosition(props.placement), 4);

const handleGroupRegistering = () => {
    if (!props.group) return;
    register(props.group, popupAnchorId, handleClose);
};

const handleGroupUnregistering = () => {
    if (!props.group) return;
    unregister(props.group, popupAnchorId);
};

const waitForAnimation = () => {
    const timeout = parseAnimationDurationToNumber(
        closeAnimationDuration.value ||
            window.getComputedStyle(dropdownRef.value!).animationDuration
    );
    return new Promise(resolve => {
        setTimeout(() => resolve(1), timeout);
    });
};

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
            handleGroupRegistering();
        }
    );
    if (!props.transparent) return;
    window.addEventListener('scroll', handleCalculatePosition, true);
    window.addEventListener('resize', handleCalculatePosition, true);
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
            handleGroupUnregistering();
            emit('close');
        }
    );
    if (!props.transparent) return;
    window.removeEventListener('scroll', handleCalculatePosition, true);
    window.removeEventListener('resize', handleCalculatePosition, true);
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
    if (props.group) {
        closeDropdownsInGroup(props.group);
    } else {
        handleClose();
    }
};

onUnmounted(() => unmountPopupAnchor());

defineExpose({ open: handleOpen, close: handleClose });
</script>
