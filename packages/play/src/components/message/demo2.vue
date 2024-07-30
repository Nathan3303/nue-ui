<template>
    <nue-div wrap>
        <nue-button theme="small" @click="createSuccessMessage">
            Success type
        </nue-button>
        <nue-button theme="small" @click="createErrorMessage">
            Error type
        </nue-button>
        <nue-button theme="small" @click="createWarningMessage">
            Warning type
        </nue-button>
        <nue-button theme="small" @click="createInfoMessage">
            Info type
        </nue-button>
        <nue-button theme="small" @click="createLogMessage">
            Log type
        </nue-button>
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
