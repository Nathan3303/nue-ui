<template>
    <nue-button @click="showConfirm">Option confirm with title</nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from "nue-ui";

const showConfirm = () => {
    const confirmOptions = {
        content: "Would you like to delete this item?",
        title: "Delete confirmation",
    };
    NueConfirm(confirmOptions).then(
        () => NueMessage.success("Confirmed"),
        () => NueMessage.info("Canceled")
    );
}
</script>
