<template>
    <div :class="classes" :style="style">
        <slot name="prefix" :length="textLength" :maxlength="maxlengthInt" :clear="handleClear" />
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
        <nue-div v-if="counter !== 'off' || $slots.actions" class="nue-textarea__actions-bar">
            <nue-div class="nue-textarea__actions">
                <slot
                    name="actions"
                    :length="textLength"
                    :maxlength="maxlengthInt"
                    :clear="handleClear"
                />
            </nue-div>
            <word-counter
                v-if="counter !== 'off'"
                :length="textLength"
                :maxlength="maxlengthInt"
                :mode="counter"
            />
        </nue-div>
        <slot name="suffix" :length="textLength" :maxlength="maxlengthInt" :clear="handleClear" />
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { debounce, parseTheme } from '@nue-ui/utils';
import wordCounter from './word-counter.vue';
import { NueDiv } from '../div';
import type { NueTextareaProps, NueTextareaEmits } from './types';

defineOptions({ name: 'NueTextarea' });
const props = withDefaults(defineProps<NueTextareaProps>(), {
    counter: 'off',
    debounceTime: 0,
    placeholder: '...'
});
const emit = defineEmits<NueTextareaEmits>();

const textareaRef = ref();
const backendTextareaRef = ref();
const textLength = ref(props.modelValue?.length || 0);
const isComposing = ref(false);

const maxlengthInt = computed(() => {
    const i = parseInt(props.maxlength || '0');
    return i < 0 ? 0 : i;
});

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
    const rowsData = { minRows: 3, maxRows: 3 };
    if (!autosize) {
        rowsData.minRows = rows || 3;
        rowsData.maxRows = rows || 3;
    } else if (typeof autosize === 'boolean') {
        rowsData.minRows = 1;
        rowsData.maxRows = rows || Infinity;
    } else {
        rowsData.minRows = autosize.minRows;
        rowsData.maxRows = autosize.maxRows;
    }
    return {
        '--nue-textarea-rows': rowsData.minRows,
        '--nue-textarea-max-rows': rowsData.maxRows
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

const handleClear = () => {
    updateModelValue('');
    textLength.value = 0;
    handleAutosize('');
    nextTick(() => {
        if (!textareaRef.value) return;
        textareaRef.value.focus();
    });
};

const unWatch = watch(
    () => props.modelValue,
    newValue => {
        textLength.value = newValue?.length || 0;
        handleAutosize(newValue as string);
    }
);

onMounted(() => handleAutosize(props.modelValue as string));

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: textareaRef, backendTextareaRef, update });
</script>