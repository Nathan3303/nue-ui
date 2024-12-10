<template>
    <nue-div align="center">
        <nue-empty />
        <nue-empty description="Empty" />
        <nue-empty image-size="64px" image-src="https://picsum.photos/64/64" />
    </nue-div>
    <nue-empty theme="custom">
        <template #description>当前页面暂无数据</template>
        <nue-button size="small" theme="primary">返回上一页</nue-button>
    </nue-empty>
</template>

<script lang="ts" setup></script>

<style scoped>
.nue-empty--custom {
    width: 100%;
    height: 256px;
    background-color: var(--primary-color-50);
    border-radius: var(--primary-radius);
    gap: 4px;

    &:deep().nue-empty__image {
        margin-bottom: 0px;
    }

    &:deep().nue-empty__description {
        margin-bottom: 8px;
    }
}
</style>
