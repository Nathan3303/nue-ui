<template>
    <nue-div>
        <nue-button @click="handleOpenDrawer('top')">
            打开抽屉（上）
        </nue-button>
        <nue-button @click="handleOpenDrawer('bottom')">
            打开抽屉（下）
        </nue-button>
        <nue-button @click="handleOpenDrawer('left')">
            打开抽屉（左）
        </nue-button>
        <nue-button @click="handleOpenDrawer('right')">
            打开抽屉（右）
        </nue-button>
    </nue-div>
    <teleport to="body">
        <nue-drawer
            v-model:visible="drawerState"
            :open-from="drawerOpenFrom"
            title="抽屉标题"
        >
            <nue-text>抽屉内容</nue-text>
        </nue-drawer>
    </teleport>
</template>

<script setup>
    import { ref } from 'vue';

    const drawerState = ref(false);
    const drawerOpenFrom = ref('left');

    const handleOpenDrawer = openFrom => {
        drawerOpenFrom.value = openFrom;
        drawerState.value = true;
    };
</script>
