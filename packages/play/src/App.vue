<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>NueUI PlayGround</template>
        </nue-header>
        <nue-main aside-width="240px">
            <template #aside>
                <nue-link theme="btnlike" route="/basic">
                    Basic 基础组件
                </nue-link>
                <nue-link theme="btnlike" route="/data">Data 数据组件</nue-link>
                <nue-link theme="btnlike" route="/feedback">
                    Feedback 反馈组件
                </nue-link>
            </template>
            <template #content>
                <router-view></router-view>
            </template>
        </nue-main>
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>

<style scoped>
.nue-main {
    --aside-gap: 8px;
}

.nue-link--btnlike {
    --height: 36px;
}
</style>
