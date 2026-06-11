<template>
    <nue-dropdown>
        <template #trigger="{ trigger }">
            <nue-button @click="trigger">带头尾</nue-button>
        </template>
        <template #header>
            <div class="dropdown-header">搜索选项</div>
        </template>
        <div class="nue-dropdown-item">选项 1</div>
        <div class="nue-dropdown-item">选项 2</div>
        <template #footer>
            <div class="dropdown-footer">共 2 项</div>
        </template>
    </nue-dropdown>
</template>

<style>
.dropdown-header {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: var(--nue-disabled-color);
    border-bottom: 1px solid var(--nue-border-color);
}
.dropdown-footer {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: var(--nue-disabled-color);
    border-top: 1px solid var(--nue-border-color);
}
</style>
