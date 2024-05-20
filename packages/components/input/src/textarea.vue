<template>
    <div :class="classes" :style="style">
        <textarea
            ref="textareaRef"
            :id="id"
            :rows="rows"
            :value="modelValue"
            :placeholder="placeholder"
            :readonly="readonly"
            :disabled="disabled"
            :maxlength="maxlength"
            @input="handleInput"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd"></textarea>
        <textarea
            v-if="autosize && !props.disabled && !props.readonly"
            class="backend-textarea"
            ref="backendTextareaRef"
            readonly
            tabindex="-1"></textarea>
        <word-counter
            v-if="counter !== 'off'"
            :mode="counter"
            :length="textLength"
            :maxlength="parseInt(maxlength || '0')" />
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    computed,
    nextTick,
    watch,
    onBeforeUnmount,
    onMounted,
} from "vue";
import { parseTheme, debounce, parseFlex } from "@nue-ui/utils";
import { type ShapeProp, type InputCounterProp } from "@nue-ui/utils/types";
import wordCounter from "./word-counter.vue";
import "../style/textarea.css";

defineOptions({ name: "NueTextarea" });

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        id?: string;
        placeholder?: string;
        theme?: string | string[];
        shape?: ShapeProp;
        disabled?: boolean;
        readonly?: boolean;
        rows?: number;
        resize?: boolean;
        autosize?: boolean | { minRows?: number; maxRows?: number };
        maxlength?: string;
        counter?: InputCounterProp;
        width?: string;
        size?: string;
        debounceTime?: number;
        flex?: string;
    }>(),
    {
        rows: 3,
        theme: "default",
        shape: "square",
        disabled: false,
        readonly: false,
        resize: false,
        autosize: false,
        counter: "off",
        width: "auto",
        size: "16px",
        debounceTime: 0,
        flex: "none",
    }
);

const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref();
const backendTextareaRef = ref();
const textLength = ref((props.modelValue as string).length);
const isComposing = ref(false);

const classes = computed(() => {
    const prefix = "nue-textarea";
    const { theme, shape, disabled, readonly } = props;
    let list = [prefix, ...parseTheme(theme, prefix)];
    list.push(`${prefix}--${shape}`);
    if (disabled) list.push(`${prefix}--disabled`);
    if (readonly) list.push(`${prefix}--readonly`);
    return list;
});

const style = computed(() => {
    const { width, rows, resize, size, flex } = props;
    return {
        // "--overflow": autosize ? "hidden" : "auto",
        "--rows": rows === 0 ? 999 : rows,
        "--textarea-width": width === "auto" ? undefined : width,
        "--resize": resize ? "vertical" : undefined,
        "--font-size": size === "16px" ? undefined : size,
        "--flex": flex === "none" ? undefined : parseFlex(flex),
    };
});

const updateModelValue = debounce(
    (value: string | number) => emit("update:modelValue", value),
    props.debounceTime
);

function handleAutosize(textareaValue: string) {
    if (!props.autosize) return;
    console.log("autosize", textareaValue);
    backendTextareaRef.value.value = textareaValue;
    nextTick(() => {
        textareaRef.value.style.height =
            backendTextareaRef.value.scrollHeight + "px";
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
    (newValue) => {
        textLength.value = (newValue as string).length;
        handleAutosize(newValue as string);
    }
);

onMounted(() => handleAutosize(props.modelValue as string));

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: textareaRef, backendTextareaRef, update });
</script>
