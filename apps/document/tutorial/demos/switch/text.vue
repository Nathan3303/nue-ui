<template>
    <nue-div align="center" class="vp-raw">
        <nue-switch v-model="state1" show-text />
        <nue-switch
            v-model="state2"
            active-text="开"
            inactive-text="关"
            show-text
        />
        <nue-switch
            v-model="state3"
            active-text="当前状态为开"
            inactive-text="状态：关"
            show-text
        />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const state1 = ref(false);
const state2 = ref(false);
const state3 = ref(false);
</script>
