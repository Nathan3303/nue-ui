<template>
    <nue-div>
        <nue-button @click="showPromptWithBeforeConfirm"
            >Open Prompt</nue-button
        >
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage, NueConfirm, NuePrompt } from "nue-ui";

defineOptions({ name: "PromptDemo1" });

function showPromptWithBeforeConfirm() {
    NuePrompt({
        title: "输入确认",
        placeholder: "请输入内容",
        beforeConfirm: async (value: unknown) => {
            await NueConfirm({ content: "确认提交吗？" });
            return (value as string).toUpperCase();
        },
    }).then(
        (value: unknown) => {
            NueMessage({
                message: `Value is: ${value as string}`,
                type: "success",
            });
        },
        () => NueMessage({ message: "Cancelled!", type: "warning" })
    );
}
</script>
