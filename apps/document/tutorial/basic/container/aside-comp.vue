<template>
    <nue-container height="512px">
        <nue-main>
            <nue-aside max-width="32%" min-width="8%" width="16%">左侧栏</nue-aside>
            <nue-separator op-target="previous" />
            <nue-content fill>主体</nue-content>
            <nue-separator op-target="next" />
            <nue-aside max-width="32%" min-width="8%" width="16%">右侧栏</nue-aside>
        </nue-main>
    </nue-container>
</template>

<style scoped>
.nue-aside {
    background-color: #edf8ed;
}

.nue-content {
    background-color: #eaeaf5;
}
</style>
