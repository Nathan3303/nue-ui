<template>
    <nue-div align="center">
        <nue-dropdown trigger-text="点击打开">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1</li>
                <li class="nue-dropdown-item">下拉列表项 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger-text="空下拉列表"></nue-dropdown>
        <nue-dropdown trigger-text="禁用状态" disabled></nue-dropdown>
    </nue-div>
    <nue-div align="center">
        <nue-dropdown trigger-text="小型下拉框" size="small">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1</li>
                <li class="nue-dropdown-item">下拉列表项 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger-text="大型下拉框" size="large">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1</li>
                <li class="nue-dropdown-item">下拉列表项 2</li>
            </template>
        </nue-dropdown>
    </nue-div>
    <nue-div align="center">
        <nue-dropdown trigger-text="位置：上-中" placement="top-center">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1（长文本）</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger-text="位置：下-中" placement="bottom-center">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1（长文本）</li>
            </template>
        </nue-dropdown>
        <nue-dropdown trigger-text="位置：下-右" placement="bottom-end">
            <template #dropdown>
                <li class="nue-dropdown-item">下拉列表项 1（长文本）</li>
            </template>
        </nue-dropdown>
    </nue-div>
    <nue-div align="center">
        <nue-dropdown
            trigger-text="点击打开（选择后关闭）"
            hide-on-clicked
            @execute="handleExecute">
            <template #dropdown>
                <li data-executeid="Option 1">下拉列表项 1</li>
                <li data-executeid="Option 2">下拉列表项 2</li>
                <li data-executeid="Option 3">下拉列表项 3</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<script setup lang="ts">
const handleExecute = (id: string) => {
    console.log(id);
};
</script>
