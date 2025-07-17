<template>
    <nue-container height="512px">
        <nue-header>头部</nue-header>
        <nue-main>
            <nue-aside>左侧栏</nue-aside>
            <nue-content fill>主体</nue-content>
            <nue-aside>右侧栏</nue-aside>
        </nue-main>
        <nue-footer>底部</nue-footer>
    </nue-container>
</template>

<style scoped>
.nue-header {
    background-color: #f8f0f0;
}

.nue-aside {
    background-color: #edf8ed;
}

.nue-content {
    background-color: #eaeaf5;
}

.nue-footer {
    background-color: #fbe5ff;
}
</style>
