<template>
    <nue-div vertical align="stretch">
        <nue-input
            v-model="v1"
            icon="edit"
            placeholder="文本类型（可清除、带输入计数、最大输入长度为64、防抖时间256ms）"
            clearable
            counter="both"
            :debounce-time="256"
            maxlength="64"
        />
        <nue-div>
            <nue-input
                v-model="password"
                icon="lock"
                type="password"
                placeholder="密码类型（可清除、允许查看密码）"
                clearable
                allow-show-password
                style="flex: auto"
            />
            <nue-input placeholder="禁用状态" disabled style="flex: auto" />
        </nue-div>
        <nue-div align="center">
            <nue-input
                theme="noshape"
                placeholder="无边框主题"
                v-model="v2"
                style="flex: auto"
            />
            <nue-input
                size="small"
                placeholder="小型输入框"
                v-model="v2"
                icon="search"
                style="flex: auto"
            />
            <nue-input
                icon="search"
                size="large"
                placeholder="大型输入框"
                v-model="v2"
                style="flex: auto"
            />
        </nue-div>
        <nue-textarea
            v-model="artical"
            placeholder="富文本框（最大输入长度512、带输入计数、自动高度、最大输入行数99）"
            maxlength="512"
            counter="both"
            autosize
            :rows="99"
        />
        <nue-div>
            <nue-textarea
                v-model="description"
                placeholder="富文本框（允许手动调整高度、无最大行数限制）"
                resize
                :rows="0"
                style="flex: auto"
            />
            <nue-textarea
                disabled
                v-model="description"
                placeholder="禁用状态"
                style="flex: auto"
            />
        </nue-div>
    </nue-div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const v1 = ref('');
    const v2 = ref('');
    const password = ref('');
    const description = ref('');
    const artical = ref('');
</script>

<style scoped></style>
