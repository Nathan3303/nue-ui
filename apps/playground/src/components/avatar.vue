<template>
    <demo title="Avatar 头像">
        <nue-div align="center" gap="2rem">
            <nue-avatar src="https://placehold.co/36" />
            <nue-avatar size="48px" src="https://placehold.co/36" />
            <nue-avatar rounded size="56px" src="https://placehold.co/48" />
            <nue-avatar size="64px" src="123" />
            <nue-avatar icon="location" size="72px" />
            <nue-avatar size="80px">A</nue-avatar>
            <nue-avatar
                size="88px"
                title="This is a component of avatar from NueUI !!"
            />
            <nue-avatar
                size="96px"
                theme="rounded,outline"
                src="https://picsum.photos/96"
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
    --nue-avatar-outline-width: 3px;
    --nue-avatar-outline-gap: var(--nue-avatar-outline-width);
    --nue-avatar-outline-offset: calc(
        var(--nue-avatar-outline-gap) + var(--nue-avatar-outline-width)
    );
    --nue-avatar-outline-pos-offset: calc(
        -1 * calc(var(--nue-avatar-outline-offset) +
                    var(--nue-avatar-outline-width))
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
