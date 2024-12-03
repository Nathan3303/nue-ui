<template>
    <div :class="classes" :style="style">
        <nue-icon v-if="icon" :name="icon" class="nue-input__icon" />
        <input
            :id="id"
            ref="inputRef"
            :disabled="disabled"
            :maxlength="maxlength"
            :name="name"
            :placeholder="placeholder"
            :readonly="!disabled && readonly"
            :type="isShowPassword ? 'text' : type"
            :value="modelValue"
            class="nue-input__input"
            @blur="emit('blur', $event)"
            @change="emit('change', $event)"
            @compositionend="handleCompositionEnd"
            @compositionstart="handleCompositionStart"
            @input="handleInput($event)"
        />
        <word-counter
            v-if="type !== 'number' && counter !== 'off'"
            :length="textLength"
            :maxlength="parseInt(maxlength || '0')"
            :mode="counter"
        />
        <nue-icon
            v-if="passwordVisible"
            :name="isShowPassword ? 'eye-close' : 'eye'"
            class="nue-input__icon-button"
            @click.stop="() => switchIsShowPassword()"
        />
        <nue-icon
            v-if="clearButtonVisible"
            class="nue-input__icon-button"
            name="clear"
            @click.stop="handleClear"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue';
import { parseTheme, debounce, parseFlex } from '@nue-ui/utils';
import { useBoolState } from '@nue-ui/hooks';
import type { InputPropsType, InputEmitsType } from './types';
import { NueIcon } from '../index';
import WordCounter from './word-counter.vue';
import './input.css';

defineOptions({ name: 'NueInput' });

const emit = defineEmits<InputEmitsType>();
const props = withDefaults(defineProps<InputPropsType>(), {
    type: 'text',
    counter: 'off',
    debounceTime: 0
});

const inputRef = ref<HTMLInputElement>();
const [isShowPassword, switchIsShowPassword] = useBoolState(false);
const isComposing = ref(false);
const textLength = ref(0);

const classes = computed(() => {
    const prefix = 'nue-input';
    const { size, theme, shape, disabled } = props;
    let list: string[] = [];
    list.push(prefix);
    if (size) list.push(`${prefix}--${size}`);
    if (shape) list.push(`${prefix}--${shape}`);
    if (theme) list.push(...parseTheme(theme, prefix));
    if (disabled) list.push(`${prefix}--disabled`);
    return list;
});

const style = computed(() => {
    const { width, size, flex } = props;
    return {
        '--width': width,
        '--font-size': size,
        '--flex': flex ? parseFlex(flex) : undefined
    };
});

const passwordVisible = computed(() => {
    const { type, allowShowPassword, modelValue } = props;
    return type === 'password' && allowShowPassword && modelValue !== '';
});
const clearButtonVisible = computed(() => {
    const { disabled, readonly, clearable, modelValue } = props;
    return !disabled && !readonly && clearable && modelValue !== '';
});

const debounceUpdater = debounce(() => {
    if (!inputRef.value) return;
    emit('update:modelValue', inputRef.value.value);
}, props.debounceTime);

function handleInput(e: Event) {
    if (isComposing.value) return;
    debounceUpdater();
    emit('input', e);
}

function handleCompositionStart() {
    isComposing.value = true;
}

function handleCompositionEnd() {
    isComposing.value = false;
    debounceUpdater();
}

function handleClear() {
    emit('update:modelValue', '');
    nextTick(() => {
        if (!inputRef.value) return;
        inputRef.value.focus();
    });
}

const unWatch = watch(
    () => props.modelValue,
    newValue => {
        textLength.value = (newValue as string).length;
    }
);

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: inputRef });
</script>
