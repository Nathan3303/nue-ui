<template>
    <div class="view-container">
        <nue-div vertical theme="card">
            <nue-text size="large">Dialog</nue-text>
            <nue-div>
                <dialog-demo1></dialog-demo1>
                <dialog-demo2></dialog-demo2>
            </nue-div>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Drawer</nue-text>
            <drawer-demo1></drawer-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Message</nue-text>
            <message-demo1></message-demo1>
            <message-demo2></message-demo2>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Confirm</nue-text>
            <confirm-demo1></confirm-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text size="large">Prompt</nue-text>
            <prompt-demo1></prompt-demo1>
        </nue-div>
    </div>
</template>

<script setup lang="ts">
import DialogDemo1 from "../components/dialog/demo1.vue";
import DialogDemo2 from "../components/dialog/demo2.vue";
import DrawerDemo1 from "../components/drawer/demo1.vue";
import MessageDemo1 from "../components/message/demo1.vue";
import MessageDemo2 from "../components/message/demo2.vue";
import ConfirmDemo1 from "../components/confirm/demo1.vue";
import PromptDemo1 from "../components/prompt/demo1.vue";
</script>
