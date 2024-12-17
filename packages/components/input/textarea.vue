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
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.size && `${prefix}--${props.size}`,
        props.shape && `${prefix}--${props.shape}`,
        props.disabled && `${prefix}--disabled`,
        props.readonly && `${prefix}--readonly`
    ];
});

const style = computed(() => {
    return {
        '--rows': props.resize ? 999 : props.rows === 0 ? 999 : props.rows,
        '--resize': props.resize && !props.disabled ? 'vertical' : void 0,
        '--nue-textarea-overflow': props.autosize ? 'hidden' : 'auto'
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
