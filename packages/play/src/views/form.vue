<template>
    <div class="view-container">
        <demo-card title="Input">
            <input-demo></input-demo>
        </demo-card>
        <demo-card title="Select">
            <select-demo></select-demo>
        </demo-card>
        <demo-card title="Switch">
            <switch-demo></switch-demo>
        </demo-card>
        <demo-card title="Checkbox">
            <checkbox-demo></checkbox-demo>
        </demo-card>
    </div>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import InputDemo from "../components/input.vue";
import SelectDemo from "../components/select.vue";
import SwitchDemo from "../components/switch.vue";
import CheckboxDemo from '../components/checkbox.vue';
</script>
