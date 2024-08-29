<template>
    <div class="view-container">
        <demo-card title="Dialog 对话框">
            <dialog-demo></dialog-demo>
        </demo-card>
        <demo-card title="Drawer 抽屉">
            <drawer-demo></drawer-demo>
        </demo-card>
        <demo-card title="Message 消息提示">
            <message-demo></message-demo>
        </demo-card>
        <demo-card title="Confirm 确认框">
            <confirm-demo></confirm-demo>
        </demo-card>
        <demo-card title="Prompt 输入框">
            <prompt-demo></prompt-demo>
        </demo-card>
        <demo-card title="Tooltip 文字提示">
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
