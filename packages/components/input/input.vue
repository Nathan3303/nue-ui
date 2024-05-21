<template>
    <div :class="classes" :style="style">
        <nue-icon v-if="icon" :name="icon" />
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
        <div class="button-group" v-if="buttonGroupVisible">
            <i
                class="iconfont"
                :class="isShowPassword ? 'icon-eye' : 'icon-eye-off'"
                v-if="passwordVisible"
                @click.stop="() => switchIsShowPassword()"></i>
            <i
                class="iconfont icon-clear"
                v-if="clearButtonVisible"
                @click.stop="handleClear"></i>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount, nextTick } from "vue";
import { parseTheme, debounce, parseFlex } from "@nue-ui/utils";
import { useBoolState } from "@nue-ui/hooks";
import type { InputPropsType, InputEmitsType } from "./types";
import { NueIcon } from "../index";
import WordCounter from "./word-counter.vue";
import "./input.css";

defineOptions({ name: "NueInput" });

const emit = defineEmits<InputEmitsType>();
const props = withDefaults(defineProps<InputPropsType>(), {
    type: "text",
    shape: "square",
    counter: "off",
    debounceTime: 0,
});

const inputRef = ref();
const [isShowPassword, switchIsShowPassword] = useBoolState(false);
const isComposing = ref(false);
const textLength = ref(props.modelValue.toString().length);

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
        "--flex": parseFlex(flex),
    };
});

const passwordVisible = computed(() => {
    const { type, allowShowPassword, modelValue } = props;
    return type === "password" && allowShowPassword && modelValue !== "";
});
const clearButtonVisible = computed(() => {
    const { disabled, readonly, clearable, modelValue } = props;
    return !disabled && !readonly && clearable && modelValue !== "";
});
const buttonGroupVisible = computed(() => {
    return passwordVisible.value || clearButtonVisible.value;
});

const debounceUpdater = debounce(() => {
    emit("update:modelValue", (inputRef.value as HTMLInputElement).value);
}, props.debounceTime);

function handleInput(e: Event) {
    if (isComposing.value) return;
    debounceUpdater();
    emit("input", e);
}

function handleCompositionStart() {
    isComposing.value = true;
}

function handleCompositionEnd() {
    isComposing.value = false;
    debounceUpdater();
}

function handleClear() {
    emit("update:modelValue", "");
    nextTick(() => {
        (inputRef.value as HTMLInputElement).focus();
    });
}

watch(
    () => props.modelValue,
    (newValue) => {
        textLength.value = newValue.toString().length;
    }
);

onBeforeUnmount(() => unWatch());

defineExpose({ innerInputRef: inputRef });
</script>
