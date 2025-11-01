<template>
    <nue-select v-model="vm" placeholder="请选择" clearable @change="handleChange">
        <nue-select-option label="选项 A" value="optionA" />
        <nue-select-option label="选项 B" value="optionB" />
    </nue-select>
</template>

<script setup>
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const vm = ref(null);

const handleChange = newValue => {
    if (!newValue) {
        NueMessage.info('清除了选择');
        return;
    }
    NueMessage.success(`选择了 ${newValue}`);
};
</script>
