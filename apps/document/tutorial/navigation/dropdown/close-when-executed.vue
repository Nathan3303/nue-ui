<template>
    <nue-dropdown close-when-executed trigger-text="下拉选择" @execute="handleExecute">
        <li class="nue-dropdown-item" data-executeid="Option 1">下拉选项 1</li>
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { NueMessage } from 'nue-ui';

const handleExecute = (id: string) => {
    NueMessage({ message: `Executing option ${id}` });
};
</script>
