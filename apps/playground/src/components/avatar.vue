<template>
    <demo title="基础">
        <nue-div align="center" gap="2rem">
            <nue-avatar src="https://placehold.co/36" />
            <nue-avatar icon="location" />
            <nue-avatar>A</nue-avatar>
        </nue-div>
    </demo>
    <demo title="尺寸">
        <nue-div align="center" gap="2rem">
            <nue-avatar size="36px" src="https://picsum.photos/36" />
            <nue-avatar size="3rem" src="https://picsum.photos/48" />
            <nue-avatar size="56px" src="https://picsum.photos/56" />
        </nue-div>
    </demo>
    <demo title="加载失败处理">
        <nue-div align="center" gap="2rem">
            <nue-avatar src="123" />
            <nue-avatar src="123">A</nue-avatar>
        </nue-div>
    </demo>
    <demo title="图片适应">
        <nue-div align="center" gap="2rem">
            <nue-avatar size="6rem" src="https://picsum.photos/36/64" fit="fill" />
            <nue-avatar size="6rem" src="https://picsum.photos/36/64" fit="contain" />
            <nue-avatar size="6rem" src="https://picsum.photos/36/64" fit="cover" />
            <nue-avatar size="6rem" src="https://picsum.photos/36/64" fit="none" />
            <nue-avatar size="6rem" src="https://picsum.photos/36/64" fit="scale-down" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
import { NueDiv, NueAvatar } from '@nue-ui/components';
</script>

<style scoped>
.nue-avatar--outline {
    --nue-avatar-outline-width: 2px;
    --nue-avatar-outline-gap: var(--nue-avatar-outline-width);
    --nue-avatar-outline-offset: calc(
        var(--nue-avatar-outline-gap) + var(--nue-avatar-outline-width)
    );
    --nue-avatar-outline-pos-offset: calc(
        -1 * calc(var(--nue-avatar-outline-offset) + var(--nue-avatar-outline-width))
    );
    --nue-avatar-bg-color: #ea9d38;

    position: relative;

    &::before {
        content: '';
        display: block;
        position: absolute;
        width: calc(100% + var(--nue-avatar-outline-offset) * 2);
        height: calc(100% + var(--nue-avatar-outline-offset) * 2);
        top: var(--nue-avatar-outline-pos-offset);
        left: var(--nue-avatar-outline-pos-offset);
        border: var(--nue-avatar-outline-width) solid orange;
    }
}
</style>
