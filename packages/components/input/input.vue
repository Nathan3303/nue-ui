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
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { debounce, parseFlex, parseTheme } from '@nue-ui/utils';
import { useBoolState } from '@nue-ui/hooks';
import NueIcon from '../icon/icon.vue';
import WordCounter from './word-counter.vue';
import type { InputEmitsType, InputPropsType } from './types';
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
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.size && `${prefix}--${props.size}`,
        props.shape && `${prefix}--${props.shape}`,
        props.disabled && `${prefix}--disabled`
    ];
});

const style = computed(() => {
    return {
        '--nue-input-width': props.width,
        '--flex': props.flex ? parseFlex(props.flex as string) : undefined
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
