<template>
    <nue-empty theme="custom">
        <template #description>当前页面暂无数据</template>
        <nue-button theme="primary" size="small">返回上一级</nue-button>
    </nue-empty>
</template>

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
