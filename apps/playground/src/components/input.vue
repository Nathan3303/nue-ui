<template>
    <nue-div align="stretch" vertical>
        <nue-input
            v-model="v1"
            :debounce-time="256"
            clearable
            counter="both"
            icon="edit"
            maxlength="64"
            placeholder="文本类型（可清除、带输入计数、最大输入长度为64、防抖时间256ms）"
        />
        <nue-input
            v-model="password"
            allow-show-password
            clearable
            icon="lock"
            placeholder="密码类型（可清除、允许查看密码）"
            style="flex: auto"
            type="password"
        />
        <nue-input disabled placeholder="禁用状态" style="flex: auto" />
        <nue-textarea
            v-model="artical"
            :rows="99"
            autosize
            counter="both"
            maxlength="512"
            placeholder="长度512、行数99、带计数、自动高度"
        />
        <nue-textarea
            v-model="description"
            :rows="0"
            placeholder="允许手动调整高度、无行数限制"
            resize
            style="flex: auto"
        />
        <nue-textarea
            v-model="description"
            disabled
            placeholder="禁用状态"
            style="flex: auto"
        />
    </nue-div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const v1 = ref('');
const password = ref('');
const description = ref('');
const artical = ref('');
</script>

<style scoped></style>
