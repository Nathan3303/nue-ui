<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-link>Original</nue-link>
            <nue-link theme="actived">Actived</nue-link>
            <nue-link disabled>Disabled</nue-link>
        </nue-div>
    </demo>
    <demo title="路由链接主题" sub-title="route(icon,sm,lg)">
        <nue-div align="center">
            <nue-link theme="route">Original</nue-link>
            <nue-link theme="route,actived">Actived</nue-link>
            <nue-link theme="route" disabled>Disabled</nue-link>
            <nue-link theme="route,route-sm" icon="drive">Small</nue-link>
            <nue-link theme="route,route-lg" icon="drive">Large</nue-link>
            <nue-link icon="drive" theme="route,route-icon" />
            <nue-link icon="drive" theme="route,route-icon,actived" />
            <nue-link icon="drive" theme="route,route-icon" disabled />
            <nue-link icon="drive" theme="route,route-icon,route-sm" />
            <nue-link icon="drive" theme="route,route-icon,route-lg" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueLink } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>
