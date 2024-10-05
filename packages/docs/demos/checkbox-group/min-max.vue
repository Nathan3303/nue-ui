<template>
    <nue-checkbox-group
        v-model="activeNames"
        use-controller
        :controller-label="controllerLabel"
        :min="1"
        :max="4">
        <nue-div gap="12px" style="margin-top: 12px">
            <nue-checkbox
                v-for="name in checkboxes"
                :key="name"
                :label="name"
                :name="name" />
        </nue-div>
    </nue-checkbox-group>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const checkboxes = ["游戏", "音乐", "电影", "运动", "旅行"];
const activeNames = ref<string[]>(["游戏", "音乐"]);

const controllerLabel = computed(() => {
    return "1 < " + activeNames.value.length + " < 4";
});
</script>
