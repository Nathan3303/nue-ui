<template>
    <nue-calendar v-model="date" type="datetime">
        <template #cell="{ date }">
            <nue-div vertical gap="0" align="center">
                <span style="line-height: 1">{{ date.getDate() }}</span>
                <span style="font-size: 10px; line-height: 1">
                    {{ date.getDate() === today ? '今天' : '' }}
                </span>
            </nue-div>
        </template>
        <template #footer="{ clear }">
            <nue-div vertical gap="0" align="stretch" width="100%">
                <nue-div
                    justify="space-between"
                    align="center"
                    style="height: var(--nue-box-size-sm); padding: 0 var(--nue-padding-sm)"
                >
                    <nue-text size="var(--nue-text-xs)">已选日期</nue-text>
                    <nue-text size="var(--nue-text-xs)">
                        {{ date ? new Date(date).toLocaleDateString() : '无' }}
                    </nue-text>
                </nue-div>
                <nue-button size="small" theme="ghost" @click="clear">清除选择</nue-button>
            </nue-div>
        </template>
    </nue-calendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const date = ref<string>('');
const today = new Date().getDate();
</script>
