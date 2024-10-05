<template>
    <nue-div height="128px">
        <nue-select v-model="selectVModel" placeholder="请选择一个选项">
            <nue-select-option label="选项 A" value="1" />
            <nue-select-option label="选项 B" value="2" />
        </nue-select>
    </nue-div>
</template>

<script setup>
import { ref } from "vue";

const selectVModel = ref(null);
</script>
