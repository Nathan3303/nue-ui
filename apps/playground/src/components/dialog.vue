<template>
    <demo title="基础">
        <nue-button @click="dialog1.visible = true">点击打开对话框</nue-button>
        <nue-dialog
            v-model="dialog1.visible"
            title="对话框"
            @before-open="() => console.log('beforeOpen')"
            @after-open="() => console.log('afterOpen')"
            @before-close="() => console.log('beforeClose')"
            @after-close="() => console.log('afterClose')"
        >
            <nue-text>这是一个基础对话框</nue-text>
        </nue-dialog>
    </demo>
    <demo title="自定义内容">
        <nue-button @click="dialog3.visible = true">点击打开对话框</nue-button>
        <nue-dialog v-model="dialog3.visible">
            <template #header="{ close }">
                <nue-text>一个拥有自定义头部的对话框</nue-text>
                <nue-text @click="close">关闭</nue-text>
            </template>
            <template #content>
                <nue-div align="stretch" gap=".75rem" vertical>
                    <nue-text color="gray" size="0.875rem">
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
            <template #footer="{ close }">
                <nue-button @click="close">取消</nue-button>
                <nue-button theme="primary" @click="close">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="自定义主题">
        <nue-button @click="dialog4.visible = true">点击打开对话框</nue-button>
        <nue-dialog ref="dialogRef" v-model="dialog4.visible" theme="custom" title="自定义主题">
            这是一个应用了自定义主题的对话框
        </nue-dialog>
    </demo>
    <demo title="重写插槽">
        <nue-button @click="dialog5.visible = true">点击打开对话框</nue-button>
        <nue-dialog v-model="dialog5.visible">
            <template #reset>重置了整个对话框内部结构</template>
        </nue-dialog>
    </demo>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { NueButton, NueDialog, NueText, NueInput, NueDiv } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const dialog1 = reactive({ visible: false });
const dialog3 = reactive({ visible: false, inputValue: '' });
const dialog4 = reactive({ visible: false });
const dialog5 = reactive({ visible: false });
</script>

<style>
.nue-dialog--custom {
    background-color: #212121;

    > .nue-dialog__header {
        color: #f2f2f2;

        .nue-dialog__header__closebtn {
            --nue-button-color: var(--nue-primary-color-300);
            --nue-button-border-color: var(--nue-primary-color-600);
            --nue-button-hover-bg-color: var(--nue-primary-color-800);
            --nue-button-active-bg-color: var(--nue-primary-color-700);
        }
    }

    > .nue-dialog__main .nue-dialog__content {
        color: #cccccc;
    }
}
</style>
