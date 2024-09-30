<template>
    <div class="view-container">
        <demo-card title="Dropdown 下拉框">
            <dropdown-demo></dropdown-demo>
        </demo-card>
    </div>
    <teleport to="#outline">
        <ul class="outline-list">
            <h3>大纲</h3>
            <li><a href="#Dropdown 下拉框">Dropdown 下拉框</a></li>
        </ul>
    </teleport>
</template>

<script setup lang="ts">
import DemoCard from "../layers/demo-card";
import DropdownDemo from "../components/dropdown.vue";
</script>
