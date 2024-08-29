<template>
    <nue-div style="height: 128px">
        <nue-dropdown placement="bottom-center" hide-on-click>
            <template #default="{ clickTrigger }">
                <nue-avatar
                    src="https://picsum.photos/200/200"
                    @click="clickTrigger" />
            </template>
            <template #dropdown>
                <li>菜单项 1</li>
                <li>菜单项 2</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>
