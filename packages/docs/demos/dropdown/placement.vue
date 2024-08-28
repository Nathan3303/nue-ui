<template>
    <nue-div style="margin-bottom: 96px" justify="space-between">
        <nue-dropdown text="下-左" placement="bottom-start" hide-on-click>
            <template #dropdown>
                <li>Dropdown item 1</li>
                <li>Dropdown item 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="下-中" placement="bottom-center" hide-on-click>
            <template #dropdown>
                <li>Dropdown item 1</li>
                <li>Dropdown item 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="下-右" placement="bottom-end" hide-on-click>
            <template #dropdown>
                <li>Dropdown item 1</li>
                <li>Dropdown item 2</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<style scoped>
.nue-dropdown li {
    width: 200px;
}
</style>
