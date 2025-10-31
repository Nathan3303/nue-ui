<template>
    <div ref="wrapperRef" :data-visible="visible" class="nue-dropdown-wrapper">
        <slot :trigger="handleSwitchByMouseEvent" :visible="visible" name="trigger">
            <nue-button :disabled="disabled" :size="size" @click="handleSwitchByMouseEvent">
                {{ triggerText || text }}
                <template #append>
                    <nue-icon class="state-icon" name="arrow-down" />
                </template>
            </nue-button>
        </slot>
        <template>
            <teleport :disabled="tpState.disabled" :to="tpState.to">
                <nue-overlay
                    class="nue-dropdown-overlay"
                    :theme="transparent ? 'transparent' : 'no-background'"
                    :visible="visible"
                    @click="handleDropdownClose"
                    @escape="handleDropdownClose"
                >
                    <ul
                        ref="popperRef"
                        :class="classes"
                        :style="styles"
                        :data-direction="placement.direction"
                        :data-visible="visible"
                        @click.stop="handleExecute"
                        @animationstart="handleAnimationStart"
                        @animationend="handleAnimationEnd"
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
import { computed, nextTick, reactive, ref } from 'vue';
import NueButton from '../button/button.vue';
import NueIcon from '../icon/icon.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseTheme } from '@nue-ui/utils';
import { throttle, debounce } from 'lodash-es';
import { usePopupAnchor, usePopperV2 } from '@nue-ui/hooks';
import { register, unregister, closeDropdownsInGroup } from './dropdown-group';
import type { NueDropdownProps, NueDropdownEmits } from './types';
import type { PopperPlacementObject, PopperPosition } from '@nue-ui/hooks/use-popper-v2/types';
import './dropdown.css';

defineOptions({ name: 'NueDropdown' });
const props = withDefaults(defineProps<NueDropdownProps>(), {
    transparent: false,
    disabled: false,
    placement: 'bottom-start',
    dropType: 'click',
    closeWhenExecuted: false
});
const emit = defineEmits<NueDropdownEmits>();

const wrapperRef = ref<HTMLElement>();
const popperRef = ref<HTMLElement>();
const { popupAnchorId, tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const { calculatePopperPosition } = usePopperV2(wrapperRef, popperRef);
const visible = ref(false);
const popperPosition = reactive<PopperPosition>({ x: 0, y: 0 });

// @computed 下拉菜单的类名
const classes = computed(() => {
    const prefix = 'nue-dropdown';
    return [prefix, ...parseTheme(props.theme, prefix), props.size && `${prefix}--${props.size}`];
});

// @computed 下拉菜单的样式
const styles = computed(() => ({
    '--nue-dropdown-x': `${popperPosition.x}px`,
    '--nue-dropdown-y': `${popperPosition.y}px`
}));

// @computed 下拉菜单的位置 - 方向和对齐方式
const placement = computed<PopperPlacementObject>(() => {
    try {
        const [direction, alignment] = props.placement.split('-');
        return { direction, alignment } as PopperPlacementObject;
    } catch (error) {
        console.error(
            '[NueDropdown] Invalid placement value. Please use the format "vertical-horizontal".',
            error
        );
        return { direction: 'bottom', alignment: 'start' } as PopperPlacementObject;
    }
});

// @method 注册下拉菜单到下拉菜单组 - 如果有指定的下拉菜单组
const handleGroupRegistering = () => {
    if (!props.group) return;
    register(props.group, popupAnchorId, handleDropdownClose);
};

// @method 注销下拉菜单从下拉菜单组 - 如果有指定的下拉菜单组
const handleGroupUnregistering = () => {
    if (!props.group) return;
    unregister(props.group, popupAnchorId);
};

// @method 下拉菜单动画开始时的回调
const handleAnimationStart = (e: AnimationEvent) => {
    if (visible.value) {
        emit('beforeOpen');
        console.log('beforeOpen', e);
    } else {
        emit('beforeClose');
        console.log('beforeClose', e);
    }
};

// @method 下拉菜单动画结束时的回调
const handleAnimationEnd = (e: AnimationEvent) => {
    if (visible.value) {
        emit('afterOpen');
        console.log('afterOpen', e);
    } else {
        unmountPopupAnchor();
        emit('afterClose');
        console.log('afterClose', e);
    }
};

// @method 计算下拉菜单的位置 - x, y 坐标
const handleCalculatePopperPosition = throttle(() => {
    const { x, y } = calculatePopperPosition(placement.value.direction, placement.value.alignment);
    popperPosition.x = x;
    popperPosition.y = y;
}, 4);

// @method 打开下拉菜单
const handleDropdownOpen = () => {
    if (visible.value) return;
    visible.value = true;
    mountPopupAnchor();
    nextTick(() => {
        handleCalculatePopperPosition();
        handleGroupRegistering();
        emit('open');
        if (!props.transparent) return;
        window.addEventListener('scroll', handleCalculatePopperPosition, true);
        window.addEventListener('resize', handleCalculatePopperPosition, true);
        window.addEventListener('click', handleDropdownClose, false);
    });
};

// @method 关闭下拉菜单
const handleDropdownClose = () => {
    if (!visible.value) return;
    visible.value = false;
    handleGroupUnregistering();
    emit('close');
    if (!props.transparent) return;
    window.removeEventListener('scroll', handleCalculatePopperPosition, true);
    window.removeEventListener('resize', handleCalculatePopperPosition, true);
    window.removeEventListener('click', handleDropdownClose, false);
};

// @methods 打开和关闭下拉菜单的防抖版本 - 360ms 防抖
const debounceHandleDropdownOpen = debounce(handleDropdownOpen, 360);
const debounceHandleDropdownClose = debounce(handleDropdownClose, 360);

// @method 切换下拉菜单的显示状态 - 鼠标事件
const handleSwitchByMouseEvent = (event: MouseEvent) => {
    event.stopPropagation();
    switch (props.triggerType) {
        case 'hover':
            switch (event.type) {
                case 'mouseenter':
                    debounceHandleDropdownOpen();
                    break;
                case 'mouseleave':
                    debounceHandleDropdownClose();
                    break;
            }
            break;
        case 'click':
        default:
            visible.value ? handleDropdownClose() : handleDropdownOpen();
            break;
    }
};

// @method 执行下拉菜单中的操作 - 触发事件
const handleExecute = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const executeId = clickedElement.dataset.executeid;
    if (executeId === void 0) return;
    emit('execute', executeId);
    if (!props.closeWhenExecuted) return;
    if (props.group) {
        closeDropdownsInGroup(props.group);
    } else {
        handleDropdownClose();
    }
};

// @export 暴露打开和关闭下拉菜单的方法
defineExpose({ open: handleDropdownOpen, close: handleDropdownClose });
</script>
