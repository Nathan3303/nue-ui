<template>
    <nue-div align="center" gap="24px">
        <nue-button theme="round">圆角</nue-button>
        <nue-button icon="search" theme="icon" title="图标主题" />
        <nue-button theme="primary">主要</nue-button>
        <nue-button theme="secondary">次要</nue-button>
        <nue-button theme="destructive">破坏</nue-button>
        <nue-button theme="ghost">幽灵</nue-button>
        <nue-button theme="pure">纯净</nue-button>
        <nue-button :theme="{ round: true, primary: true }">
            多主题应用：主要+圆角
        </nue-button>
    </nue-div>
</template>

<style scoped>
.nue-button--custom {
    --color: white;
    --font-weight: bold;
    --border-color: transparent;
    --background-color: #4992ff;
    --hover-background-color: #4381df;
    --active-background-color: #3f75c7;
    --primary-radius: 0px;
}
</style>
<script setup lang="ts"></script>
