<template>
    <nue-div>
        <nue-button @click="showPromptWithBeforeConfirm">
            Open Prompt
        </nue-button>
        <nue-button @click="showPromptWithInitialValue">
            Open Prompt (with initial value)
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage, NueConfirm, NuePrompt } from "nue-ui";

defineOptions({ name: "PromptDemo1" });

function showPromptWithBeforeConfirm() {
    NuePrompt({
        title: "Prompt",
        placeholder: "Input your phone number here...",
        validator: (value: string) => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value);
        },
        beforeConfirm: async (value: unknown) => {
            await NueConfirm({ content: "Are you sure to submit?" });
            return (value as string).toUpperCase();
        },
    }).then(
        (value: unknown) =>
            NueMessage.success(`Your phone number is: ${value as string}`),
        () => NueMessage.warn("Cancelled!")
    );
}

function showPromptWithInitialValue() {
    NuePrompt({
        title: "Prompt",
        placeholder: "Input your name here...",
        inputValue: "John",
        validator: (value: string) => {
            return value.length > 0;
        },
    }).then(
        (value: unknown) =>
            NueMessage.success(`Your name is: ${value as string}`),
        () => NueMessage.warn("Cancelled!")
    );
}
</script>
