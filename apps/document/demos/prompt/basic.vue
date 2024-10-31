<template>
    <nue-button @click="showPrompt">创建一个输入确认框</nue-button>
</template>

<script setup>
    import { NueMessage, NuePrompt } from 'nue-ui';

    const showPrompt = () => {
        NuePrompt({
            title: '请输入您的姓名',
            placeholder: '请输入您的姓名'
        }).then(
            value => {
                NueMessage({
                    message: `Your name is: ${value}`,
                    type: 'success'
                });
            },
            () => NueMessage({ message: 'Cancelled!', type: 'warning' })
        );
    };
</script>
