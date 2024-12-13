<template>
    <nue-div class="wrapper">
        <nue-container>
            <nue-main
                aside-max-width="160px"
                aside-min-width="80px"
                aside-width="120px"
                outline-max-width="30%"
                outline-min-width="10%"
                outline-width="20%"
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
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 240px;
    overflow: hidden;
}
</style>
<script lang="ts" setup></script>
