<template>
    <nue-div wrap>
        <nue-button @click="createMessage"> Basic </nue-button>
        <nue-button @click="createMessageWithIcon"> With icon </nue-button>
        <nue-button @click="createMessageWithDuration">
            With 5 seconds duration
        </nue-button>
        <nue-button @click="createCloseManualMessage">
            With close button (close manually)
        </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage } from "../../../../core";

function createMessage() {
    NueMessage({ message: "This is a message" });
}

function createMessageWithIcon() {
    NueMessage({
        message: "This is a message with icon",
        icon: "icon-checked",
    });
}

function createMessageWithDuration() {
    NueMessage({
        message: "This is a message with 5 seconds duration",
        duration: 5000,
    });
}

function createCloseManualMessage() {
    NueMessage({
        message: "This is a message with close button (close manually)",
        duration: 0,
    });
}
</script>
