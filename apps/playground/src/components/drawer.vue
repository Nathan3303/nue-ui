<template>
    <nue-div>
        <nue-button @click="drawer1Visible = true">Open drawer1</nue-button>
        <nue-button @click="drawer2Visible = true">Open drawer2</nue-button>
    </nue-div>
    <nue-drawer
        v-model:visible="drawer1Visible"
        span="42%"
        min-span="360px"
        title="Drawer1"
    >
        <nue-text tag="p">drawer1 content</nue-text>
        <nue-button @click="drawer2Visible = true">Open drawer2</nue-button>
    </nue-drawer>
    <nue-drawer
        v-model:visible="drawer2Visible"
        span="36%"
        min-span="240px"
        title="Drawer2"
        open-from="left"
    >
        drawer2 content
    </nue-drawer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const drawer1Visible = ref(false);
    const drawer2Visible = ref(false);
</script>
