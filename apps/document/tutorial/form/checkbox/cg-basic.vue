<template>
    <nue-checkbox-group v-model="activeNames">
        <nue-div gap="12px">
            <nue-checkbox v-for="name in checkboxes" :key="name" :label="name" :name="name" />
            <nue-checkbox label="未命名复选框" />
        </nue-div>
    </nue-checkbox-group>
    <nue-text>已选中：{{ activeNames.join(', ') || 'none' }}</nue-text>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxes = ['游戏', '音乐', '电影'];
const activeNames = ref([]);
</script>
