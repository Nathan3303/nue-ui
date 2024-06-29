<template>
    <nue-div align="center">
        <nue-select placeholder="Select an option"></nue-select>
        <nue-select placeholder="Select an option" disabled></nue-select>
    </nue-div>
    <nue-div align="center">
        <nue-div align="center" width="fit-content">
            <nue-select
                v-model="size1"
                placeholder="Select to change the avatar size">
                <nue-select-option label="24px" :value="24" />
                <nue-select-option label="36px" :value="36" />
                <nue-select-option label="48px" :value="48" />
                <nue-select-option label="56px" :value="56" disabled />
            </nue-select>
            →
            <nue-avatar
                src="https://img.icons8.com/color/48/000000/user-male.png"
                :size="`${size1}px`"></nue-avatar>
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const size1 = ref(24);
</script>
