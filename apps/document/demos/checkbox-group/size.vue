<template>
    <nue-div vertical>
        <nue-checkbox-group v-model="activeNames" size="large">
            <nue-div gap="12px">
                <nue-checkbox
                    v-for="name in checkboxes"
                    :key="name"
                    :label="name"
                    :name="name"
                />
            </nue-div>
        </nue-checkbox-group>
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checkboxes = ['游戏', '音乐', '电影'];
const activeNames = ref([]);
</script>
