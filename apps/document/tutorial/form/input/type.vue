<template>
    <nue-div>
        <nue-input v-model="passwordV" type="password" placeholder="Password" />
        <nue-input v-model="numberV" type="number" placeholder="Number" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const passwordV = ref('');
const numberV = ref('');
</script>
