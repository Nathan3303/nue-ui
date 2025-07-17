<template>
    <nue-dropdown trigger-text="下拉选择" @execute="handleExecute">
        <li class="nue-dropdown-item" data-executeid="Option 1">下拉选项 1</li>
    </nue-dropdown>
</template>

<script setup>
import { NueMessage } from 'nue-ui';

const handleExecute = id => {
    NueMessage({ message: `Executing option ${id}` });
};
</script>
