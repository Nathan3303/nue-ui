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
        <teleport :disabled="teleportDisabled" :to="teleportTo">
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
import { generateElementId, parseAnimationDurationToNumber, parseTheme } from '@nue-ui/utils';
import { usePopupPoolV2 } from '../popup-pool-v2';
import { usePopper, usePopperController } from '@nue-ui/hooks';
import { throttle } from 'lodash-es';
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
const closing = ref(false);
const visible = ref(false);
const teleportTo = ref('body');
const teleportDisabled = ref(true);
const closeAnimationDuration = ref(0);
const popupPool = usePopupPoolV2();
const { placement, rectInfo, calculatePosition } = usePopper(dropdownWrapperRef, dropdownRef, {
    placement: props.placement
});
const { show, hide } = usePopperController(visible);
const dropdownAnchor = document.createElement('div');
let dropdownTimer: number | null = 0;

dropdownAnchor.classList.add('nue-dropdown-anchor');
dropdownAnchor.id = generateElementId();

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
            if (!popupPool.element) return;
            popupPool.element.appendChild(dropdownAnchor);
            emit('open');
            try {
                teleportTo.value = props.teleportTo || '#' + dropdownAnchor.id;
                teleportDisabled.value = false;
                popupPool.setZIndex();
            } catch (err) {
                console.log('[NueDropdown] Open Error:', err);
            }
        }
    );
    if (!props.transparent) return;
    window.addEventListener('scroll', handleCalculatePosition, true);
    window.addEventListener('resize', handleCalculatePosition, true);
    window.addEventListener('click', handleClose, true);
};

const handleClose = () => {
    hide(
        160,
        async () => {
            closing.value = true;
            await waitForAnimation();
        },
        () => emit('close')
    );
    if (!props.transparent) return;
    window.removeEventListener('scroll', handleCalculatePosition, true);
    window.removeEventListener('resize', handleCalculatePosition, true);
    window.removeEventListener('click', handleClose, true);
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

const handleSwitchByMouseEvent = (e: MouseEvent) => {
    switch (props.dropType) {
        case 'hover':
            switch (e.type) {
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
    if (clickedElement.classList.contains('nue-dropdown')) return;
    if (clickedElement.classList.contains('nue-dropdown-wrapper')) return;
    const executeId = clickedElement.dataset.executeid;
    if (executeId === void 0) return;
    emit('execute', executeId);
    if (!props.closeWhenExecuted) return;
    handleClose();
    dropdownWrapperRef.value?.click();
};

onUnmounted(() => {
    const dropdownAnchorElement = document.getElementById(dropdownAnchor.id);
    if (!dropdownAnchorElement) return;
    dropdownAnchorElement.parentElement?.removeChild(dropdownAnchorElement);
});

defineExpose({ open: handleOpen, close: handleClose });
</script>
