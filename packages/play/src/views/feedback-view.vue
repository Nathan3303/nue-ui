<template>
    <nue-div vertical :divider="{}">
        <nue-div vertical>
            <nue-text size="large">Dialog</nue-text>
            <dialog-demo1></dialog-demo1>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Drawer</nue-text>
            <drawer-demo1></drawer-demo1>
        </nue-div>
        <nue-div vertical>
            <nue-text size="large">Message</nue-text>
            <message-demo1></message-demo1>
            <message-demo2></message-demo2>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import DialogDemo1 from "../components/dialog/demo1.vue";
import DrawerDemo1 from "../components/drawer/demo1.vue";
import MessageDemo1 from "../components/message/demo1.vue";
import MessageDemo2 from "../components/message/demo2.vue";
</script>
