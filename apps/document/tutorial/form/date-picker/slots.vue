<script setup lang="ts">
import { ref } from 'vue';

const date = ref<string>(new Date().toISOString());
</script>

<template>
    <nue-date-picker size="small" v-model="date" type="datetime" clearable>
        <template #cell="{ date }">
            <nue-div vertical gap="0" align="center">
                <span style="line-height: 1">{{ date.getDate() }}</span>
                <span style="font-size: 10px; line-height: 1">
                    {{ date.getDate() === new Date().getDate() ? '今天' : '' }}
                </span>
            </nue-div>
        </template>
        <template #footer>
            <nue-div vertical gap="0" align="stretch" width="100%">
                <nue-div
                    justify="space-between"
                    align="center"
                    style="height: var(--nue-box-size-sm); padding: 0 var(--nue-padding-sm)"
                >
                    <nue-text size="var(--nue-text-xs)">提醒</nue-text>
                    <nue-switch size="small" style="--nue-switch-height: 1rem" />
                </nue-div>
                <nue-div
                    justify="space-between"
                    align="center"
                    style="height: var(--nue-box-size-sm); padding: 0 var(--nue-padding-sm)"
                >
                    <nue-text size="var(--nue-text-xs)">提醒时间</nue-text>
                    <nue-text size="var(--nue-text-xs)">xx : xx</nue-text>
                </nue-div>
                <nue-dropdown style="width: 100%" size="small" placement="right-start">
                    <template #trigger="{ trigger }">
                        <nue-dropdown-item @click="trigger" size="small" use-suffix-icon>
                            提醒周期
                        </nue-dropdown-item>
                    </template>
                    <nue-dropdown-item execute-id="reminder-repeat-day" size="small">
                        每天
                    </nue-dropdown-item>
                    <nue-dropdown-item execute-id="reminder-repeat-week" size="small">
                        每周
                    </nue-dropdown-item>
                </nue-dropdown>
            </nue-div>
        </template>
    </nue-date-picker>
</template>

<style scoped></style>