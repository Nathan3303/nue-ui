<template>
    <nue-container>
        <nue-header>
            <nue-div flex="1" style="font-size: 0.875rem">
                <nue-link href="#" theme="actived">首页</nue-link>
                <nue-link href="#">关于我们</nue-link>
            </nue-div>
            <nue-text size="md">LOGO</nue-text>
            <nue-div flex="1" gap=".25rem" justify="end">
                <nue-avatar icon="theme" />
            </nue-div>
        </nue-header>
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
