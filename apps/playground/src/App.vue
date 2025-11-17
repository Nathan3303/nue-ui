<template>
    <nue-container id="PlaygroundAppContainer">
        <nue-header>
            <nue-div flex="1">
                <nue-text size="lg">NueUI Playground Demos</nue-text>
            </nue-div>
            <nue-div width="fit-content" align="center">
                <nue-link route="/component" theme="route">组件</nue-link>
                <nue-link route="/custom" theme="route">自由</nue-link>
            </nue-div>
        </nue-header>
        <router-view />
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueLink, NueText, NueDiv } from '@nue-ui/components';
</script>
