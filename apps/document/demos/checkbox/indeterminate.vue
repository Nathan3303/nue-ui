<template>
    <nue-div>
        <nue-checkbox v-model="state1" label="未选中" />
        <nue-checkbox
            v-model="state2"
            :indeterminate="isIndeterminate"
            label="中间状态"
        />
        <nue-checkbox v-model="state3" label="已选中" />
    </nue-div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const state1 = ref(false);
    const state2 = ref(false);
    const state3 = ref(true);
    const isIndeterminate = ref(true);
</script>
