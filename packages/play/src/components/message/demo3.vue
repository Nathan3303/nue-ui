<template>
    <nue-div wrap>
        <nue-button theme="small" @click="createSmallMessage"> Small size </nue-button>
        <nue-button theme="small" @click="createNormalMessage"> Normal size </nue-button>
        <nue-button theme="small" @click="createLargeMessage"> Large size </nue-button>
    </nue-div>
</template>

<script setup lang="ts">
import { NueMessage } from "../../../../core";

function createSmallMessage() {
    NueMessage({
        message: "This is a small message.",
        size: "small",
    });
}

function createNormalMessage() {
    NueMessage({
        message: "This is a large message.",
    });
}

function createLargeMessage() {
    NueMessage({
        message: "This is a large message.",
        size: "large",
    });
}
</script>
