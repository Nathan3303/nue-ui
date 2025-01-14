<template>
    <nue-div style="margin-bottom: 96px" justify="space-between">
        <nue-dropdown text="下-左" placement="bottom-start" hide-on-click>
            <template #dropdown>
                <li>下拉菜单选项 A</li>
                <li>下拉菜单选项 B</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="下-中" placement="bottom-center" hide-on-click>
            <template #dropdown>
                <li>下拉菜单选项 A</li>
                <li>下拉菜单选项 B</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="下-右" placement="bottom-end" hide-on-click>
            <template #dropdown>
                <li>下拉菜单选项 A</li>
                <li>下拉菜单选项 B</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>
