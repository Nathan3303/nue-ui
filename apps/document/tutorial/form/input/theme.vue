<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel"
            placeholder="搜索"
            icon="search"
            theme="linear"
        />
    </nue-div>
</template>

<script setup>
    import { ref } from 'vue';

    const inputVModel = ref('');
</script>

<style scoped>
    .nue-input--linear {
        transition: all 0.3s;
        border: none;
        border-bottom: 2px solid #cccccc;
        border-radius: 0px;

        --border-width: 0px;
        --padding-y: 4px;
        --hover-border-color: #8ac7ab;
        --focus-border-color: #42b983;
        --focus-shadow-color: transparent;
        --focus-background-color: transparent;

        &:focus-within {
            border: none;
            border-bottom: 2px solid #42b983;
        }
    }
</style>
