<template>
    <demo title="Dropdown 下拉列表">
        <nue-div>
            <nue-div align="center">
                <nue-dropdown trigger-text="基础下拉">
                    <template #dropdown>
                        <li class="nue-dropdown-item">下拉列表项 ...</li>
                    </template>
                </nue-dropdown>
                <nue-dropdown disabled trigger-text="禁用状态" />
            </nue-div>
            <nue-div align="center">
                <nue-dropdown
                    placement="top-start"
                    trigger-text="位置：上左对齐"
                >
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
                <nue-dropdown
                    placement="bottom-center"
                    trigger-text="位置：下居中"
                >
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
                <nue-dropdown
                    placement="bottom-end"
                    trigger-text="位置：下右对齐"
                >
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
            </nue-div>
            <nue-div align="center">
                <nue-dropdown size="large" trigger-text="大尺寸下拉">
                    <template #dropdown>
                        <li class="nue-dropdown-item">下拉列表项 ...</li>
                    </template>
                </nue-dropdown>
                <nue-dropdown trigger-text="基础下拉">
                    <template #dropdown>
                        <li class="nue-dropdown-item">下拉列表项 ...</li>
                    </template>
                </nue-dropdown>
                <nue-dropdown size="small" trigger-text="小尺寸下拉">
                    <template #dropdown>
                        <li class="nue-dropdown-item">下拉列表项 ...</li>
                    </template>
                </nue-dropdown>
            </nue-div>
            <nue-div>
                <nue-dropdown
                    hide-on-clicked
                    trigger-text="基础下拉（选择后关闭）"
                    @execute="handleExecute"
                >
                    <template #dropdown>
                        <li data-executeid="Option 1">下拉列表项 1</li>
                        <li data-executeid="Option 2">下拉列表项 2</li>
                        <li data-executeid="Option 3">下拉列表项 3</li>
                    </template>
                </nue-dropdown>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueDropdown, NueMessage } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const handleExecute = (id: string) => {
    NueMessage.info(id);
};
</script>
