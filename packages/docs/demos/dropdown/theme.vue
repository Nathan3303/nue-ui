<template>
    <nue-div style="height: 128px">
        <nue-dropdown theme="dark" text="点击打开下拉菜单">
            <template #dropdown>
                <li>下拉菜单选项 A</li>
                <li>下拉菜单选项 B</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>

<style>
.nue-dropdown--dark {
    background-color: #333;
    color: #fff;
    width: 166px;
    border-color: #333;
    box-shadow: var(--primary-shadow);

    & li:hover {
        background-color: #696969;
        cursor: pointer;
    }
}
</style>
