<template>
    <nue-dropdown>
        <template #trigger="{ trigger }">
            <nue-avatar src="https://picsum.photos/200/200" @click="trigger" />
        </template>
        <li data-executeid="Option 1">下拉选项 1</li>
        <li data-executeid="Option 2">下拉选项 2</li>
        <li data-executeid="Option 3">下拉选项 3</li>
    </nue-dropdown>
</template>
