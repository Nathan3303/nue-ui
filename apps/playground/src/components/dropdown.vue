<template>
    <demo title="基础">
        <nue-div>
            <nue-dropdown trigger-text="基础下拉（有选项）">
                <nue-dropdown-item text="下拉选项 ..." />
            </nue-dropdown>
            <nue-dropdown trigger-text="基础下拉（无选项）" />
        </nue-div>
    </demo>
    <demo title="禁用状态">
        <nue-dropdown disabled trigger-text="禁用状态" />
    </demo>
    <demo title="遮罩层穿透">
        <nue-dropdown transparent trigger-text="下拉选择">
            <nue-dropdown-item text="下拉选项 ..." />
        </nue-dropdown>
    </demo>
    <demo title="对齐位置">
        <nue-div align="center">
            <nue-dropdown placement="top-start" trigger-text="位置：上左对齐" />
            <nue-dropdown placement="bottom-center" trigger-text="位置：下居中" />
            <nue-dropdown placement="bottom-end" trigger-text="位置：下右对齐" />
        </nue-div>
    </demo>
    <demo title="预设尺寸">
        <nue-div align="center">
            <nue-dropdown size="small" trigger-text="小尺寸下拉">
                <nue-dropdown-item text="下拉选项 ..." />
            </nue-dropdown>
            <nue-dropdown trigger-text="基础下拉">
                <nue-dropdown-item text="下拉选项 ..." />
            </nue-dropdown>
            <nue-dropdown size="large" trigger-text="大尺寸下拉">
                <nue-dropdown-item text="下拉选项 ..." />
            </nue-dropdown>
        </nue-div>
    </demo>
    <demo title="处理执行事件">
        <nue-dropdown trigger-text="选择" @execute="handleExecute">
            <nue-dropdown-item execute-id="Option 1" text="下拉选项 1" />
            <nue-dropdown-item execute-id="Option 2" text="下拉选项 2" />
            <nue-dropdown-item execute-id="Option 3" text="下拉选项 3" />
        </nue-dropdown>
    </demo>
    <demo title="执行后关闭">
        <nue-div>
            <nue-dropdown close-when-executed trigger-text="整体控制" @execute="handleExecute">
                <nue-dropdown-item execute-id="Option 1" text="下拉选项 1" />
                <nue-dropdown-item execute-id="Option 2" text="下拉选项 2" />
            </nue-dropdown>
            <nue-dropdown trigger-text="选项单独控制" @execute="handleExecute">
                <nue-dropdown-item execute-id="Option 1" text="下拉选项 1" />
                <nue-dropdown-item execute-id="Option 2" text="下拉选项 2" close-when-executed />
                <nue-dropdown-item execute-id="Option 3" text="下拉选项 3" />
            </nue-dropdown>
        </nue-div>
    </demo>
    <demo title="嵌套">
        <nue-dropdown
            close-when-executed
            group="abc"
            trigger-text="下拉选择"
            @execute="handleExecute"
        >
            <nue-dropdown-item execute-id="Option 1" text="下拉选项 1" />
            <nue-dropdown
                close-when-executed
                group="abc"
                placement="right-start"
                @execute="handleExecute"
            >
                <template #trigger="{ trigger }">
                    <nue-dropdown-item @click="trigger" text="下拉选项 2" use-suffix-icon />
                </template>
                <nue-dropdown-item execute-id="Option 2-1" text="下拉选项 2-1" />
                <nue-dropdown-item execute-id="Option 2-2" text="下拉选项 2-2" />
            </nue-dropdown>
            <nue-dropdown-item execute-id="Option 3" text="下拉选项 3" />
        </nue-dropdown>
    </demo>
    <demo title="下拉列表选项组件">
        <nue-dropdown
            placement="right-end"
            trigger-text="基础下拉（有选项）"
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
        </nue-dropdown>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueDropdown, NueMessage, NueDropdownItem } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const handleExecute = (id: string) => NueMessage.info(id);
</script>
