<template>
    <div :class="classes" :style="style">
        <i v-if="icon" class="iconfont" :class="icon"></i>
        <slot name="prefix">{{ prefix }}</slot>
        <input
            ref="inputRef"
            :id="id"
            :type="isShowPassword ? 'text' : type"
            :value="modelValue"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :disabled="disabled"
            :readonly="!disabled && readonly"
            @input="handleInput($event)"
            @blur="emit('blur', $event)"
            @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd" />
        <slot name="suffix">{{ suffix }}</slot>
        <word-counter
            v-if="type !== 'number' && counter !== 'off'"
            :mode="counter"
            :length="textLength"
            :maxlength="parseInt(maxlength || '0')" />
        <div class="button-group" v-if="btnGroupVIF.isShowBtnGroup">
            <i
                class="iconfont"
                :class="isShowPassword ? 'icon-eye' : 'icon-eye-off'"
                v-if="btnGroupVIF.isShowPasswordShower"
                v-show="modelValue"
                @click.stop="() => switchIsShowPassword()"></i>
            <i
                class="iconfont icon-clear"
                v-if="btnGroupVIF.isShowClearableBtn"
                v-show="modelValue"
                @click.stop="handleClear"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from "vue";
import { parseTheme, debounce } from "@nue-ui/utils";
import { useBoolState } from "@nue-ui/hooks";
import {
    type InputTypeProp,
    type InputCounterProp,
    type ShapeProp,
} from "@nue-ui/utils/types";
import WordCounter from "./word-counter.vue";
import "../style/input.css";

defineOptions({
    name: "NueInput",
});

const props = withDefaults(
    defineProps<{
        type?: InputTypeProp;
        modelValue: string | number;
        id?: string;
        theme?: string | string[];
        shape?: ShapeProp;
        icon?: string;
        prefix?: string;
        suffix?: string;
        placeholder?: string;
        maxlength?: string;
        disabled?: boolean;
        readonly?: boolean;
        clearable?: boolean;
        allowShowPassword?: boolean;
        counter?: InputCounterProp;
        width?: string;
        size?: string;
        debounceTime?: number;
        flex?: string;
    }>(),
    {
        type: "text",
        theme: "default",
        shape: "square",
        clearable: true,
        allowShowPassword: true,
        counter: "off",
        width: "auto",
        size: "16px",
        debounceTime: 0,
    }
);

const emit = defineEmits(["update:modelValue", "input", "blur"]);

const inputRef = ref();
const [isShowPassword, switchIsShowPassword] = useBoolState(false);
const isComposing = ref(false);

const classes = computed(() => {
    const prefix = "nue-input";
    let list: string[] = [prefix, ...parseTheme(props.theme, prefix)];
    list.push(`${prefix}--${props.shape}`);
    if (props.disabled) list.push(`${prefix}--disabled`);
    return list;
});

const style = computed(() => {
    const { width, size, flex } = props;
    return {
        "--width": width,
        "--font-size": size,
        "--flex": flex === "" ? "1" : flex,
    };
});

const btnGroupVIF = computed(() => {
    const isShowPasswordShower =
        props.type === "password" && props.allowShowPassword;
    const isShowClearableBtn =
        !props.disabled &&
        !props.readonly &&
        props.clearable &&
        props.modelValue !== "";
    const isShowBtnGroup = isShowPasswordShower || isShowClearableBtn;
    return {
        isShowPasswordShower,
        isShowClearableBtn,
        isShowBtnGroup,
    };
});

const debouncedUMV = debounce(() => {
    emit("update:modelValue", (inputRef.value as HTMLInputElement).value);
}, props.debounceTime);

function handleInput(e: Event) {
    if (isComposing.value) return;
    debouncedUMV();
    emit("input", e);
}

function handleCompositionStart() {
    isComposing.value = true;
}

function handleCompositionEnd() {
    isComposing.value = false;
    debouncedUMV();
}

function handleClear() {
    emit("update:modelValue", "");
    nextTick(() => {
        (inputRef.value as HTMLInputElement).focus();
    });
}

const textLength = ref(props.modelValue.toString().length);
const unWatch = watch(
    () => props.modelValue,
    (newValue) => {
        textLength.value = newValue.toString().length;
        // console.log(newValue);
    }
);
onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: inputRef });
</script>
