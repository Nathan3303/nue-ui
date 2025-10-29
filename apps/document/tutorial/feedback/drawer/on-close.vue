<script setup lang="ts">
import { ref } from 'vue';
import { NueConfirm } from 'nue-ui';

const visible = ref(false);

const handleOnClose = async (done: () => void) => {
    const [isByCancel] = await NueConfirm({ title: '确认关闭抽屉吗？' });
    if (isByCancel) return;
    done();
};
</script>

<template>
    <nue-div>
        <nue-button @click="visible = true">关闭抽屉时回调</nue-button>
    </nue-div>
    <nue-drawer v-model="visible" title="指定了关闭抽屉时回调的抽屉" :on-close="handleOnClose">
        <nue-div style="padding: 1rem">这是一个指定了关闭抽屉时回调的抽屉</nue-div>
    </nue-drawer>
</template>

<style scoped></style>
