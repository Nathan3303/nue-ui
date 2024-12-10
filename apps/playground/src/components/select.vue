<template>
    <nue-div align="center">
        <nue-select placeholder="基础选择器" />
        <nue-select disabled placeholder="禁用状态" />
    </nue-div>
    <nue-div align="center" width="fit-content">
        <nue-select
            v-model="size1"
            placeholder="Select to change the avatar size"
            @change="handleSelectChange"
        >
            <nue-select-option :value="24" label="24像素" />
            <nue-select-option :value="36" label="36像素" />
            <nue-select-option :value="48" label="48像素" />
            <nue-select-option :value="56" disabled label="56像素" />
        </nue-select>
        <nue-text size="24px" weight="bold">↔</nue-text>
        <nue-avatar
            :size="`${size1}px`"
            src="https://img.icons8.com/color/48/000000/user-male.png"
        />
        <nue-text size="24px" weight="bold">↔</nue-text>
        <nue-select
            v-model="size1"
            placeholder="Select to change the avatar size"
        >
            <nue-select-option :value="24" label="24像素" />
            <nue-select-option :value="36" label="36像素" />
            <nue-select-option :value="48" label="48像素" />
            <nue-select-option :value="56" label="56像素" />
        </nue-select>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const size1 = ref(24);

function handleSelectChange(value: number) {
    console.log(value);
}
</script>
