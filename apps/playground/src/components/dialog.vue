<template>
    <nue-button @click="dialogData.visible = true">点击打开对话框</nue-button>
    <nue-dialog
        ref="dialogRef"
        v-model="dialogData.visible"
        title="创建项目对话框"
        theme="project-creator"
        :closable="!dialogData.loading"
    >
        <nue-div vertical align="stretch">
            <nue-div vertical align="stretch" gap="4px">
                <nue-input
                    v-model="dialogData.projectName"
                    title="项目名称"
                    placeholder="请输入项目名称"
                    :debounce-time="240"
                    :disabled="dialogData.loading"
                    clearable
                />
                <nue-text v-if="isProjectNameEmpty" size="12px" color="#f56c6c">
                    * 项目名称不能为空
                </nue-text>
            </nue-div>
            <nue-div align="center" gap="8px">
                <nue-switch
                    v-model="isAddDescription"
                    size="small"
                    :disabled="dialogData.loading"
                />
                <nue-text size="12px">添加项目备注</nue-text>
            </nue-div>
            <nue-textarea
                v-if="isAddDescription"
                v-model="dialogData.projectDescription"
                title="项目备注"
                placeholder="项目备注"
                :rows="4"
                :disabled="dialogData.loading"
            />
        </nue-div>
        <template #footer="{ cancel }">
            <nue-button @click.stop="cancel" :disabled="dialogData.loading">
                取消
            </nue-button>
            <nue-button
                theme="primary"
                @click.stop="handleAddProject"
                :loading="dialogData.loading"
            >
                创建
            </nue-button>
        </template>
    </nue-dialog>
</template>

<script setup lang="ts">
    import { ref, reactive, watch } from 'vue';
    import { NueConfirm, NueDialog, NueMessage } from 'nue-ui';

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
                    NueMessage.success(
                        `项目 ${dialogData.projectName} 创建成功！`
                    );
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
