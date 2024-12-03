<template>
    <nue-div>
        <nue-button @click="showPromptWithInputType('password')">
            创建一个密码类型的输入确认框
        </nue-button>
        <nue-button @click="showPromptWithInputType('number')">
            创建一个数字类型的输入确认框
        </nue-button>
    </nue-div>
</template>

<script setup>
    import { NueMessage, NuePrompt } from 'nue-ui';

    function showPromptWithInputType(type) {
        NuePrompt({
            title: '输入确认',
            placeholder: '请输入内容',
            inputType: type
        }).then(
            value => {
                NueMessage({
                    message: `Value is: ${value}`,
                    type: 'success'
                });
            },
            () => NueMessage({ message: 'Cancelled!', type: 'warning' })
        );
    }
</script>
