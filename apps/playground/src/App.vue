<template>
    <nue-container class="app-view">
        <nue-header>
            <nue-div flex="1">
                <nue-link route="/component" theme="rl">组件演练</nue-link>
                <nue-link route="/custom" theme="rl">自由演练</nue-link>
            </nue-div>
            <nue-div width="fit-content">
                <nue-text size="lg">NueUI Playground Demos</nue-text>
            </nue-div>
            <nue-div flex="1"></nue-div>
        </nue-header>
        <router-view />
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueLink, NueText, NueDiv } from '@nue-ui/components';
import './main.css';
</script>
