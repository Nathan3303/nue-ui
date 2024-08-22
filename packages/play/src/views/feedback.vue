<template>
    <div class="view-container">
        <demo-card title="Dialog">
            <dialog-demo></dialog-demo>
        </demo-card>
        <demo-card title="Drawer">
            <drawer-demo></drawer-demo>
        </demo-card>
        <demo-card title="Message">
            <message-demo></message-demo>
        </demo-card>
        <demo-card title="Confirm">
            <confirm-demo></confirm-demo>
        </demo-card>
        <demo-card title="Prompt">
            <prompt-demo></prompt-demo>
        </demo-card>
        <demo-card title="Tooltip">
            <tooltip-demo></tooltip-demo>
        </demo-card>
    </div>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import DialogDemo from "../components/dialog.vue";
import DrawerDemo from "../components/drawer.vue";
import MessageDemo from "../components/message.vue";
import ConfirmDemo from "../components/confirm.vue";
import PromptDemo from "../components/prompt.vue";
import TooltipDemo from '../components/tooltip.vue';
</script>
