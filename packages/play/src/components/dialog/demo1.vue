<template>
    <nue-div vertical>
        <nue-button @click="dialogVisible = true">Open Dialog</nue-button>
        <nue-dialog
            v-model="dialogVisible"
            :before-confirm="handleBeforeConfirm"
            title="Dialog Title">
            <template #default>
                <nue-div vertical align="stretch">
                    <nue-input v-model="dialogData.title" />
                    <nue-textarea v-model="dialogData.content" />
                </nue-div>
            </template>
            <template #footer="{ cancel, confirm }">
                <nue-button @click.stop="cancel"> Cancel </nue-button>
                <nue-button theme="primary" @click.stop="confirm">
                    Confirm
                </nue-button>
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

function handleBeforeConfirm(done: () => void) {
    NueConfirm({
        title: "Confirm",
        content: "Are you sure to close the dialog?",
    }).then(done, () => {});
}
</script>
