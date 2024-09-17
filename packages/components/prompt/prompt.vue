<template>
    <div ref="promptRef" class="nue-prompt">
        <div class="nue-prompt__header">
            <slot name="header">
                <nue-text>{{ title }}</nue-text>
                <nue-button
                    icon="clear"
                    theme="pure"
                    :disabled="loading"
                    @click.stop="handleClose(false)" />
            </slot>
        </div>
        <div class="nue-prompt__content">
            <slot>
                <nue-text v-if="label" class="nue-prompt__label">
                    {{ label }}
                </nue-text>
                <component
                    :is="inputType === 'textarea' ? NueTextarea : NueInput"
                    ref="promptInputRef"
                    v-model="inputValue"
                    :type="inputType"
                    :placeholder="placeholder"
                    :disabled="loading" />
                <nue-text v-if="isInvalid" class="nue-prompt__value-error">
                    {{ invalidMessage }}
                </nue-text>
            </slot>
        </div>
        <div class="nue-prompt__footer">
            <slot name="footer">
                <nue-button
                    :disabled="loading"
                    @click.stop="handleClose(false)">
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button
                    theme="primary"
                    :loading="loading"
                    @click.stop="handleClose(true)">
                    {{ confirmButtonText }}
                </nue-button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import NueButton from "../button/button.vue";
import NueInput from "../input/input.vue";
import NueTextarea from "../input/textarea.vue";
import NueText from "../text/text.vue";
import type { PromptPropsType } from "./types";

defineOptions({ name: "NuePromptNode" });

const props = withDefaults(defineProps<PromptPropsType>(), {
    title: "Prompt",
    placeholder: "Please input",
    inputType: "text",
    inputValue: "",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});

const promptRef = ref<HTMLDivElement>();
const promptInputRef = ref();
const inputValue = ref(props.inputValue);
const isInvalid = ref(false);
const invalidMessage = ref("无效的输入值");
const loading = ref(false);

const handleValidate = async () => {
    const { validator } = props;
    const value = inputValue.value;
    if (!validator) return true;
    try {
        loading.value = true;
        const validateResult = await validator(value);
        if (validateResult) {
            isInvalid.value = false;
            return true;
        }
        throw new Error("无效的输入值");
    } catch (e) {
        isInvalid.value = true;
        if (typeof e === "string") {
            invalidMessage.value = e;
        } else if (e instanceof Error) {
            invalidMessage.value = e.message;
        } else {
            invalidMessage.value = "无效的输入值";
        }
        loading.value = false;
        return false;
    }
};

const handleClose = async (isConfirmed: boolean) => {
    const { close, onConfirm, closeOnError } = props;
    const value = inputValue.value;
    if (!isConfirmed) return close(false, "");
    isInvalid.value = false;
    const isValid = await handleValidate();
    if (!isValid) return;
    if (!onConfirm) return close(true, value);
    try {
        loading.value = true;
        await onConfirm(value);
        close(true, value);
    } catch (e) {
        if (closeOnError) {
            const onConfirmResult =
                e instanceof Error ? e : new Error(e as string);
            close(false, onConfirmResult);
            return;
        }
        isInvalid.value = true;
        invalidMessage.value = typeof e === "string" ? e : "无效的输入值";
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    requestAnimationFrame(() => {
        promptInputRef.value!.innerInputRef.focus();
    });
});

watch(
    () => inputValue.value,
    () => (isInvalid.value = false)
);
</script>
