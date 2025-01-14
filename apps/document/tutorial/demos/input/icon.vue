<template>
    <nue-input
        v-model="inputVModel"
        placeholder="Search something"
        icon="search"
    />
</template>

<script setup>
    import { ref } from 'vue';

    const inputVModel = ref('');
</script>
