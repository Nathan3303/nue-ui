<template>
    <nue-button @click.stop="dialogData.visible = true">
        Open Dialog 2
    </nue-button>
    <nue-dialog
        ref="dialogRef"
        v-model="dialogData.visible"
        title="Create new project">
        <nue-div vertical align="stretch">
            <nue-input
                v-model="dialogData.projectName"
                title="Project name"
                placeholder="Project name (required)"></nue-input>
            <nue-textarea
                v-model="dialogData.projectDescription"
                title="Project description"
                placeholder="Project description"
                :rows="4"
                autosize></nue-textarea>
        </nue-div>
        <template #footer="{ cancel }">
            <nue-button @click.stop="cancel">Cancel</nue-button>
            <nue-button
                theme="primary"
                @click.stop="handleAddProject"
                :loading="dialogData.loading">
                Create
            </nue-button>
        </template>
    </nue-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { NueDialog } from "nue-ui";

const dialogRef = ref<InstanceType<typeof NueDialog> | null>(null);
const dialogData = reactive({
    visible: false,
    loading: false,
    projectName: "",
    projectDescription: "",
});

async function handleAddProject() {
    dialogData.loading = true;
    const response = await new Promise((resolve) => {
        setTimeout(async () => {
            resolve({
                name: dialogData.projectName,
                description: dialogData.projectDescription,
            });
            await dialogRef.value?.close();
            dialogData.loading = false;
        }, 2000);
    });
    console.log(response);
}
</script>

<style scoped></style>
