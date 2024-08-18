<template>
    <div class="view-container">
        <demo-card title="Button">
            <button-demo></button-demo>
        </demo-card>
        <demo-card title="ButtonGroup">
            <button-group-demo></button-group-demo>
        </demo-card>
        <demo-card title="Link">
            <link-demo></link-demo>
        </demo-card>
        <demo-card title="Text">
            <text-demo></text-demo>
        </demo-card>
        <demo-card title="Icon">
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
