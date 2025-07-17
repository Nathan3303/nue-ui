<template>
    <nue-div>
        <nue-button @click="direction.visible1 = true">打开抽屉（上）</nue-button>
        <nue-button @click="direction.visible2 = true">打开抽屉（左）</nue-button>
        <nue-button @click="direction.visible3 = true">打开抽屉（下）</nue-button>
    </nue-div>
    <nue-drawer v-model="direction.visible1" open-from="top" title="定义了打开方向的抽屉">
        <nue-div style="padding: 1rem">从上方打开的抽屉</nue-div>
    </nue-drawer>
    <nue-drawer v-model="direction.visible2" open-from="left" title="定义了打开方向的抽屉">
        <nue-div style="padding: 1rem">从左侧打开的抽屉</nue-div>
    </nue-drawer>
    <nue-drawer v-model="direction.visible3" open-from="bottom" title="定义了打开方向的抽屉">
        <nue-div style="padding: 1rem">从下方打开的抽屉</nue-div>
    </nue-drawer>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const direction = reactive({
    visible1: false,
    visible2: false,
    visible3: false
});
</script>
