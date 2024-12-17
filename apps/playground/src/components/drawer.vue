<template>
    <demo title="Drawer 抽屉">
        <nue-div>
            <nue-button @click="drawer1Visible = true">
                Open drawer1
            </nue-button>
            <nue-button @click="drawer2Visible = true">
                Open drawer2
            </nue-button>
        </nue-div>
        <nue-drawer
            v-model:visible="drawer1Visible"
            min-span="360px"
            span="42%"
            title="Drawer1"
        >
            <nue-button @click="drawer2Visible = true">Open drawer2</nue-button>
        </nue-drawer>
        <nue-drawer
            v-model:visible="drawer2Visible"
            min-span="240px"
            open-from="left"
            span="36%"
            title="Drawer2"
        >
            drawer2 content
        </nue-drawer>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NueDrawer from '@nue-ui/components/drawer/drawer.vue';
import Demo from '../layouts/demo.vue';

const drawer1Visible = ref(false);
const drawer2Visible = ref(false);
</script>
