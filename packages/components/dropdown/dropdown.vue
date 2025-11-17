<template>
    <div
        ref="wrapperRef"
        class="nue-dropdown-wrapper"
        :data-visible="visible"
        :data-direction="realDirection"
    >
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
                        :data-direction="realDirection"
                        :data-visible="visible"
                        @click.stop="handleExecute"
                        @animationstart="handleAnimationStart"
                        @animationend="handleAnimationEnd"
                    >
                        <slot>
                            <span class="nue-dropdown__empty-text">无选项</span>
                        </slot>
                    </ul>
                </nue-overlay>
            </teleport>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, ref, onMounted, onUnmounted } from 'vue';
import NueButton from '../button/button.vue';
import NueIcon from '../icon/icon.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseTheme } from '@nue-ui/utils';
import { throttle, debounce } from 'lodash-es';
import { usePopupAnchor, usePopperV2 } from '@nue-ui/hooks';
import { register, unregister, closeDropdownsInGroup } from './dropdown-group';
import type {
    NueDropdownProps,
    NueDropdownEmits,
    NueDropdownItemProps,
    NueDropdownContext
} from './types';
import type { PopperPlacementObject, PopperPosition } from '@nue-ui/hooks/use-popper-v2/types';

defineOptions({ name: 'NueDropdown' });
const props = withDefaults(defineProps<NueDropdownProps>(), {
    placement: 'bottom-start',
    dropType: 'click'
});
const emit = defineEmits<NueDropdownEmits>();

const wrapperRef = ref<HTMLElement>();
const popperRef = ref<HTMLElement>();
const { popupAnchorId, tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const { calculatePopperPosition } = usePopperV2(wrapperRef, popperRef);
const visible = ref(false);
const realDirection = ref('bottom');
const popperPosition = reactive<PopperPosition>({ x: 0, y: 0 });
let dropdownResizeObserver: ResizeObserver | null = null;

// @computed 下拉菜单的类名
const classes = computed(() => {
    const prefix = 'nue-dropdown';
    return [prefix, ...parseTheme(props.theme, prefix), props.size && `${prefix}--${props.size}`];
});

// @computed 下拉菜单的样式
const styles = computed(() => ({
    '--nue-dropdown-x': `${popperPosition.x.toFixed(0)}px`,
    '--nue-dropdown-y': `${popperPosition.y.toFixed(0)}px`
}));

// @method 下拉菜单的位置 - 方向和对齐方式
const getPlacementObject = (): PopperPlacementObject => {
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
};

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
const handleAnimationStart = () => {
    if (visible.value) {
        emit('beforeOpen');
        return;
    }
    emit('beforeClose');
};

// @method 下拉菜单动画结束时的回调
const handleAnimationEnd = () => {
    if (visible.value) {
        emit('afterOpen');
        return;
    }
    unmountPopupAnchor();
    emit('afterClose');
};

// @method 计算下拉菜单的位置 - x, y 坐标
const handleCalculatePopperPosition = throttle(() => {
    if (!visible.value) return;
    const { direction, alignment } = getPlacementObject();
    realDirection.value = direction;
    const { x, y, direction: newDirection } = calculatePopperPosition(direction, alignment);
    // 处理浏览器不支持 requestAnimationFrame 的情况
    if (window.requestAnimationFrame) {
        // 浏览器支持 requestAnimationFrame 时，使用它来更新位置
        window.requestAnimationFrame(() => {
            popperPosition.x = x;
            popperPosition.y = y;
        });
    } else {
        // 浏览器不支持 requestAnimationFrame 时，直接更新位置
        popperPosition.x = x;
        popperPosition.y = y;
    }
    if (!newDirection) return;
    realDirection.value = newDirection;
}, 8);

// @method ResizeObserver 处理函数
const resizeObserverHandler = () => {
    handleCalculatePopperPosition();
};

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
        // window.addEventListener('resize', handleCalculatePopperPosition, true);
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
    // window.removeEventListener('resize', handleCalculatePopperPosition, true);
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

// @method 执行下拉菜单中的操作 - 点击事件触发
const handleExecute = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    const executeId = clickedElement.dataset.executeid;
    if (executeId === void 0) return;
    emit('execute', executeId);
    if (!props.closeWhenExecuted) return;
    if (props.group) {
        closeDropdownsInGroup(props.group);
        return;
    }
    handleDropdownClose();
};

// @method 执行下拉菜单中的操作 - 上下文触发
const handleExecuteByContext = (
    executeId: NueDropdownItemProps['executeId'],
    closeWhenExecuted: boolean
) => {
    if (executeId === void 0) return;
    emit('execute', executeId);
    const isCloseWhenExecuted = props.closeWhenExecuted ? true : closeWhenExecuted;
    if (!isCloseWhenExecuted) return;
    if (props.group) {
        closeDropdownsInGroup(props.group);
        return;
    }
    handleDropdownClose();
};

// @onmounted 初始化 ResizeObserver
onMounted(() => {
    if (!wrapperRef.value || !props.transparent) return;
    // 初始化 ResizeObserver
    dropdownResizeObserver = new ResizeObserver(resizeObserverHandler);
    // 监听下拉菜单容器的变化
    dropdownResizeObserver.observe(wrapperRef.value);
    dropdownResizeObserver.observe(document.documentElement);
});

// @onunmounted 取消监听 ResizeObserver
onUnmounted(() => {
    if (!wrapperRef.value || !props.transparent || !dropdownResizeObserver) return;
    dropdownResizeObserver.disconnect();
});

// @provide 为 dropdownItem 等子组件提供上下文
provide<NueDropdownContext>('NueDropdownContext', { execute: handleExecuteByContext });

// @export 暴露打开和关闭下拉菜单的方法
defineExpose({ open: handleDropdownOpen, close: handleDropdownClose });
</script>
