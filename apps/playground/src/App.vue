<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>NueUI 组件库 PlayGround</template>
        </nue-header>
        <nue-main
            aside-width="200px"
            :allow-resize-aside="false"
            outline-width="200px"
            responsive
        >
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
            <template #outline>
                <div id="outline"></div>
            </template>
        </nue-main>
    </nue-container>
</template>

<style scoped>
.nue-main {
    --aside-gap: 8px;

    &:deep(.view-container) {
        display: flex;
        flex-direction: column;
        gap: 48px;
    }
}
</style>

<style>
.outline-list {
    list-style: none;
    padding: 0;
    margin: 0;

    h3 {
        margin: 16px 0px;
    }

    a {
        padding: 4px 0;
        font-size: 12px;
        color: gray;

        &:hover {
            text-decoration: underline;
            color: black;
            cursor: pointer;
        }
    }
}
</style>
