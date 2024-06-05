<template>
    <div ref="promptRef" class="nue-prompt">
        <div class="nue-prompt__header">
            <slot name="header">
                <nue-text>{{ title }}</nue-text>
                <nue-button
                    icon="clear"
                    theme="pure"
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
                    :placeholder="placeholder" />
                <nue-text
                    v-if="inputValueError"
                    class="nue-prompt__value-error">
                    Invalid value.
                </nue-text>
            </slot>
        </div>
        <div class="nue-prompt__footer">
            <slot name="footer">
                <nue-button @click.stop="handleClose(false)">
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button theme="primary" @click.stop="handleClose(true)">
                    {{ confirmButtonText }}
                </nue-button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { NueButton, NueInput, NueTextarea, NueText } from "../index";
import type { PromptPropsType } from "./types";

defineOptions({ name: "NuePromptNode" });

const props = withDefaults(defineProps<PromptPropsType>(), {
    title: "Prompt",
    placeholder: "Please input",
    inputType: "text",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
});

const promptRef = ref<HTMLDivElement>();
const promptInputRef = ref();
const inputValue = ref("");
const inputValueError = ref(false);

function handleClose(isConfirmed: boolean) {
    const { close, validator, beforeConfirm } = props;
    if (isConfirmed) {
        if (validator) {
            const validateResult = validator(inputValue.value);
            inputValueError.value = !validateResult;
            if (!validateResult) return;
        }
        if (beforeConfirm) {
            const beforeConfirmResult = beforeConfirm(inputValue.value);
            if (beforeConfirmResult instanceof Promise) {
                beforeConfirmResult
                    .then((value) => {
                        const _value = value || inputValue.value;
                        close(isConfirmed, _value);
                    })
                    .catch((err) => console.log(err));
                return;
            } else {
                if (beforeConfirmResult) {
                    close(isConfirmed, inputValue.value);
                }
            }
        }
    }
    close(isConfirmed, inputValue.value);
}

onMounted(() => {
    requestAnimationFrame(() => {
        promptInputRef.value!.innerInputRef.focus();
    });
});

watch(
    () => inputValue.value,
    () => (inputValueError.value = false)
);
</script>
