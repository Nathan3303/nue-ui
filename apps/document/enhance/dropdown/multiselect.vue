<template>
    <nue-dropdown
        :close-when-executed="false"
        theme="command"
        transparent
        :trigger-text="triggerText"
        @close="handleDropdownClose"
        @execute="handleExecute"
    >
        <nue-div class="header" gap="0" vertical align="stretch">
            <nue-input
                v-model="inputValue"
                clearable
                placeholder="搜索城市"
                class="search-input"
                icon="filter"
            >
                <template #append>
                    <nue-text class="count-text" size="small">
                        {{ selectedItems.length }}/{{ dropdownItems.length }}
                    </nue-text>
                </template>
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
                >
                    <template #append>
                        <nue-icon v-if="isSelected(item.id)" name="check" class="check-icon" />
                    </template>
                </nue-dropdown-item>
            </template>
            <nue-text v-else :clamped="1" class="empty-text">没有找到匹配的选项</nue-text>
        </nue-div>
        <template v-if="selectedItems.length">
            <nue-divider />
            <nue-button @click="handleClear" size="small">清除选择</nue-button>
        </template>
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface DropdownItem {
    id: string;
    text: string;
}

const defaultDropdownItems: DropdownItem[] = [
    { id: 'Beijing', text: '北京' },
    { id: 'Shanghai', text: '上海' },
    { id: 'Guangzhou', text: '广州' },
    { id: 'Shenzhen', text: '深圳' },
    { id: 'Hangzhou', text: '杭州' },
    { id: 'Chengdu', text: '成都' },
    { id: 'Wuhan', text: '武汉' },
    { id: 'Xian', text: '西安' }
];

const inputValue = ref('');
const selectedItems = ref<DropdownItem[]>([]);

const dropdownItems = computed(() => {
    if (!inputValue.value) return defaultDropdownItems;
    return defaultDropdownItems.filter(item =>
        item.text.toLowerCase().includes(inputValue.value.toLowerCase())
    );
});

const MAX_DISPLAY_COUNT = 3;

const triggerText = computed(() => {
    if (selectedItems.value.length === 0) {
        return '请选择';
    }
    const selectedTexts = selectedItems.value.map(item => item.text);
    if (selectedItems.value.length > MAX_DISPLAY_COUNT) {
        return `已选择 ${selectedItems.value.length} 项`;
    }
    return selectedTexts.join(', ');
});

const isSelected = (id: string) => {
    return selectedItems.value.some(item => item.id === id);
};

const toggleSelect = (item: DropdownItem) => {
    const index = selectedItems.value.findIndex(i => i.id === item.id);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
};

const handleExecute = (executeId: string) => {
    const item = dropdownItems.value.find(i => i.id === executeId);
    if (item) {
        toggleSelect(item);
    }
};

const handleClear = () => {
    selectedItems.value = [];
};

const handleDropdownClose = () => {
    inputValue.value = '';
};
</script>

<style scoped>
.nue-dropdown--command {
    width: 280px;
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
    font-size: 12px;
}

.nue-dropdown--command .check-icon {
    color: var(--nue-color-primary, #1890ff);
    font-weight: bold;
}

.nue-dropdown--command .empty-text {
    padding: 1rem;
    color: var(--nue-color-text-placeholder, #999);
    justify-content: center;
    font-size: 14px;
}

.nue-dropdown--command .footer {
    padding: 0.75rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nue-dropdown--command .footer .nue-button {
    flex: 1;
}

.nue-dropdown--command .footer .nue-button:first-child {
    margin-right: 0.5rem;
}
</style>