<template>
    <div ref="switchRef" :class="classes" @click.stop="handleClick">
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
        <div v-if="showText || $slots.text" class="nue-switch__text">
            <slot name="text">{{ text }}</slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
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

const handleClick = async () => {
    const { loading, disabled, beforeSwitch } = props;
    if (loading || disabled) return;
    if (isFunction(beforeSwitch)) {
        try {
            const result = await beforeSwitch(state.value);
            if (!result) return;
        } catch (error) {
            return error;
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