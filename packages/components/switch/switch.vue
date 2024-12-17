<template>
    <div ref="switchRef" :class="classes" @click.stop="handleClick">
        <div class="nue-switch__circle">
            <nue-icon
                v-if="loading"
                class="nue-switch__loading-icon"
                name="loading"
                spin
            />
        </div>
        <div v-if="showText" class="nue-switch__text">
            <slot>{{ state ? activeText : inactiveText }}</slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { isFunction } from 'lodash-es';
import { NueIcon } from '../icon';
import type { NueSwitchEmits, NueSwitchProps } from './types';
import './switch.css';

defineOptions({ name: 'NueSwitch' });
const props = withDefaults(defineProps<NueSwitchProps>(), {
    disabled: false,
    showText: false,
    loading: false,
    activeText: 'I',
    inactiveText: 'O'
});
const emit = defineEmits<NueSwitchEmits>();

const state = ref(false);
const switchRef = ref<HTMLDivElement>();

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
    setTimeout(() => {
        if (!switchRef.value) return;
        switchRef.value.style.setProperty(
            '--state-width',
            `${switchRef.value.clientWidth}px`
        );
    });
};

watch(
    () => props.modelValue,
    newValue => (state.value = newValue),
    { immediate: true }
);

watch(
    () => state.value,
    () => handleSetStateWidth()
);
</script>
