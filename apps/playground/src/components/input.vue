<template>
    <demo title="基础">
        <nue-div align="center">
            <nue-input v-model="i1" placeholder="请输入..." />
            <nue-input v-model="i1" icon="edit" />
            <nue-text>{{ i1 }}</nue-text>
        </nue-div>
    </demo>
    <demo title="禁用 & 只读">
        <nue-div>
            <nue-input disabled placeholder="disabled" />
            <nue-input placeholder="readonly" readonly />
        </nue-div>
    </demo>
    <demo title="类型">
        <nue-div>
            <nue-input v-model="i2" placeholder="type=text" type="text" />
            <nue-input v-model="i2" placeholder="type=password" type="password" />
            <nue-input v-model="i2" placeholder="type=email" type="email" />
        </nue-div>
    </demo>
    <demo title="清空按钮 & 显示密码按钮">
        <nue-div>
            <nue-input v-model="i3" allow-show-password clearable type="password" />
        </nue-div>
    </demo>
    <demo title="输入最大长度 & 输入计数">
        <nue-div>
            <nue-input v-model="i4" maxlength="24" placeholder="maxlength=24" />
            <nue-input
                v-model="i4"
                counter="word-limit"
                maxlength="24"
                placeholder="counter=word-limit"
            />
            <nue-input v-model="i4" counter="both" maxlength="24" placeholder="counter=both" />
        </nue-div>
    </demo>
    <demo title="防抖">
        <nue-div align="center">
            <nue-input v-model="i5" :debounce-time="256" />
            <nue-text>{{ i5 }}</nue-text>
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-input v-model="i6" placeholder="size=small" size="small" />
            <nue-input v-model="i6" placeholder="size=large" size="large" />
        </nue-div>
    </demo>
    <demo title="主题">
        <nue-div align="center">
            <nue-input v-model="i7" theme="pure" />
            <nue-input v-model="i7" theme="rounded" />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueInput, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const i1 = ref('');
const i2 = ref('');
const i3 = ref('');
const i4 = ref('');
const i5 = ref('');
const i6 = ref('');
const i7 = ref('');
</script>

<style scoped></style>
