<template>
    <demo title="基础">
        <nue-div>
            <nue-select placeholder="基础选择器">
                <nue-select-option label="一些选项..." value="some options..." />
            </nue-select>
            <nue-select placeholder="基础选择器" />
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-select v-model="s2" placeholder="小型选择器" size="small">
                <nue-select-option label="选项 A" value="option a" />
                <nue-select-option label="选项 B" value="option b" />
            </nue-select>
            <nue-select v-model="s2" placeholder="大型选择器" size="large">
                <nue-select-option label="选项 A" value="option a" />
                <nue-select-option label="选项 B" value="option b" />
            </nue-select>
        </nue-div>
    </demo>
    <demo title="值传递">
        <nue-div align="center" width="fit-content">
            <nue-select v-model="s1" placeholder="选择大小">
                <nue-select-option :value="54" label="54像素" />
                <nue-select-option :value="72" label="72像素" />
                <nue-select-option :value="96" label="96像素" />
                <nue-select-option :value="128" disabled label="128像素" />
            </nue-select>
            =
            <nue-select v-model="s1" placeholder="选择大小">
                <nue-select-option :value="54" label="54像素" />
                <nue-select-option :value="72" label="72像素" />
                <nue-select-option :value="96" label="96像素" />
                <nue-select-option :value="128" label="128像素" />
            </nue-select>
            =
            <nue-avatar :size="`${s1}px`" theme="round">{{ s1 }}</nue-avatar>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueSelect, NueSelectOption, NueAvatar } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const s1 = ref(128);
const s2 = ref('option a');
</script>
