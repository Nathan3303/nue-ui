<template>
    <demo title="Dialog 对话框">
        <nue-button @click="dialogData.visible = true">
            点击打开对话框
        </nue-button>
    </demo>
    <nue-dialog
        ref="dialogRef"
        v-model="dialogData.visible"
        :closable="!dialogData.loading"
        theme="project-creator"
        title="对话框"
    >
        <nue-div align="stretch" vertical>
            <nue-div align="stretch" gap="4px" vertical>
                <nue-input
                    v-model="dialogData.projectName"
                    :debounce-time="240"
                    :disabled="dialogData.loading"
                    clearable
                    placeholder="请输入"
                    style="flex: none"
                />
                <nue-text v-if="isProjectNameEmpty" color="#f56c6c" size="12px">
                    * 不能为空
                </nue-text>
            </nue-div>
        </nue-div>
        <template #footer="{ cancel }">
            <nue-button :disabled="dialogData.loading" @click.stop="cancel">
                取消
            </nue-button>
            <nue-button
                :loading="dialogData.loading"
                theme="primary"
                @click.stop="handleAddProject"
            >
                创建
            </nue-button>
        </template>
    </nue-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import {
    NueDiv,
    NueButton,
    NueDialog,
    NueText,
    NueInput,
    NueConfirm,
    NueMessage
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const isProjectNameEmpty = ref(false);
const dialogRef = ref<InstanceType<typeof NueDialog>>();
const dialogData = reactive({
    visible: false,
    loading: false,
    projectName: ''
});

async function handleAddProject() {
    dialogData.loading = true;
    try {
        if (!dialogData.projectName) {
            isProjectNameEmpty.value = true;
            return;
        }
        await NueConfirm({
            title: '确认吗？',
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        });
        NueMessage.info('正在处理，请稍候...');
        const response = await new Promise(resolve => {
            setTimeout(async () => {
                resolve({
                    name: dialogData.projectName
                });
                await dialogRef.value?.close();
                NueMessage.success(`处理成功：${dialogData.projectName}`);
                dialogData.loading = false;
                dialogData.projectName = '';
            }, 2000);
        });
        console.log(response);
    } finally {
        dialogData.loading = false;
    }
}

watch(
    () => dialogData.projectName,
    newVal => {
        if (newVal) {
            isProjectNameEmpty.value = false;
        }
    }
);
</script>
