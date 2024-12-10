<template>
    <nue-div class="wrapper">
        <nue-container>
            <nue-main responsive>
                <template #aside>侧边栏区域</template>
                <template #content>
                    <nue-div style="padding: 16px">内容区域</nue-div>
                </template>
                <template #outline>右侧（大纲）区域</template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 240px;
    overflow: hidden;
}
</style>
<script lang="ts" setup></script>
