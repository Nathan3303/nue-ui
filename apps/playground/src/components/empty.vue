<template>
    <nue-div align="center" :divider="{}">
        <nue-empty />
        <nue-empty description="Empty" />
        <nue-empty
            image-src="https://picsum.photos/128/128"
            image-size="128px"
        />
    </nue-div>
    <nue-empty theme="custom">
        <template #description>当前页面暂无数据</template>
        <nue-button theme="primary" size="small">返回上一页</nue-button>
    </nue-empty>
</template>

<script setup lang="ts"></script>

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
