<template>
    <nue-dropdown placement="bottom-center">
        <template #trigger="{ trigger }">
            <nue-avatar src="https://picsum.photos/200/200" @click="trigger" />
        </template>
        <li class="nue-dropdown-item" data-executeid="profile">个人信息</li>
        <li class="nue-dropdown-item" data-executeid="logout">退出登录</li>
    </nue-dropdown>
</template>
