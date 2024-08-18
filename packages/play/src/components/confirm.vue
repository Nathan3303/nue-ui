<template>
    <nue-div>
        <nue-button @click="openConfirm">Open Confirm</nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueConfirm, NueMessage } from "nue-ui";

function openConfirm() {
    NueConfirm({
        title: "Confirm",
        content: "Are you sure to delete this item?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
    }).then(
        () => NueMessage.success("Confirmed!"),
        () => NueMessage.info("Canceled!")
    );
}
</script>

<style scoped></style>
