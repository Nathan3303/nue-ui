<template>
    <demo title="Dropdown 下拉列表">
        <nue-div>
            <nue-div align="center">
                <nue-dropdown trigger-text="基础下拉列表">
                    <template #dropdown>
                        <li class="nue-dropdown-item">下拉列表项 1</li>
                        <li class="nue-dropdown-item">下拉列表项 2</li>
                    </template>
                </nue-dropdown>
                <nue-dropdown disabled trigger-text="禁用状态" />
            </nue-div>
            <nue-div align="center">
                <nue-dropdown placement="top-start" trigger-text="位置：左对齐">
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
                <nue-dropdown
                    placement="bottom-center"
                    trigger-text="位置：居中"
                >
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
                <nue-dropdown
                    placement="bottom-end"
                    trigger-text="位置：右对齐"
                >
                    <template #dropdown>
                        <li class="nue-dropdown-item">
                            下拉列表项 1（长文本）
                        </li>
                    </template>
                </nue-dropdown>
                <nue-dropdown
                    hide-on-clicked
                    trigger-text="基础下拉列表（选择后关闭）"
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
import NueDropdown from '@nue-ui/components/dropdown/dropdown.vue';
import { NueMessage } from 'nue-ui';
import Demo from '../layouts/demo.vue';

const handleExecute = (id: string) => {
    NueMessage.info(id);
};
</script>
