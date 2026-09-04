<template>
    <nue-dropdown
        close-when-executed
        theme="command"
        transparent
        trigger-text="下拉选择"
        @close="handleDropdownClose"
        @execute="handleExecute"
    >
        <nue-div class="header" gap="0" vertical align="stretch">
            <nue-input
                v-model="inputValue"
                clearable
                placeholder="筛选下拉选项"
                class="search-input"
                icon="filter"
            >
                <!-- <template #append>
                    <nue-text class="count-text" size="small">
                        {{ dropdownItems.length }}/{{ defaultDropdownItems.length }}
                    </nue-text>
                </template> -->
            </nue-input>
        </nue-div>
        <nue-divider />
        <nue-div class="main" gap=".25rem" vertical align="stretch">
            <template v-if="dropdownItems.length">
                <nue-dropdown-item
                    v-for="item in dropdownItems"
                    :key="item.id"
                    :execute-id="item.id"
                    :text="item.text"
                />
            </template>
            <nue-text v-else :clamped="1" class="empty-text">没有找到匹配的选项</nue-text>
        </nue-div>
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { NueMessage } from 'nue-ui';

interface DropdownItem {
    id: string;
    text: string;
}

const defaultDropdownItems: DropdownItem[] = [
    { id: 'Option 1', text: '下拉选项 1' },
    { id: 'Option 2', text: '下拉选项 2' },
    { id: 'Option 3', text: '下拉选项 3' },
    { id: 'Option 4', text: '下拉选项 4' },
    { id: 'Option 5', text: '下拉选项 5' }
];

const inputValue = ref('');

const dropdownItems = computed(() => {
    if (!inputValue.value) return defaultDropdownItems;
    return defaultDropdownItems.filter(item =>
        item.text.toLowerCase().includes(inputValue.value.toLowerCase())
    );
});

const handleExecute = (value: string) => {
    NueMessage.info(`选中: ${value}`);
};

const handleDropdownClose = () => {
    inputValue.value = '';
};
</script>

<style scoped>
.nue-dropdown--command {
    width: 360px;
    max-width: unset;
    padding: 0;
    gap: 0;
}

.nue-dropdown--command .header {
    padding: 0;
}

.nue-dropdown--command .search-input {
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    padding: 1rem;
}

.nue-dropdown--command .search-input:hover,
.nue-dropdown--command .search-input:focus {
    border: none;
    box-shadow: none;
}

.nue-dropdown--command .count-text {
    color: var(--nue-color-text-placeholder, #999);
    white-space: nowrap;
    padding-left: 0.5rem;
}

.nue-dropdown--command .main {
    padding: 0.25rem;
    max-height: 240px;
    overflow-y: auto;
}

.nue-dropdown--command .empty-text {
    padding: 0.75rem;
    color: var(--nue-color-text-placeholder, #999);
    justify-content: center;
}
</style>