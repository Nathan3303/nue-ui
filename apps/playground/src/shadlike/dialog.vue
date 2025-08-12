<script setup lang="ts">
import { reactive } from 'vue';
import { NueButton, NueDialog, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const dialog1 = reactive({ visible: false });
const dialog2 = reactive({ visible: false });
const dialog3 = reactive({ visible: false });
</script>

<template>
    <demo title="基础">
        <nue-button @click="dialog1.visible = true">点击打开对话框</nue-button>
        <nue-dialog v-model="dialog1.visible" title="对话框">
            <nue-text color="gray" size="var(--nue-text-sm)">这是一个基本的对话框</nue-text>
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="large 大型对话框主题">
        <nue-button @click="dialog2.visible = true">点击打开对话框</nue-button>
        <nue-dialog v-model="dialog2.visible" title="对话框" theme="large">
            <nue-text color="gray" size="var(--nue-text-sm)">这是一个基本的对话框</nue-text>
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
    <demo title="fullscreen 全屏主题">
        <nue-button @click="dialog3.visible = true">点击打开对话框</nue-button>
        <nue-dialog v-model="dialog3.visible" title="对话框" theme="fullscreen">
            <template #header-actions>
                <nue-button icon="clear" theme="icon,small" @click="dialog3.visible = false" />
            </template>
            <nue-text color="gray" size="var(--nue-text-sm)">这是一个基本的对话框</nue-text>
            <template #footer="{ close, confirm }">
                <nue-button @click="() => close()">取消</nue-button>
                <nue-button theme="primary" @click="confirm">创建</nue-button>
            </template>
        </nue-dialog>
    </demo>
</template>

<style scoped></style>
