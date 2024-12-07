<template>
    <div
        ref="dropdownWrapperRef"
        :data-visible="visible"
        class="nue-dropdown-wrapper"
    >
        <slot :clickTrigger="handleClickWrapper">
            <nue-button
                :disabled="disabled"
                :size="size"
                @click.stop="handleClickWrapper"
            >
                {{ triggerText || text }}
                <template #append>
                    <nue-icon class="state-icon" name="arrow-down" />
                </template>
            </nue-button>
        </slot>
        <teleport to="#NueDropdownPool">
            <template v-if="keepAlive || visible">
                <ul
                    v-show="visible"
                    ref="dropdownRef"
                    :class="dropdownClasses"
                    :data-direction="placementInfo.direction"
                    :style="dropdownStyles"
                    @click.stop="handleExecute"
                >
                    <slot name="dropdown">
                        <span class="nue-dropdown__empty-text">
                            No options.
                        </span>
                    </slot>
                </ul>
            </template>
        </teleport>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { useDropdownPool } from './use-dropdown-pool';
import { usePopper, usePopperController } from '@nue-ui/hooks';
import { parseTheme } from '@nue-ui/utils';
import { NueButton, NueIcon } from '..';
import type { NueDropdownEmits, NueDropdownProps } from './types';
import './dropdown.css';

defineOptions({ name: 'NueDropdown' });
const props = withDefaults(defineProps<NueDropdownProps>(), {
    disabled: false,
    placement: 'bottom-start',
    dropType: 'click',
    hideOnClick: false,
    hideOnClicked: false,
    keepAlive: false
});
const emit = defineEmits<NueDropdownEmits>();

const visible = ref(false);
const dropdownWrapperRef = ref<HTMLDivElement>();
const dropdownRef = ref<HTMLDivElement>();

const { activePool, deactivePool } = useDropdownPool();
const { placement, rectInfo, calculatePosition } = usePopper(
    dropdownWrapperRef,
    dropdownRef,
    {
        placement: props.placement
    }
);
const { show, hide } = usePopperController(visible);

const dropdownClasses = computed(() => {
    const { theme, size } = props;
    const prefix = 'nue-dropdown';
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size) list.push(`${prefix}--${size}`);
    if (placement.value) list.push(`${prefix}--${placement.value}`);
    return list;
});

const dropdownStyles = computed(() => {
    const { wrapperWidth } = rectInfo;
    return {
        '--dropdown-wrapper-width': `${wrapperWidth}px`
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
    show(
        () => {
            if (!visible.value) {
                document.body.click();
            }
        },
        () => {
            calculatePosition(props.placement);
            activePool();
            window.addEventListener('click', handleHide);
            window.addEventListener('wheel', handleHide);
        }
    );
};

const handleHide = () => {
    const { keepAlive } = props;
    hide(
        160,
        () => {
            if (!dropdownRef.value) return;
            dropdownRef.value.classList.add('nue-dropdown--hiding');
        },
        () => {
            deactivePool();
            if (keepAlive && dropdownRef.value) {
                dropdownRef.value.classList.remove('nue-dropdown--hiding');
            }
            window.removeEventListener('click', handleHide);
            window.removeEventListener('wheel', handleHide);
        }
    );
};

const handleClickWrapper = (e: MouseEvent) => {
    e.stopPropagation();
    if (visible.value) {
        handleHide();
    } else {
        handleShow();
    }
};

const handleExecute = (event: MouseEvent) => {
    event.stopPropagation();
    const clicked = event.target as HTMLElement;
    const executeId = clicked.dataset.executeid;
    // console.log(executeId);
    if (executeId) emit('execute', executeId);
    if (props.hideOnClicked || props.hideOnClick) {
        handleHide();
    } else {
        nextTick(() => {
            handleShow();
        });
    }
};
</script>
