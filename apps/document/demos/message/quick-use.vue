<template>
    <nue-div>
        <nue-button @click="NueMessage.success('成功', 5000, 'success')">
            成功
        </nue-button>
        <nue-button @click="NueMessage.error('错误', 5000, 'clear')">
            错误
        </nue-button>
    </nue-div>
</template>

<script setup>
    import { NueMessage } from 'nue-ui';
</script>
