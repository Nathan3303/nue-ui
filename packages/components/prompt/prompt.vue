<template>
    <div ref="promptRef" class="nue-prompt">
        <div class="nue-prompt__header">
            <slot name="header">
                <text>{{ title }}</text>
                <nue-button
                    icon="clear"
                    theme="icon-only"
                    @click.stop="handleClose()" />
            </slot>
        </div>
        <div class="nue-prompt__content">
            <slot>
                <p v-if="label" class="nue-prompt__label">{{ label }}</p>
                <component
                    :is="inputType === 'textarea' ? NueTextarea : NueInput"
                    ref="promptInputRef"
                    v-model="inputValue"
                    :type="inputType"
                    :placeholder="placeholder" />
                <p v-if="inputValueError" class="nue-prompt__value-error">
                    Invalid value.
                </p>
            </slot>
        </div>
        <div class="nue-prompt__footer">
            <slot name="footer">
                <nue-button
                    class="nue-prompt__cancel-btn"
                    @click.stop="handleClose()">
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button
                    class="nue-prompt__confirm-btn"
                    @click.stop="handleClose(true)">
                    {{ confirmButtonText }}
                </nue-button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { NueButton, NueInput, NueTextarea } from "../index";
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

function handleClose(isPositive: boolean = false) {
    if (isPositive) {
        if (props.validator) {
            const validateResult = props.validator(inputValue.value);
            inputValueError.value = !validateResult;
            if (!validateResult) return;
        }
        if (props.beforeConfirm) {
            const beforeConfirmResult = props.beforeConfirm(inputValue.value);
            if (beforeConfirmResult instanceof Promise) {
                beforeConfirmResult
                    .then((value) => {
                        const _value = value || inputValue.value;
                        props.callback(isPositive, _value);
                    })
                    .catch((err) => console.log(err));
                return;
            } else {
                if (beforeConfirmResult) {
                    props.callback(isPositive, inputValue.value);
                }
            }
        }
    }
    props.callback(isPositive, inputValue.value);
}

onMounted(() => {
    requestAnimationFrame(() => {
        promptInputRef.value!.innerInputRef.focus();

        requestAnimationFrame(() => {
            promptRef.value!.style.marginTop = "0px";
            promptRef.value!.style.opacity = "1";
        });
    });
});

watch(
    () => inputValue.value,
    () => (inputValueError.value = false)
);
</script>
