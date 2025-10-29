<script setup lang="ts">
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const visible = ref(false);
</script>

<template>
    <nue-div>
        <nue-button @click="visible = true">自定义事件</nue-button>
    </nue-div>
    <nue-drawer
        v-model="visible"
        @before-open="() => NueMessage.info('抽屉打开前')"
        @after-open="() => NueMessage.info('抽屉打开后')"
        @before-close="() => NueMessage.info('抽屉关闭前')"
        @after-close="() => NueMessage.info('抽屉关闭后')"
        title="自定义事件抽屉"
    >
        这是一个自定义事件抽屉
    </nue-drawer>
</template>

<style scoped></style>
