<template>
    <nue-container height="256px">
        <nue-main
            aside-width="200px"
            outline-width="200px"
            :allow-resize-aside="false"
            :allow-resize-outline="false">
            <template #aside>侧边栏区域</template>
            <template #content>内容区域</template>
            <template #outline>右侧（大纲）区域</template>
        </nue-main>
    </nue-container>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);

    .nue-main {
        border: none;
    }
}
</style>
