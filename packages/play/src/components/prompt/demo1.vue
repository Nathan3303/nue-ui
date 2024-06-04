<template>
    <nue-div>
        <nue-button @click="showPromptWithBeforeConfirm">
            Open Prompt
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage, NueConfirm, NuePrompt } from "../../../../core/index.ts";

defineOptions({ name: "PromptDemo1" });

function showPromptWithBeforeConfirm() {
    NuePrompt({
        title: "输入确认",
        placeholder: "请输入手机号码",
        validator: (value: string) => {
            const regExp = new RegExp(/^(?:(?:\+|00)86)?1[3456789]\d{9}$/);
            return regExp.test(value);
        },
        beforeConfirm: async (value: unknown) => {
            await NueConfirm({ content: "确认提交吗？" });
            return (value as string).toUpperCase();
        },
    }).then(
        (value: unknown) => NueMessage.success(`Value is: ${value as string}`),
        () => NueMessage.warn("Cancelled!")
    );
}
</script>
