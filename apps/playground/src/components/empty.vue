<template>
    <demo title="Empty 空状态">
        <nue-div align="center">
            <nue-empty />
            <nue-empty description="Empty" />
            <nue-empty
                image-size="64px"
                image-src="https://picsum.photos/64/64"
            />
        </nue-div>
        <nue-empty theme="custom">
            <template #description>当前页面暂无数据</template>
            <nue-button size="small" theme="primary">返回上一页</nue-button>
        </nue-empty>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-empty--custom {
    width: 100%;
    height: 256px;
    background-color: var(--nue-ui-primary-color-100);
    border-radius: var(--nue-ui-primary-radius);
    gap: 4px;

    &:deep().nue-empty__image {
        margin-bottom: 0;
    }

    &:deep().nue-empty__description {
        margin-bottom: 8px;
    }
}
</style>
