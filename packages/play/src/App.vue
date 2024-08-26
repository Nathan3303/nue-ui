<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>NueUI 组件库 PlayGround</template>
        </nue-header>
        <nue-main aside-width="160px" allow-resize-aside>
            <template #aside>
                <nue-link theme="btnlike" route="/basic">
                    Basic 基础组件
                </nue-link>
                <nue-link theme="btnlike" route="/form">Form 表单组件</nue-link>
                <nue-link theme="btnlike" route="/data">
                    Data 数据展示组件
                </nue-link>
                <nue-link theme="btnlike" route="/navigation">
                    Navigation 导航组件
                </nue-link>
                <nue-link theme="btnlike" route="/feedback">
                    Feedback 反馈组件
                </nue-link>
                <nue-link theme="btnlike" route="/others">
                    Others 其他组件
                </nue-link>
            </template>
            <template #content>
                <router-view></router-view>
            </template>
        </nue-main>
    </nue-container>
</template>

<style scoped>
.nue-main {
    --aside-gap: 8px;

    .view-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
        gap: 16px;

        &:deep(.nue-div--card) {
            height: 100%;
        }
    }
}
</style>
