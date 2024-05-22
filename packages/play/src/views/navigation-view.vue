<template>
    <nue-div vertical :divider="{}">
        <nue-div vertical>
            <nue-text size="large" weight="bold">Dropdown</nue-text>
            <dropdown-demo1></dropdown-demo1>
            <dropdown-demo2></dropdown-demo2>
            <dropdown-demo3></dropdown-demo3>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import DropdownDemo1 from "../components/dropdown/demo1.vue";
import DropdownDemo2 from "../components/dropdown/demo2.vue";
import DropdownDemo3 from "../components/dropdown/demo3.vue";
</script>

<style scoped></style>
