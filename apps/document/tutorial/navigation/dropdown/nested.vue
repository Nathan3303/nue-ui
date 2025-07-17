<template>
    <nue-dropdown close-when-executed group="abc" trigger-text="下拉选择" @execute="handleExecute">
        <li data-executeid="Option 1">下拉选项 1</li>
        <nue-dropdown
            close-when-executed
            group="abc"
            placement="right-start"
            @execute="handleExecute"
        >
            <template #trigger="{ trigger }">
                <li @click.stop="trigger">
                    下拉选项 2
                    <nue-icon class="state-icon" name="arrow-right" />
                </li>
            </template>
            <li data-executeid="Option 2-1">下拉选项 2-1</li>
            <li data-executeid="Option 2-2">下拉选项 2-2</li>
        </nue-dropdown>
        <li data-executeid="Option 3">下拉选项 3</li>
    </nue-dropdown>
</template>

<script setup lang="ts">
import { NueMessage } from 'nue-ui';

const handleExecute = (id: string) => {
    NueMessage.info(id);
};
</script>
