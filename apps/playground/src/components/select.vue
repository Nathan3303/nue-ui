<template>
    <nue-div align="center">
        <nue-select placeholder="基础选择器" />
        <nue-select placeholder="禁用状态" disabled />
    </nue-div>
    <nue-div align="center">
        <nue-div align="center" width="fit-content">
            <nue-select
                v-model="size1"
                placeholder="Select to change the avatar size"
                @change="handleSelectChange"
            >
                <nue-select-option label="24像素" :value="24" />
                <nue-select-option label="36像素" :value="36" />
                <nue-select-option label="48像素" :value="48" />
                <nue-select-option label="56像素" :value="56" disabled />
            </nue-select>
            <nue-text size="24px" weight="bold">↔</nue-text>
            <nue-avatar
                src="https://img.icons8.com/color/48/000000/user-male.png"
                :size="`${size1}px`"
            />
            <nue-text size="24px" weight="bold">↔</nue-text>
            <nue-select
                v-model="size1"
                placeholder="Select to change the avatar size"
            >
                <nue-select-option label="24像素" :value="24" />
                <nue-select-option label="36像素" :value="36" />
                <nue-select-option label="48像素" :value="48" />
                <nue-select-option label="56像素" :value="56" />
            </nue-select>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const size1 = ref(24);

    function handleSelectChange(value: number) {
        console.log(value);
    }
</script>
