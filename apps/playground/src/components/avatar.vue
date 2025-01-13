<template>
    <demo title="Avatar 头像">
        <nue-div align="center">
            <nue-avatar src="https://placehold.co/36" />
            <nue-avatar rounded src="https://placehold.co/36" />
            <nue-avatar size="48px" src="https://placehold.co/48" />
            <nue-avatar icon="location" />
            <nue-avatar>A</nue-avatar>
            <nue-avatar />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueAvatar } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>
