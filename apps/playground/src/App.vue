<template>
    <nue-container id="PlaygroundAppContainer">
        <nue-header>
            <nue-div flex="1">
                <nue-text size="lg">NueUI Playground Demos</nue-text>
            </nue-div>
            <nue-div width="fit-content" align="center">
                <nue-link route="/component" theme="route">组件</nue-link>
                <nue-link route="/custom" theme="route">自由</nue-link>
                <nue-divider vertical />
                <nue-link route="/shadlike" theme="route">Shadlike 主题</nue-link>
            </nue-div>
        </nue-header>
        <router-view />
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueLink, NueText, NueDiv, NueDivider } from '@nue-ui/components';
</script>

<style>
* {
    font-family:
        'Poppins', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        'WenQuanYi Micro Hei', sans-serif;
    font-size: var(--nue-text-sm);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    word-break: break-word;
    margin: 0;
    box-sizing: border-box;
    vertical-align: baseline;
    zoom: 1;
}
</style>
