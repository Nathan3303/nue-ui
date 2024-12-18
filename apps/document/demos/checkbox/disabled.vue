<template>
    <nue-div>
        <nue-checkbox v-model="state" label="正常复选框" />
        <nue-checkbox v-model="state" disabled label="禁用复选框" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state = ref(false);
</script>
