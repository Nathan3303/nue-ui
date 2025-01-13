<template>
    <nue-div class="wrapper">
        <nue-container>
            <nue-main
                disable-aside-resize
                disable-outline-resize
                aside-width="200px"
                outline-width="200px"
            >
                <template #aside>侧栏</template>
                <template #content>内容</template>
                <template #outline>侧栏</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-divider-color);
    border-radius: var(--nue-primary-radius);
    height: 240px;
    overflow: hidden;
}
</style>
