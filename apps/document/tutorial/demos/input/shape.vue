<template>
    <nue-div align="center">
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            shape="rounded"
        />
        <nue-input
            v-model="inputVModel"
            placeholder="Please input something"
            shape="noshape"
        />
    </nue-div>
</template>

<script setup>
    import { ref } from 'vue';

    const inputVModel = ref('');
</script>
