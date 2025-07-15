<template>
    <nue-checkbox-group v-model="activeNames" controller-label="全选" use-controller>
        <nue-div gap="12px">
            <nue-checkbox v-for="name in checkboxes" :key="name" :label="name" :name="name" />
        </nue-div>
    </nue-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxes = ['游戏', '音乐', '电影', '运动', '旅行'];
const activeNames = ref<string[]>(['游戏', '音乐']);
</script>
