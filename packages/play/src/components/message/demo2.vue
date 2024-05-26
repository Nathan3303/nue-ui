<template>
    <nue-div wrap>
        <nue-button @click="createSuccessMessage"> Success </nue-button>
        <nue-button @click="createErrorMessage"> Error </nue-button>
        <nue-button @click="createWarningMessage"> Warning </nue-button>
        <nue-button @click="createInfoMessage"> Info </nue-button>
        <nue-button @click="createLogMessage"> log </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage } from "../../../../core";

function createSuccessMessage() {
    NueMessage.success("This is a success message.");
}

function createErrorMessage() {
    NueMessage.error("This is an error message.");
}

function createWarningMessage() {
    NueMessage.warn("This is a warning message.");
}

function createInfoMessage() {
    NueMessage.info("This is an info message.");
}

function createLogMessage() {
    NueMessage.log("This is a log message.");
}
</script>
