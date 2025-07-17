<template>
    <nue-div>
        <nue-checkbox v-model="state1" label="未选中" />
        <nue-checkbox v-model="state2" indeterminate label="中间状态" />
        <nue-checkbox v-model="state3" indeterminate label="已选中" />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state1 = ref(false);
const state2 = ref(false);
const state3 = ref(true);
</script>
