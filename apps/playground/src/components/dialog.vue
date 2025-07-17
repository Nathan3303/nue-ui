<template>
    <demo title="基础">
        <nue-button @click="dialog1.visible = true">点击打开对话框</nue-button>
        <nue-dialog ref="dialogRef" v-model="dialog1.visible" title="对话框">
            <nue-text color="gray" size="var(--nue-text-sm)">这是一个基本的对话框</nue-text>
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="加载态 & 自定义确认回调函数">
        <nue-button @click="dialog2.visible = true">点击打开对话框</nue-button>
        <nue-dialog ref="dialogRef" v-model="dialog2.visible" title="对话框">
            <nue-text color="gray" size="var(--nue-text-sm)">
                自定义了确认回调函数，并且应用加载态增强用户体验
            </nue-text>
            <template #footer="{ close, confirm }">
                <nue-button :disabled="dialog2.loading || dialog2.closing" @click="() => close()">
                    取消
                </nue-button>
                <nue-button
                    :disabled="dialog2.closing"
                    :loading="dialog2.loading"
                    theme="primary"
                    @click="handleDialog2Confirm(confirm)"
                >
                    确认
                </nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="自定义内容">
        <nue-button @click="dialog3.visible = true">点击打开对话框</nue-button>
        <nue-dialog ref="dialogRef" v-model="dialog3.visible">
            <template #header>一个拥有自定义头部的对话框</template>
            <template #content>
                <nue-div align="stretch" gap=".5rem" vertical>
                    <nue-text color="gray" size="var(--nue-text-sm)">
                        这是一个自定义内容，自定义内容可以放置任何内容，比如表单组件等
                    </nue-text>
                    <nue-input
                        v-model="dialog3.inputValue"
                        clearable
                        flex="1"
                        placeholder="请输入内容"
                    />
                </nue-div>
            </template>
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="自定义主题">
        <nue-button @click="dialog4.visible = true">点击打开对话框</nue-button>
        <nue-dialog ref="dialogRef" v-model="dialog4.visible" theme="custom" title="自定义主题">
            这是一个应用了自定义主题的对话框
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="OnBeforeConfirm 回调函数">
        <nue-button @click="dialog5.visible = true">点击打开对话框</nue-button>
        <nue-dialog
            ref="dialogRef"
            v-model="dialog5.visible"
            :before-confirm="beforeDialog5Confirm"
            title="OnBeforeConfirm 回调函数"
        >
            <nue-text color="gray" size="var(--nue-text-sm)">
                使用自定义 OnBeforeConfirm
                回调函数，可以在确认回调函数执行之前进行一些操作，比如数据验证或者再次确认等
            </nue-text>
            <template #footer="{ close, confirm }">
                <nue-button :disabled="dialog5.loading || dialog5.closing" @click="() => close()">
                    取消
                </nue-button>
                <nue-button
                    :disabled="dialog5.closing"
                    :loading="dialog5.loading"
                    theme="primary"
                    @click="confirm"
                >
                    确认
                </nue-button>
            </template>
        </nue-dialog>
    </demo>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { NueButton, NueDialog, NueText, NueInput, NueDiv, NueConfirm } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const dialog1 = reactive({ visible: false });
const dialog2 = reactive({ visible: false, loading: false, closing: false });
const dialog3 = reactive({ visible: false, inputValue: '' });
const dialog4 = reactive({ visible: false });
const dialog5 = reactive({ visible: false, loading: false, closing: false });

const handleDialog2Confirm = (close: () => void) => {
    dialog2.loading = true;
    setTimeout(() => {
        dialog2.loading = false;
        close();
        dialog2.closing = true;
    }, 2000);
};

const beforeDialog5Confirm = async () => {
    dialog5.loading = true;
    return await NueConfirm({ content: '请再次确认' })
        .then(() => true)
        .catch(() => false)
        .finally(() => (dialog5.loading = false));
};
</script>

<style>
.nue-overlay--custom {
    background-color: rgba(0, 0, 0, 0.8);

    .nue-dialog--custom {
        background-color: var(--nue-primary-color-900);

        .nue-dialog__header {
            color: var(--nue-primary-color-300);
        }

        .nue-dialog__content {
            color: var(--nue-primary-color-400);
        }

        .nue-dialog__footer {
            .nue-button {
                --nue-button-color: var(--nue-primary-color-300);
                --nue-button-border-color: var(--nue-primary-color-600);
                --nue-button-hover-bg-color: var(--nue-primary-color-800);
                --nue-button-active-bg-color: var(--nue-primary-color-700);
            }

            .nue-button--primary {
                --nue-button-color: var(--nue-primary-color-900);
                --nue-button-bg-color: var(--nue-primary-color-300);
                --nue-button-hover-bg-color: var(--nue-primary-color-100);
                --nue-button-active-bg-color: var(--nue-primary-color-200);
            }
        }
    }
}
</style>
