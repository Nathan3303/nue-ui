<template>
    <nue-container theme="nested">
        <nue-container theme="nested__aside">
            <nue-header>头部</nue-header>
            <nue-main>
                <nue-div style="padding: 1rem">侧边栏</nue-div>
            </nue-main>
        </nue-container>
        <nue-separator op-target="previous" />
        <nue-container theme="nested__main">
            <nue-header>头部</nue-header>
            <nue-main>
                <nue-content fill>
                    <nue-div style="padding: 1rem">主体</nue-div>
                </nue-content>
            </nue-main>
            <nue-footer>底部</nue-footer>
        </nue-container>
    </nue-container>
</template>

<style scoped>
.nue-header,
.nue-main,
.nue-footer {
    color: var(--nue-primary-text-color);
    background-color: var(--nue-primary-color-100);
}
</style>
