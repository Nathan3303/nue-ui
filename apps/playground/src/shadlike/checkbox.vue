<template>
    <demo title="默认主题">
        <nue-div align="center">
            <nue-checkbox v-model="chk1">Original</nue-checkbox>
            <nue-checkbox v-model="chk1" disabled>Disabled</nue-checkbox>
        </nue-div>
    </demo>
    <demo title="边框主题" sub-title="bordered">
        <nue-div align="center">
            <nue-checkbox v-model="chk1" theme="bordered">Original</nue-checkbox>
            <nue-checkbox v-model="chk1" theme="bordered" disabled>Disabled</nue-checkbox>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueCheckbox } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const chk1 = ref(false);
</script>
