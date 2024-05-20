<template>
    <nue-div class="basic-comp" vertical :divider="{}">
        <!-- Button -->
        <nue-div vertical>
            <nue-text weight="bold" size="large">Button</nue-text>
            <button-demo1></button-demo1>
            <button-demo2></button-demo2>
            <button-demo3></button-demo3>
        </nue-div>
        <!-- Link -->
        <nue-div vertical>
            <nue-text weight="bold" size="large">Link</nue-text>
            <link-demo1></link-demo1>
            <link-demo2></link-demo2>
        </nue-div>
        <!-- Text  -->
        <nue-div vertical>
            <nue-text weight="bold" size="large">Text</nue-text>
            <text-demo1></text-demo1>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import ButtonDemo1 from "../components/button/demo1.vue";
import ButtonDemo2 from "../components/button/demo2.vue";
import ButtonDemo3 from "../components/button/demo3.vue";
import LinkDemo1 from "../components/link/demo1.vue";
import LinkDemo2 from "../components/link/demo2.vue";
import TextDemo1 from "../components/text/demo1.vue";
</script>
