<template>
    <demo title="Avatar 头像">
        <nue-div align="center" wrap>
            <nue-avatar src="https://picsum.photos/150" />
            <nue-avatar rounded src="https://picsum.photos/150" />
            <nue-avatar size="48px" src="https://picsum.photos/150" />
            <nue-avatar icon="location" />
            <nue-avatar rounded>N</nue-avatar>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import Demo from '../layouts/demo.vue';
</script>
