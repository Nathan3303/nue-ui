<template>
    <div class="view-container">
        <demo-card title="Input 输入框">
            <input-demo></input-demo>
        </demo-card>
        <demo-card title="Select 选择器">
            <select-demo></select-demo>
        </demo-card>
        <demo-card title="Switch 开关">
            <switch-demo></switch-demo>
        </demo-card>
        <demo-card title="Checkbox 复选框">
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
