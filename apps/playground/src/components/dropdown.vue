<template>
    <demo title="基础">
        <nue-div>
            <nue-dropdown trigger-text="基础下拉">
                <li class="nue-dropdown-item">下拉选项 ...</li>
            </nue-dropdown>
            <nue-dropdown trigger-text="基础下拉"></nue-dropdown>
        </nue-div>
    </demo>
    <demo title="禁用状态">
        <nue-dropdown disabled trigger-text="禁用状态" />
    </demo>
    <demo title="遮罩层穿透">
        <nue-dropdown transparent trigger-text="下拉选择">
            <li class="nue-dropdown-item">下拉选项 ...</li>
        </nue-dropdown>
    </demo>
    <demo title="对齐位置">
        <nue-div align="center">
            <nue-dropdown placement="top-start" trigger-text="位置：上左对齐">
                <li class="nue-dropdown-item">placement="top-start"</li>
            </nue-dropdown>
            <nue-dropdown placement="bottom-center" trigger-text="位置：下居中">
                <li class="nue-dropdown-item">placement="bottom-center"</li>
            </nue-dropdown>
            <nue-dropdown placement="bottom-end" trigger-text="位置：下右对齐">
                <li class="nue-dropdown-item">placement="bottom-end"</li>
            </nue-dropdown>
        </nue-div>
    </demo>
    <demo title="预设尺寸">
        <nue-div align="center">
            <nue-dropdown size="small" trigger-text="小尺寸下拉">
                <li class="nue-dropdown-item">size="small"</li>
            </nue-dropdown>
            <nue-dropdown trigger-text="基础下拉">
                <li class="nue-dropdown-item">size="normal"</li>
            </nue-dropdown>
            <nue-dropdown size="large" trigger-text="大尺寸下拉">
                <li class="nue-dropdown-item">size="large"</li>
            </nue-dropdown>
        </nue-div>
    </demo>
    <demo title="选择后关闭">
        <nue-dropdown close-when-executed trigger-text="下拉选择">
            <li class="nue-dropdown-item">下拉选项 ...</li>
        </nue-dropdown>
    </demo>
    <demo title="处理执行事件 onExecute">
        <nue-dropdown close-when-executed trigger-text="下拉选择" @execute="handleExecute">
            <li data-executeid="Option 1">下拉选项 1</li>
            <li data-executeid="Option 2">下拉选项 2</li>
            <li data-executeid="Option 3">下拉选项 3</li>
        </nue-dropdown>
    </demo>
    <demo title="嵌套">
        <nue-dropdown
            close-when-executed
            group="abc"
            trigger-text="下拉选择"
            @execute="handleExecute"
        >
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
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueDropdown, NueMessage, NueIcon } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const handleExecute = (id: string) => {
    NueMessage.info(id);
};
</script>
