<template>
    <nue-div>
        <nue-checkbox v-model="state1" disabled label="禁用状态（未选）" />
        <nue-checkbox v-model="state2" disabled label="禁用状态（已选）" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state1 = ref(false);
const state2 = ref(true);
</script>
