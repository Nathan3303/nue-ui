<template>
    <nue-dropdown trigger-text="基础下拉">
        <nue-dropdown-item icon="theme" use-suffix-icon>
            <template #default>默认插槽</template>
            <template #append>
                <nue-text color="orange">+1</nue-text>
            </template>
        </nue-dropdown-item>
    </nue-dropdown>
</template>
