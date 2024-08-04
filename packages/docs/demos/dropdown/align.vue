<template>
    <nue-div style="height: 160px" justify="space-between">
        <nue-dropdown text="Left aligned" align="left">
            <template #dropdown>
                <li>Dropdown item 1</li>
                <li>Dropdown item 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Center aligned" align="center">
            <template #dropdown>
                <li>Dropdown item 1</li>
                <li>Dropdown item 2</li>
            </template>
        </nue-dropdown>
        <nue-dropdown text="Right aligned" align="right">
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
