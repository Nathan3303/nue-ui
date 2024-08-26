<template>
    <div class="view-container">
        <demo-card title="Button 按钮">
            <button-demo></button-demo>
        </demo-card>
        <demo-card title="ButtonGroup 按钮组">
            <button-group-demo></button-group-demo>
        </demo-card>
        <demo-card title="Link 链接">
            <link-demo></link-demo>
        </demo-card>
        <demo-card title="Text 文本">
            <text-demo></text-demo>
        </demo-card>
        <demo-card title="Icon 图标">
            <icon-demo></icon-demo>
        </demo-card>
    </div>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import ButtonDemo from "../components/button.vue";
import ButtonGroupDemo from "../components/button-group.vue";
import LinkDemo from "../components/link.vue";
import TextDemo from "../components/text.vue";
import IconDemo from "../components/icon.vue";
</script>
