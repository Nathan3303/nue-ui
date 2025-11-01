<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const visible2 = ref(false);
</script>

<template>
    <nue-button @click="visible = true">打开对话框</nue-button>
    <nue-dialog v-model="visible" title="对话框 A">
        <template #content>
            <nue-button @click="visible2 = true">打开对话框 B</nue-button>
        </template>
    </nue-dialog>
    <nue-dialog v-model="visible2" title="对话框 B" />
</template>
