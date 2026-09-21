<template>
    <nue-div direction="column" gap="var(--nue-gap-md)">
        <nue-div align="center" gap="var(--nue-gap-md)">
            <nue-button theme="primary">主按钮</nue-button>
            <nue-button>普通按钮</nue-button>
            <nue-input placeholder="输入框" />
        </nue-div>
        <nue-div align="center" gap="var(--nue-gap-md)">
            <nue-text>深色模式：</nue-text>
            <nue-switch v-model="dark" @change="toggle" />
        </nue-div>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dark = ref(false);
const toggle = () => {
    document.documentElement.style.setProperty('--nue-dark-switch', dark.value ? '1' : '0');
};
</script>