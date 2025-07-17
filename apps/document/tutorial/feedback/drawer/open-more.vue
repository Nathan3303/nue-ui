<template>
    <nue-div>
        <nue-button @click="drawer1State = true">打开抽屉1</nue-button>
        <nue-button @click="drawer2State = true">打开抽屉2</nue-button>
    </nue-div>
    <nue-drawer v-model="drawer1State" title="抽屉1">
        <nue-button @click="drawer2State = true">打开抽屉2</nue-button>
    </nue-drawer>
    <nue-drawer v-model="drawer2State" open-from="left" title="抽屉2">
        <nue-button @click="drawer1State = true">打开抽屉1</nue-button>
    </nue-drawer>
</template>

<script setup>
import { ref } from 'vue';

const drawer1State = ref(false);
const drawer2State = ref(false);
</script>
