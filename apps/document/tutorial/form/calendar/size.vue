<template>
    <nue-div vertical gap="lg" align="start">
        <nue-div vertical gap="sm" align="start">
            <nue-text theme="placeholder">small</nue-text>
            <nue-calendar v-model="dateValue" size="small" />
        </nue-div>
        <nue-div vertical gap="sm" align="start">
            <nue-text theme="placeholder">default</nue-text>
            <nue-calendar v-model="dateValue" />
        </nue-div>
        <nue-div vertical gap="sm" align="start">
            <nue-text theme="placeholder">large</nue-text>
            <nue-calendar v-model="dateValue" size="large" />
        </nue-div>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref('');
</script>