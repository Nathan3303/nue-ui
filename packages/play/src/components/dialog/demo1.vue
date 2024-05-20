<template>
    <nue-div vertical>
        <nue-button @click="handleOpenDialog">Open Dialog</nue-button>
        <nue-dialog
            v-model="dialogVisible"
            :before-confirm="handleBeforeConfirm">
            <template #header="{ close }">
                <nue-text>My Dialog Title</nue-text>
                <nue-button icon="clear" theme="icon-only" @click="close" />
            </template>
            <template #default>
                <nue-div vertical align="stretch">
                    <nue-input v-model="dialogData.title" />
                    <nue-textarea v-model="dialogData.content" />
                </nue-div>
            </template>
            <template #footer="{ cancel, confirm }">
                <nue-button class="cancel-button" @click.stop="cancel"
                    >Cancel</nue-button
                >
                <nue-button class="confirm-button" @click.stop="confirm"
                    >Confirm</nue-button
                >
            </template>
        </nue-dialog>
    </nue-div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { NueConfirm } from "nue-ui";

const dialogVisible = ref(false);
const dialogData = reactive({
    title: "My Dialog Title",
    content: "My Dialog Content",
});

function handleOpenDialog() {
    dialogVisible.value = true;
}

function handleBeforeConfirm(done: () => void) {
    NueConfirm({
        title: "Confirm",
        content: "Are you sure to close the dialog?",
    }).then(done);
}
</script>
