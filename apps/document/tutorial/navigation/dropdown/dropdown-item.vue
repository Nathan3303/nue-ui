<script setup lang="ts">
import { NueMessage } from 'nue-ui';

const handleExecute = (id: string) => NueMessage.info(id);
</script>

<template>
    <nue-div>
        <nue-dropdown
            group="myDropdown"
            placement="right-start"
            trigger-text="基础下拉"
            @execute="handleExecute"
        >
            <nue-dropdown-item>默认插槽</nue-dropdown-item>
            <nue-dropdown-item text="文字属性" />
            <nue-dropdown-item disabled text="禁用选项" />
            <nue-dropdown-item icon="theme" text="图标选项" />
            <nue-dropdown-item size="small" text="小尺寸选项" />
            <nue-dropdown-item size="large" text="大尺寸选项" />
            <nue-dropdown-item loading text="加载中选项" />
            <nue-dropdown-item loading loading-icon="scan" text="加载中选项（自定义图标）" />
            <nue-dropdown-item execute-id="test" text="执行事件选项" />
            <nue-dropdown-item
                icon="plus-circle"
                execute-id="test2"
                close-when-executed
                text="执行事件选项（关闭下拉）"
            />
            <nue-dropdown
                close-when-executed
                group="myDropdown"
                placement="right-start"
                @execute="handleExecute"
            >
                <template #trigger="{ trigger }">
                    <nue-dropdown-item @click="trigger" text="下拉选项 2" use-suffix-icon />
                </template>
                <nue-dropdown-item execute-id="Option 2-1" text="下拉选项 2-1" />
                <nue-dropdown-item execute-id="Option 2-2" text="下拉选项 2-2" />
            </nue-dropdown>
        </nue-dropdown>
    </nue-div>
</template>
