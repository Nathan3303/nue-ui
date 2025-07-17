<template>
    <nue-div align="stretch" vertical>
        <nue-collapse v-model="activeNames">
            <nue-collapse-item name="Collapse item A" title="折叠面板组件 A">
                <nue-text>Collapse item A</nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="Collapse item B" title="折叠面板组件 B">
                <nue-text>Collapse item B</nue-text>
            </nue-collapse-item>
        </nue-collapse>
        <nue-div>已展开的面板: {{ activeNames }}</nue-div>
    </nue-div>
</template>

<script setup>
import { ref } from 'vue';

const activeNames = ref([]);
</script>
