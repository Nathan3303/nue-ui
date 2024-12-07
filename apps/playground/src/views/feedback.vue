<template>
    <nue-div class="view-container">
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
    </nue-div>
    <teleport to="#outline">
        <ul class="outline-list">
            <li><a href="#Dialog 对话框">Dialog 对话框</a></li>
            <li><a href="#Drawer 抽屉">Drawer 抽屉</a></li>
            <li><a href="#Message 消息提示">Message 消息提示</a></li>
            <li><a href="#Confirm 确认框">Confirm 确认框</a></li>
            <li><a href="#Prompt 输入框">Prompt 输入框</a></li>
            <li><a href="#Tooltip 文字提示">Tooltip 文字提示</a></li>
        </ul>
    </teleport>
</template>

<script lang="ts" setup>
import DemoCard from '../layers/demo-card';
import DialogDemo from '../components/dialog.vue';
import DrawerDemo from '../components/drawer.vue';
import MessageDemo from '../components/message.vue';
import ConfirmDemo from '../components/confirm.vue';
import PromptDemo from '../components/prompt.vue';
import TooltipDemo from '../components/tooltip.vue';
</script>
