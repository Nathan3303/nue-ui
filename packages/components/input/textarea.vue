<template>
    <div :class="classes" :style="style">
        <textarea
            :id="id"
            ref="textareaRef"
            :disabled="disabled"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :readonly="readonly"
            :rows="rows"
            :value="modelValue"
            class="nue-textarea__textarea"
            @blur="emit('blur', $event)"
            @change="emit('change', $event)"
            @compositionend="handleCompositionEnd"
            @compositionstart="handleCompositionStart"
            @input="handleInput"
        ></textarea>
        <textarea
            v-if="autosize && !props.disabled && !props.readonly"
            ref="backendTextareaRef"
            class="nue-textarea__textarea nue-textarea__backend-textarea"
            readonly
            tabindex="-1"
        ></textarea>
        <word-counter
            v-if="counter !== 'off'"
            :length="textLength"
            :maxlength="parseInt(maxlength || '0')"
            :mode="counter"
        />
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
} from 'vue';
import type { TextareaEmitsType, TextareaPropsType } from './types';
import { debounce, parseTheme } from '@nue-ui/utils';
import wordCounter from './word-counter.vue';
import './textarea.css';

defineOptions({ name: 'NueTextarea' });

const emit = defineEmits<TextareaEmitsType>();
const props = withDefaults(defineProps<TextareaPropsType>(), {
    counter: 'off',
    debounceTime: 0
});

const textareaRef = ref();
const backendTextareaRef = ref();
const textLength = ref((props.modelValue as string).length);
const isComposing = ref(false);

const classes = computed(() => {
    const prefix = 'nue-textarea';
    const { size, theme, shape, disabled, readonly } = props;
    let list: string[] = [];
    list.push(prefix);
    if (size) list.push(`${prefix}--${size}`);
    if (shape) list.push(`${prefix}--${shape}`);
    if (theme) list.push(...parseTheme(theme, prefix));
    if (disabled) list.push(`${prefix}--disabled`);
    if (readonly) list.push(`${prefix}--readonly`);
    return list;
});

const style = computed(() => {
    const { autosize, width, rows, resize, flex, disabled } = props;
    const rowsValue = resize ? 999 : rows === 0 ? 999 : rows;
    return {
        '--rows': rowsValue,
        '--width': width,
        '--resize': resize && !disabled ? 'vertical' : undefined,
        '--flex': flex,
        '--overflow': autosize ? 'hidden' : 'auto'
    };
});

const updateModelValue = debounce(
    value => emit('update:modelValue', value as string),
    props.debounceTime
);

function handleAutosize(textareaValue: string) {
    if (!props.autosize) return;
    backendTextareaRef.value.value = textareaValue;
    nextTick(() => {
        textareaRef.value.style.height =
            backendTextareaRef.value.scrollHeight + 'px';
    });
}

function update() {
    const textareaValue = textareaRef.value.value as string;
    updateModelValue(textareaValue);
    handleAutosize(textareaValue);
}

function handleInput(): void {
    if (isComposing.value) return;
    update();
}

function handleCompositionStart(): void {
    isComposing.value = true;
}

function handleCompositionEnd(): void {
    isComposing.value = false;
    update();
}

const unWatch = watch(
    () => props.modelValue,
    newValue => {
        textLength.value = (newValue as string).length;
        handleAutosize(newValue as string);
    }
);

onMounted(() => handleAutosize(props.modelValue as string));

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: textareaRef, backendTextareaRef, update });
</script>
