<template>
    <div class="view-container">
        <!-- Button -->
        <nue-div vertical theme="card" :divider="{}">
            <nue-text size="24px">Button</nue-text>
            <button-demo1></button-demo1>
        </nue-div>
        <!-- ButtonGroup -->
        <nue-div vertical theme="card" :divider="{}">
            <nue-text size="24px">ButtonGroup</nue-text>
            <button-group-demo1></button-group-demo1>
        </nue-div>
        <!-- Link -->
        <nue-div vertical theme="card" :divider="{}">
            <nue-text size="24px">Link</nue-text>
            <link-demo1></link-demo1>
            <link-demo2></link-demo2>
        </nue-div>
        <!-- Text  -->
        <nue-div vertical theme="card" :divider="{}">
            <nue-text size="24px">Text</nue-text>
            <text-demo1></text-demo1>
        </nue-div>
        <!-- Icon -->
        <nue-div vertical theme="card" :divider="{}">
            <nue-text size="24px">Icon</nue-text>
            <icon-demo1></icon-demo1>
        </nue-div>
    </div>
</template>

<script setup lang="ts">
import ButtonDemo1 from "../components/button/demo1.vue";
import ButtonGroupDemo1 from "../components/button-group/demo1.vue";
import LinkDemo1 from "../components/link/demo1.vue";
import LinkDemo2 from "../components/link/demo2.vue";
import TextDemo1 from "../components/text/demo1.vue";
import IconDemo1 from "../components/icon/demo1.vue";
</script>
