<template>
    <div
        ref="switchRef"
        :aria-checked="state"
        :aria-disabled="disabled || undefined"
        :class="classes"
        :tabindex="disabled ? -1 : 0"
        role="switch"
        @click.stop="handleClick"
        @keydown.enter="handleClick"
        @keydown.space.prevent="handleClick"
    >
        <div class="nue-switch__circle">
            <slot name="circle" :loading="loading">
                <nue-icon
                    v-if="iconName"
                    class="nue-switch__loading-icon"
                    :name="iconName"
                    :spin="loading"
                />
            </slot>
        </div>
        <div
            v-if="!isEmptySlot($slots.text) || showText || !isEmptySlot($slots.default)"
            class="nue-switch__text"
        >
            <slot v-if="!isEmptySlot($slots.text)" name="text" />
            <template v-else-if="showText">{{ text }}</template>
            <slot v-else />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch, Comment, Text } from 'vue';
import type { VNode } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { isFunction } from 'lodash-es';
import { NueIcon } from '../icon';
import type { NueSwitchEmits, NueSwitchProps } from './types';

defineOptions({ name: 'NueSwitch' });
const props = withDefaults(defineProps<NueSwitchProps>(), {
    disabled: false,
    showText: false,
    loading: false,
    loadingIcon: 'loading',
    activeText: 'I',
    inactiveText: 'O'
});
const emit = defineEmits<NueSwitchEmits>();

const state = ref(false);
const switchRef = ref<HTMLDivElement>();

const iconName = computed(() => {
    const { icon, loadingIcon, loading } = props;
    return loading ? loadingIcon : icon;
});

const classes = computed(() => {
    const prefix = 'nue-switch';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        state.value && `${prefix}--actived`,
        props.size && `${prefix}--${props.size}`,
        props.disabled && `${prefix}--disabled`
    ];
});

const text = computed(() => {
    return state.value ? props.activeText : props.inactiveText;
});

// 插槽是否「空」：未传、空数组、仅注释占位（v-if 落空）、仅空白文本都算空，避免留下空文案占位
const isEmptySlot = (slot?: () => VNode[]): boolean => {
    if (!slot) return true;
    const vnodes = slot();
    if (vnodes.length === 0) return true;
    return vnodes.every(vnode => {
        if (vnode.type === Comment) return true;
        if (vnode.type === Text) return String(vnode.children ?? '').trim() === '';
        return false;
    });
};

const handleClick = async () => {
    const { loading, disabled, beforeSwitch } = props;
    if (loading || disabled) return;
    if (isFunction(beforeSwitch)) {
        try {
            const result = await beforeSwitch(state.value);
            if (!result) return;
        } catch {
            return;
        }
    }
    handleSwitch();
};

const handleSwitch = () => {
    state.value = !state.value;
    emit('update:modelValue', state.value);
    emit('change', state.value);
};

const handleSetStateWidth = () => {
    nextTick(() => {
        if (!switchRef.value) return;
        const width = switchRef.value.clientWidth;
        if (width <= 0) return;
        switchRef.value.style.setProperty('--nue-switch-state-width', `${width}px`);
    });
};

watch(
    () => props.modelValue,
    newValue => (state.value = newValue),
    { immediate: true }
);

watch(
    () => state.value,
    () => handleSetStateWidth(),
    { immediate: true }
);
</script>