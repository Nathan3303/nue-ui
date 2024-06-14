<template>
    <nue-div align="center">
        <nue-select size="small"></nue-select>
        <nue-select></nue-select>
        <nue-select size="large"></nue-select>
    </nue-div>
    <nue-divider></nue-divider>
    <nue-div align="center">
        <nue-select size="small" @change="handleChange">
            <li :data-executeid="24">24</li>
            <li :data-executeid="36">36</li>
            <li :data-executeid="48">48</li>
        </nue-select>
        <nue-avatar
            src="https://img.icons8.com/color/48/000000/user-male.png"
            :size="size"></nue-avatar>
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

const size = ref("24px");

function handleChange(value: number) {
    size.value = `${value}px`;
}
</script>

<style scoped></style>
