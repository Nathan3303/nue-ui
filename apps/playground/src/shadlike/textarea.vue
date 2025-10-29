<script setup lang="ts">
import { ref } from 'vue';
import { NueDiv, NueTextarea } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const i1 = ref('');
const i2 = ref('');
</script>

<template>
    <demo title="基础">
        <nue-div align="center">
            <nue-textarea v-model="i1" placeholder="请输入..." />
        </nue-div>
    </demo>
    <demo title="纯净主题" sub-title="pure">
        <nue-div align="center">
            <nue-textarea
                v-model="i2"
                placeholder="请输入..."
                theme="pure"
                :autosize="{ minRows: 1, maxRows: 3 }"
                maxlength="128"
                counter="both"
            />
        </nue-div>
    </demo>
</template>

<style scoped></style>
