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
            <nue-divider vertical style="height: calc(100% - 2rem)" />
            <nue-button theme="ghost" @click="handleSwitchDarkTheme">
                {{ darkSwitch ? '🌙' : '☀️' }}
            </nue-button>
        </nue-header>
        <router-view />
    </nue-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
    NueContainer,
    NueHeader,
    NueLink,
    NueText,
    NueDiv,
    NueButton,
    NueDivider
} from '@nue-ui/components';

const darkSwitch = ref(0);

const handleSwitchDarkTheme = () => {
    darkSwitch.value = 1 - darkSwitch.value;
    document.documentElement.style.setProperty('--nue-dark-switch', darkSwitch.value + '');
};
</script>

<style scoped>
#PlaygroundAppContainer {
    height: 100%;
    background-color: var(--nue-primary-color-0);
}
</style>
