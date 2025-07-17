<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {
    NueDiv,
    NueButton,
    NueDialog,
    NueInput,
    NueSelect,
    NueSelectOption
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const s1 = ref(128);
const dialogState = reactive({
    visible: false,
    closing: false,
    loading: false,
    input1: '',
    input2: '',
    select1: '',
    select2: '',
    isConfirmed: false
});

const handleDialog2Confirm = (close: () => void) => {
    dialogState.loading = true;
    setTimeout(() => {
        dialogState.loading = false;
        close();
        dialogState.closing = true;
    }, 2000);
};
</script>

<template>
    <demo title="自定义演练 2">
        <nue-button @click="dialogState.visible = true">打开对话框</nue-button>
    </demo>
    <nue-dialog v-model="dialogState.visible">
        <template #default>
            <nue-div gap=".5rem" align="stretch" vertical style="padding: 0.5rem 0">
                <nue-input v-model="dialogState.input1" placeholder="姓名" />
                <nue-input v-model="dialogState.input2" placeholder="年龄" type="number" />
                <nue-div align="center" width="fit-content">
                    <nue-select v-model="s1" placeholder="选择大小">
                        <nue-select-option :value="54" label="54像素" />
                        <nue-select-option :value="72" label="72像素" />
                        <nue-select-option :value="96" label="96像素" />
                        <nue-select-option :value="128" disabled label="128像素" />
                    </nue-select>
                    <nue-select v-model="s1" placeholder="选择大小">
                        <nue-select-option :value="54" label="54像素" />
                        <nue-select-option :value="72" label="72像素" />
                        <nue-select-option :value="96" label="96像素" />
                        <nue-select-option :value="128" label="128像素" />
                    </nue-select>
                </nue-div>
            </nue-div>
        </template>
        <template #footer="{ close, confirm }">
            <nue-button>验证</nue-button>
            <nue-button
                :disabled="dialogState.loading || dialogState.closing"
                @click="() => close()"
            >
                取消
            </nue-button>
            <nue-button
                :disabled="dialogState.closing"
                :loading="dialogState.loading"
                theme="primary"
                @click="handleDialog2Confirm(confirm)"
            >
                确认
            </nue-button>
        </template>
    </nue-dialog>
</template>

<style scoped></style>
