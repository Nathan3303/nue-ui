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
            <nue-avatar size="48px" src="https://picsum.photos/48" />
            <nue-avatar size="56px" src="https://picsum.photos/56" />
        </nue-div>
    </demo>
    <demo title="加载失败处理">
        <nue-div align="center" gap="2rem">
            <nue-avatar src="123" />
            <nue-avatar src="123">A</nue-avatar>
        </nue-div>
    </demo>
    <demo title="主题">
        <nue-div align="center" gap="2rem">
            <nue-avatar rounded src="https://placehold.co/48" />
            <nue-avatar
                src="https://picsum.photos/96"
                theme="rounded,outline"
            />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import NueDiv from '@nue-ui/components/div/div.ts';
import NueAvatar from '@nue-ui/components/avatar/avatar.vue';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-avatar--outline {
    --nue-avatar-outline-width: 2px;
    --nue-avatar-outline-gap: var(--nue-avatar-outline-width);
    --nue-avatar-outline-offset: calc(
        var(--nue-avatar-outline-gap) + var(--nue-avatar-outline-width)
    );
    --nue-avatar-outline-pos-offset: calc(
        -1 *
            calc(
                var(--nue-avatar-outline-offset) +
                    var(--nue-avatar-outline-width)
            )
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
