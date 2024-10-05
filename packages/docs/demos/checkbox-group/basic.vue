<template>
    <nue-div vertical>
        <nue-checkbox-group v-model="activeNames">
            <nue-div gap="12px">
                <nue-checkbox
                    v-for="name in checkboxes"
                    :key="name"
                    :label="name"
                    :name="name" />
                <nue-checkbox label="未命名复选框" />
            </nue-div>
        </nue-checkbox-group>
        <nue-text size="14px">
            已选中：{{ activeNames.join(", ") || "none" }}
        </nue-text>
    </nue-div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checkboxes = ["游戏", "音乐", "电影"];
const activeNames = ref([]);
</script>
