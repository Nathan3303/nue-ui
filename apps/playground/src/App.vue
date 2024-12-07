<template>
    <nue-container>
        <nue-header>
            <template #logo>NueUI 组件库 PlayGround</template>
        </nue-header>
        <nue-main responsive>
            <template #aside>
                <nue-link route="/basic">基础组件</nue-link>
                <nue-link route="/form">表单组件</nue-link>
                <nue-link route="/data">数据展示组件</nue-link>
                <nue-link route="/navigation">导航组件</nue-link>
                <nue-link route="/feedback">反馈组件</nue-link>
                <nue-link route="/others">其他组件</nue-link>
            </template>
            <template #content>
                <router-view />
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
        box-sizing: border-box;
        padding: 16px;
    }

    .nue-link {
        font-size: var(--text-sm);
        color: var(--primary-color-800);
    }
}
</style>

<style>
.outline-list {
    list-style: none;
    padding: 0;
    margin: 0;

    h3 {
        margin: 16px 0;
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
