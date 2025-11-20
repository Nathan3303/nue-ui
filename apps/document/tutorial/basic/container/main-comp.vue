<template>
    <nue-container height="512px">
        <nue-main>
            <nue-aside>左侧栏</nue-aside>
            <nue-content fill>
                <nue-div style="padding: 1rem">主体</nue-div>
            </nue-content>
            <nue-aside>右侧栏</nue-aside>
        </nue-main>
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
