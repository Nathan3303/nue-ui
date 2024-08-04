<template>
    <nue-button @click="showConfirm">Open confirm</nue-button>
</template>

<script setup>
import { NueConfirm, NueMessage } from "nue-ui";

const showConfirm = () => {
    const confirmOptions = { content: "Would you like to continue?" };
    NueConfirm(confirmOptions).then(
        () => NueMessage.success("Confirmed"),
        () => NueMessage.info("Canceled")
    );
};
</script>
