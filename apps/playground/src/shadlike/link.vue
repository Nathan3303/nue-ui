<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-link>Original</nue-link>
            <nue-link theme="actived">Actived</nue-link>
            <nue-link disabled>Disabled</nue-link>
        </nue-div>
    </demo>
    <demo title="route 路由链接主题">
        <nue-div align="center">
            <nue-link theme="route">Original</nue-link>
            <nue-link theme="route,actived">Actived</nue-link>
            <nue-link theme="route" disabled>Disabled</nue-link>
            <nue-link theme="route,route-sm">Small</nue-link>
            <nue-link theme="route,route-lg">Large</nue-link>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueLink } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>
