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
        />
        <textarea
            v-if="autosize && !props.disabled && !props.readonly"
            ref="backendTextareaRef"
            class="nue-textarea__textarea nue-textarea__backend-textarea"
            readonly
            tabindex="-1"
        />
        <word-counter
            v-if="counter !== 'off'"
            :length="textLength"
            :maxlength="parseInt(maxlength || '0')"
            :mode="counter"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { debounce, parseTheme } from '@nue-ui/utils';
import wordCounter from './word-counter.vue';
import type { NueTextareaProps, NueTextareaEmits } from './types';
import './textarea.css';

defineOptions({ name: 'NueTextarea' });
const props = withDefaults(defineProps<NueTextareaProps>(), {
    counter: 'off',
    debounceTime: 0
});
const emit = defineEmits<NueTextareaEmits>();

const textareaRef = ref();
const backendTextareaRef = ref();
const textLength = ref(props.modelValue?.length || 0);
const isComposing = ref(false);

const classes = computed(() => {
    const prefix = 'nue-textarea';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.size && `${prefix}--${props.size}`,
        props.shape && `${prefix}--${props.shape}`,
        props.disabled && `${prefix}--disabled`,
        props.readonly && `${prefix}--readonly`,
        props.resize && `${prefix}--resize`
    ];
});

const rowsStyle = computed(() => {
    const { autosize, rows } = props;
    if (!autosize) return {};
    if (typeof autosize === 'boolean') {
        return {
            '--nue-textarea-rows': 1,
            '--nue-textarea-max-rows': rows || 3
        };
    }
    return {
        '--nue-textarea-rows': autosize.minRows,
        '--nue-textarea-max-rows': autosize.maxRows
    };
});

const style = computed(() => {
    return {
        '--nue-textarea-resize': props.resize && !props.disabled ? 'both' : void 0,
        ...rowsStyle.value
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
        textareaRef.value.style.height = backendTextareaRef.value.scrollHeight + 'px';
    });
}

function update() {
    if (!textareaRef.value) return;
    const textareaValue = textareaRef.value.value;
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
        if (!newValue) return;
        textLength.value = newValue.length;
        handleAutosize(newValue as string);
    }
);

onMounted(() => handleAutosize(props.modelValue as string));

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: textareaRef, backendTextareaRef, update });
</script>
