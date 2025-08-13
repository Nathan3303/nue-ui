<script setup lang="ts">
import { ref } from 'vue';
import { NueDiv, NueInput } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const i1 = ref('');
const i2 = ref('');
</script>

<template>
    <demo title="基础">
        <nue-div align="center">
            <nue-input v-model="i1" placeholder="请输入..." />
        </nue-div>
    </demo>
    <demo title="纯净主题" sub-title="pure">
        <nue-div align="center">
            <nue-input v-model="i2" placeholder="请输入..." theme="pure" icon="edit" clearable />
        </nue-div>
    </demo>
</template>

<style scoped></style>
