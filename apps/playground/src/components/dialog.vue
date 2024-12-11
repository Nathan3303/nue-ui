<template>
    <demo title="Dialog 对话框">
        <nue-button theme="small" @click="dialogData.visible = true">
            点击打开对话框
        </nue-button>
        <nue-dialog
            ref="dialogRef"
            v-model="dialogData.visible"
            :closable="!dialogData.loading"
            theme="project-creator"
            title="创建项目对话框"
        >
            <nue-div align="stretch" vertical>
                <nue-div align="stretch" gap="4px" vertical>
                    <nue-input
                        v-model="dialogData.projectName"
                        :debounce-time="240"
                        :disabled="dialogData.loading"
                        clearable
                        placeholder="请输入项目名称"
                        title="项目名称"
                    />
                    <nue-text
                        v-if="isProjectNameEmpty"
                        color="#f56c6c"
                        size="12px"
                    >
                        * 项目名称不能为空
                    </nue-text>
                </nue-div>
                <nue-div align="center" gap="8px">
                    <nue-switch
                        v-model="isAddDescription"
                        :disabled="dialogData.loading"
                        size="small"
                    />
                    <nue-text size="12px">添加项目备注</nue-text>
                </nue-div>
                <nue-textarea
                    v-if="isAddDescription"
                    v-model="dialogData.projectDescription"
                    :disabled="dialogData.loading"
                    :rows="4"
                    placeholder="项目备注"
                    title="项目备注"
                />
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
    </demo>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { NueConfirm, NueDialog, NueMessage } from 'nue-ui';
import Demo from '../layouts/demo.vue';

const isAddDescription = ref(false);
const isProjectNameEmpty = ref(false);
const dialogRef = ref<InstanceType<typeof NueDialog> | null>(null);
const dialogData = reactive({
    visible: false,
    loading: false,
    projectName: '',
    projectDescription: ''
});

async function handleAddProject() {
    dialogData.loading = true;
    try {
        if (!dialogData.projectName) {
            isProjectNameEmpty.value = true;
            return;
        }
        await NueConfirm({
            title: '确认创建',
            content: '确认创建项目吗？',
            confirmButtonText: '确认',
            cancelButtonText: '取消'
        });
        NueMessage.info('正在创建项目，请稍候...');
        const response = await new Promise(resolve => {
            setTimeout(async () => {
                resolve({
                    name: dialogData.projectName,
                    description: dialogData.projectDescription
                });
                await dialogRef.value?.close();
                NueMessage.success(`项目 ${dialogData.projectName} 创建成功！`);
                dialogData.loading = false;
                dialogData.projectName = '';
                dialogData.projectDescription = '';
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

<style>
.nue-dialog--project-creator {
    border: 2px solid var(--primary-color-a200);
}
</style>
