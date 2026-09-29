<template>
    <nue-div>
        <nue-button @click="showWithAction">弹出带撤销操作的消息</nue-button>
        <nue-button @click="showWithHandle">获取句柄并在 3 秒后关闭</nue-button>
    </nue-div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { NueMessage } from 'nue-ui';

const showWithAction = () => {
    NueMessage({
        message: '内容已保存',
        duration: 0,
        extension: ({ close }) =>
            h('a', { class: 'nue-message-demo-action', onClick: () => handleUndo(close) }, '撤销')
    });
};

const handleUndo = (close: () => void) => {
    close();
    NueMessage({ message: '已执行撤销操作', type: 'success' });
};

const showWithHandle = () => {
    const handle = NueMessage({ message: '这条消息将在 3 秒后自动关闭', duration: 0 });
    setTimeout(() => handle.close(), 3000);
};
</script>

<style scoped>
.nue-message-demo-action {
    cursor: pointer;
    text-decoration: underline;
}
</style>