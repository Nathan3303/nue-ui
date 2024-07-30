<template>
    <nue-div wrap>
        <nue-button theme="small" @click="createMessage"> Basic </nue-button>
        <nue-button theme="small" @click="createMessageWithIcon">
            With icon
        </nue-button>
        <nue-button theme="small" @click="createMessageWithDuration">
            With 5 seconds duration
        </nue-button>
        <nue-button theme="small" @click="createCloseManualMessage">
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
        icon: "success",
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
