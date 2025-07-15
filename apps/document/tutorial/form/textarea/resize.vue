<template>
    <nue-div align="center">
        <nue-textarea v-model="textareaValue" :rows="4" resize />
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const textareaValue = ref('');
</script>
