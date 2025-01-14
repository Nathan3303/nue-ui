<template>
    <nue-div>
        <nue-button @click="drawer1State = true">打开抽屉1</nue-button>
        <nue-button @click="drawer2State = true">打开抽屉2</nue-button>
    </nue-div>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawer1State"
            title="抽屉1"
            span="50%"
            min-span="360px"
        >
            <nue-button @click="drawer2State = true">打开抽屉2</nue-button>
        </nue-drawer>
        <nue-drawer
            v-model:visible="drawer2State"
            title="抽屉2"
            open-from="left"
        >
            <nue-button @click="drawer1State = true">打开抽屉1</nue-button>
        </nue-drawer>
    </teleport>
</template>

<script setup>
    import { ref } from 'vue';

    const drawer1State = ref(false);
    const drawer2State = ref(false);
</script>
