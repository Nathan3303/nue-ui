<template>
    <div class="view-container">
        <nue-div vertical theme="card">
            <nue-text weight="bold" size="large">Input</nue-text>
            <input-demo1></input-demo1>
        </nue-div>
        <nue-div vertical theme="card">
            <nue-text weight="bold" size="large">Textarea</nue-text>
            <input-demo2></input-demo2>
        </nue-div>
    </div>
</template>

<script setup lang="ts">
import InputDemo1 from "../components/input/demo1.vue";
import InputDemo2 from "../components/input/demo2.vue";
</script>