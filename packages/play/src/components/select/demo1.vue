<template>
    <nue-div align="center">
        <nue-select size="small"></nue-select>
        <nue-select></nue-select>
        <nue-select size="large"></nue-select>
    </nue-div>
    <nue-divider></nue-divider>
    <nue-div align="center" :divider="{}">
        <nue-div align="center" width="fit-content">
            <nue-select size="small" v-model="size1">
                <nue-select-option label="24px" value="24px" />
                <nue-select-option label="36px" value="36px" />
                <nue-select-option label="48px" value="48px" />
            </nue-select>
            →
            <nue-avatar
                src="https://img.icons8.com/color/48/000000/user-male.png"
                :size="size1"></nue-avatar>
        </nue-div>
        <nue-div align="center" width="fit-content">
            <nue-select size="small" @change="handleSize2Change">
                <li :data-executeid="24">24</li>
                <li :data-executeid="36">36</li>
                <li :data-executeid="48">48</li>
            </nue-select>
            →
            <nue-avatar
                src="https://img.icons8.com/color/48/000000/user-male.png"
                :size="size2"></nue-avatar>
        </nue-div>
    </nue-div>
    <nue-divider></nue-divider>
    <nue-div>
        <nue-select disabled>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
        </nue-select>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const size1 = ref("24px");
const size2 = ref("24px");

// const handleSize1Change = (value: number) => (size1.value = `${value}px`);
const handleSize2Change = (value: number) => (size2.value = `${value}px`);
</script>
