<template>
    <nue-container class="vp-raw">
        <nue-header>
            <nue-header>
                <nue-div style="padding: 16px">容器头部</nue-div>
            </nue-header>
        </nue-header>
        <nue-main aside-width="140px" outline-width="140px">
            <template #aside>容器主体：侧栏</template>
            <template #content>
                <nue-container theme="vertical,inner" style="border: none">
                    <nue-header>嵌套容器头部</nue-header>
                    <nue-main>嵌套容器主体</nue-main>
                    <nue-footer>嵌套容器底部</nue-footer>
                </nue-container>
            </template>
            <template #outline>容器主体：大纲</template>
        </nue-main>
        <nue-footer>容器底部</nue-footer>
    </nue-container>
</template>

<style scoped>
    .nue-container {
        height: 512px;
        border: 1px solid var(--divider-color);
        border-radius: var(--primary-radius);
    }
</style>
