<template>
    <nue-calendar v-model="datetimeValue" type="datetime" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const datetimeValue = ref('');
</script>