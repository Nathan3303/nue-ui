<script lang="ts" setup>
import { ref, computed } from 'vue';
import { NueDiv, NueDropdown, NueDivider, NueInput, NueMessage } from '@nue-ui/components';

const defaultDropdownItem = [
    { id: 'Option 1', text: '下拉选项 1' },
    { id: 'Option 2', text: '下拉选项 2' },
    { id: 'Option 3', text: '下拉选项 3' },
    { id: 'Option 4', text: '下拉选项 4' },
    { id: 'Option 5', text: '下拉选项 5' }
];

const inputValue = ref('');

const dropdownItems = computed(() => {
    return defaultDropdownItem.filter(item => item.text.includes(inputValue.value));
});

const handleExecute = (value: string) => NueMessage.info(value);
const handleDropdownClose = () => (inputValue.value = '');
</script>

<template>
    <nue-div align="stretch" vertical>
        <nue-div height="100vh"></nue-div>
        <nue-div wrap="nowrap" justify="space-between">
            <nue-dropdown
                close-when-executed
                theme="custom"
                transparent
                trigger-text="下拉选择"
                @close="handleDropdownClose"
                @execute="handleExecute"
            >
                <nue-div align="stretch" class="header" gap="0" vertical>
                    <nue-input
                        v-model="inputValue"
                        clearable
                        placeholder="筛选下拉选项"
                        theme="noshape"
                        icon="filter"
                    />
                </nue-div>
                <nue-divider />
                <nue-div align="stretch" class="main" gap=".25rem" vertical>
                    <template v-if="dropdownItems.length">
                        <li v-for="item in dropdownItems" :key="item.id" :data-executeid="item.id">
                            {{ item.text }}
                        </li>
                    </template>
                    <span v-else class="nue-dropdown__empty-text">没有选项</span>
                </nue-div>
            </nue-dropdown>
            <nue-dropdown
                close-when-executed
                theme="custom"
                transparent
                trigger-text="下拉选择"
                @close="handleDropdownClose"
                @execute="handleExecute"
                placement="right-start"
            >
                <nue-div align="stretch" class="header" gap="0" vertical>
                    <nue-input
                        v-model="inputValue"
                        clearable
                        placeholder="筛选下拉选项"
                        theme="noshape"
                        icon="filter"
                    />
                </nue-div>
                <nue-divider />
                <nue-div align="stretch" class="main" gap=".25rem" vertical>
                    <template v-if="dropdownItems.length">
                        <li v-for="item in dropdownItems" :key="item.id" :data-executeid="item.id">
                            {{ item.text }}
                        </li>
                    </template>
                    <span v-else class="nue-dropdown__empty-text">没有选项</span>
                </nue-div>
            </nue-dropdown>
            <nue-dropdown
                close-when-executed
                theme="custom"
                transparent
                trigger-text="下拉选择"
                @close="handleDropdownClose"
                @execute="handleExecute"
            >
                <nue-div align="stretch" class="header" gap="0" vertical>
                    <nue-input
                        v-model="inputValue"
                        clearable
                        placeholder="筛选下拉选项"
                        theme="noshape"
                        icon="filter"
                    />
                </nue-div>
                <nue-divider />
                <nue-div align="stretch" class="main" gap=".25rem" vertical>
                    <template v-if="dropdownItems.length">
                        <li v-for="item in dropdownItems" :key="item.id" :data-executeid="item.id">
                            {{ item.text }}
                        </li>
                    </template>
                    <span v-else class="nue-dropdown__empty-text">没有选项</span>
                </nue-div>
            </nue-dropdown>
        </nue-div>
        <nue-div height="100vh"></nue-div>
    </nue-div>
</template>

<style>
.nue-dropdown--custom {
    width: 360px;
    max-width: unset;
    padding: 0;
    gap: 0;

    .header {
        padding: 0.25rem 0.875rem;
    }

    .main {
        padding: 0.25rem;
    }
}
</style>
