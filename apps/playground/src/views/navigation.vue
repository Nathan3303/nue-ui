<template>
    <nue-div class="view-container">
        <demo-card title="Dropdown 下拉列表">
            <dropdown-demo></dropdown-demo>
        </demo-card>
    </nue-div>
    <teleport to="#outline">
        <ul class="outline-list">
            <li><a href="#Dropdown 下拉列表">Dropdown 下拉列表</a></li>
        </ul>
    </teleport>
</template>

<script lang="ts" setup>
import DemoCard from '../layers/demo-card';
import DropdownDemo from '../components/dropdown.vue';
</script>
