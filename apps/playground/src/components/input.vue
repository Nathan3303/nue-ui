<template>
    <demo title="Input 输入框">
        <nue-div vertical>
            <nue-div>
                <nue-input
                    v-model="i1"
                    :debounce-time="256"
                    clearable
                    counter="both"
                    icon="edit"
                    maxlength="64"
                    placeholder="文本、可清除、带输入计数、最大输入长度为64、防抖时间256ms"
                />
                <nue-input
                    v-model="i2"
                    allow-show-password
                    clearable
                    icon="lock"
                    placeholder="密码、可清除、允许查看密码"
                    type="password"
                />
            </nue-div>
            <nue-div>
                <nue-input disabled placeholder="禁用状态" />
                <nue-input v-model="i6" placeholder="只读状态" readonly />
            </nue-div>
            <nue-div align="center">
                <nue-input
                    v-model="i3"
                    clearable
                    placeholder="大型输入框"
                    size="large"
                />
                <nue-input
                    v-model="i3"
                    clearable
                    placeholder="小型输入框"
                    size="small"
                />
            </nue-div>
            <nue-div>
                <nue-input
                    v-model="i7"
                    clearable
                    icon="edit"
                    placeholder="基础输入框"
                    theme="noshape"
                />
                <nue-input
                    v-model="i4"
                    clearable
                    icon="edit"
                    placeholder="基础输入框"
                    theme="linear"
                />
                <nue-input
                    v-model="i5"
                    clearable
                    icon="edit"
                    placeholder="基础输入框"
                    theme="rounded"
                />
            </nue-div>
        </nue-div>
    </demo>
    <demo title="Textarea 富文本框">
        <nue-div vertical>
            <nue-div>
                <nue-textarea
                    v-model="t1"
                    :rows="99"
                    autosize
                    counter="both"
                    maxlength="512"
                    placeholder="长度512、行数99、带计数、自动高度"
                />
                <nue-textarea
                    v-model="t2"
                    :rows="0"
                    placeholder="允许手动调整高度、无行数限制"
                    resize
                />
            </nue-div>
            <nue-div>
                <nue-textarea v-model="t3" disabled placeholder="禁用状态" />
                <nue-textarea v-model="t6" placeholder="只读状态" readonly />
            </nue-div>
            <nue-div align="center">
                <nue-textarea
                    v-model="t5"
                    placeholder="大型富文本框"
                    size="large"
                />
                <nue-textarea
                    v-model="t5"
                    placeholder="小型富文本框"
                    size="small"
                />
            </nue-div>
            <nue-div align="center">
                <nue-textarea
                    v-model="t7"
                    :rows="0"
                    autosize
                    placeholder="基础富文本框"
                    theme="noshape"
                />
                <nue-textarea
                    v-model="t4"
                    :rows="0"
                    autosize
                    placeholder="基础富文本框"
                    theme="linear"
                />
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueInput, NueTextarea } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const i1 = ref('');
const i2 = ref('');
const i3 = ref('');
const i4 = ref('');
const i5 = ref('');
const i6 = ref('只读状态（一些文字...）');
const i7 = ref('');

const t1 = ref('');
const t2 = ref('');
const t3 = ref('');
const t4 = ref('');
const t5 = ref('');
const t6 = ref('只读状态（一些文字...）');
const t7 = ref('');
</script>

<style scoped></style>
