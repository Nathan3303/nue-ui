<template>
    <nue-button @click="dialogData.visible = true">点击打开对话框</nue-button>
    <nue-dialog
        ref="dialogRef"
        v-model="dialogData.visible"
        :before-confirm="handleBeforeConfirm"
        title="创建项目对话框">
        <nue-div vertical align="stretch">
            <nue-input
                v-model="dialogData.projectName"
                title="项目名称"
                placeholder="项目名称"></nue-input>
            <nue-textarea
                v-model="dialogData.projectDescription"
                title="项目备注"
                placeholder="项目备注"
                :rows="4"></nue-textarea>
        </nue-div>
        <template #footer="{ cancel }">
            <nue-button @click.stop="cancel">取消</nue-button>
            <nue-button
                theme="primary"
                @click.stop="handleAddProject"
                :loading="dialogData.loading">
                创建
            </nue-button>
        </template>
    </nue-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { NueConfirm, NueDialog } from "nue-ui";

const dialogRef = ref<InstanceType<typeof NueDialog> | null>(null);
const dialogData = reactive({
    visible: false,
    loading: false,
    projectName: "",
    projectDescription: "",
});

function handleBeforeConfirm(done: () => void) {
    NueConfirm({
        title: "确认创建",
        content: "确认创建项目吗？",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
    }).then(done, () => {});
}

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
