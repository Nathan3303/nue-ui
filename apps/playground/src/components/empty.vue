<template>
    <demo title="基础">
        <nue-empty />
    </demo>
    <demo title="描述文本">
        <nue-empty description="Empty" />
    </demo>
    <demo title="图片">
        <nue-empty image-src="https://picsum.photos/64/64" />
    </demo>
    <demo title="大小">
        <nue-empty image-size="4rem" image-src="https://picsum.photos/64/64" />
    </demo>
    <demo title="主题">
        <nue-empty theme="custom">
            <template #description>当前页面暂无数据</template>
            <nue-button size="small" theme="primary">返回上一页</nue-button>
        </nue-empty>
    </demo>
</template>

<script lang="ts" setup>
import { NueEmpty, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-empty--custom {
    width: 100%;
    height: 256px;
    background-color: var(--nue-primary-color-100);
    border-radius: var(--nue-primary-radius);
    gap: 4px;

    &:deep().nue-empty__image {
        margin-bottom: 0;
    }

    &:deep().nue-empty__description {
        margin-bottom: 8px;
    }
}
</style>
