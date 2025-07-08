<template>
    <nue-container theme="custom">
        <nue-container theme="aside" width="30%">
            <nue-header>LOGO</nue-header>
            <nue-main>
                <nue-content>侧栏主体</nue-content>
            </nue-main>
        </nue-container>
        <nue-separator op-target="previous" />
        <nue-container>
            <nue-header>头部</nue-header>
            <nue-main>
                <nue-content>主体</nue-content>
            </nue-main>
            <nue-footer>底部</nue-footer>
        </nue-container>
    </nue-container>
</template>

<style scoped>
.nue-container--custom {
    flex-direction: row;
    height: 512px;

    .nue-header {
        height: 3rem;
        flex: none;
    }

    .nue-content {
        padding: 1rem;
    }
}

.nue-container--aside {
    min-width: 15%;
    max-width: 45%;
    flex: none;
}
</style>
