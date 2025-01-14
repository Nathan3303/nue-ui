<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="inputVModel1"
            placeholder="Please input your account"
            clearable
        />
        <nue-input
            v-model="inputVModel2"
            type="password"
            placeholder="Please input your password"
            clearable
            allow-show-password
        />
    </nue-div>
</template>

<script setup>
    import { ref } from 'vue';

    const inputVModel1 = ref('');
    const inputVModel2 = ref('');
</script>
