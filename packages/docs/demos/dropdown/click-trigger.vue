<template>
    <nue-div style="height: 160px">
        <nue-dropdown>
            <template #default="{ clickTrigger }">
                <nue-avatar
                    src="https://picsum.photos/200/200"
                    @click="clickTrigger" />
            </template>
            <template #dropdown>
                <li>Profile</li>
                <li>Logout</li>
            </template>
        </nue-dropdown>
    </nue-div>
</template>
