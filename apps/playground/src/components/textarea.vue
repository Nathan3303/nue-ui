<template>
    <demo title="基础">
        <nue-div>
            <nue-textarea v-model="t1" placeholder="请输入..." />
            <nue-text>{{ t1 }}</nue-text>
        </nue-div>
    </demo>
    <demo title="禁用 & 只读">
        <nue-div>
            <nue-textarea disabled placeholder="disabled" />
            <nue-textarea placeholder="readonly" readonly />
        </nue-div>
    </demo>
    <demo title="输入最大长度 & 输入计数">
        <nue-div>
            <nue-textarea v-model="t2" maxlength="128" placeholder="maxlength=128" />
            <nue-textarea
                v-model="t2"
                counter="word-limit"
                maxlength="128"
                placeholder="counter=word-limit"
            />
            <nue-textarea v-model="t2" counter="both" maxlength="128" placeholder="counter=both" />
        </nue-div>
    </demo>
    <demo title="防抖">
        <nue-div>
            <nue-textarea v-model="t3" :debounce-time="256" placeholder="debounceTime=256ms" />
            <nue-text>{{ t3 }}</nue-text>
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-textarea v-model="t4" placeholder="size=small" size="small" />
            <nue-textarea v-model="t4" placeholder="size=large" size="large" />
        </nue-div>
    </demo>
    <demo title="主题">
        <nue-div align="center">
            <nue-textarea v-model="t5" placeholder="theme=pure" theme="pure" />
        </nue-div>
    </demo>
    <demo title="自动高度 & 最大高度">
        <nue-div align="center">
            <nue-textarea v-model="t6" :rows="6" autosize placeholder="rows=6(max), autosize" />
            <nue-textarea
                v-model="t6"
                :autosize="{ minRows: 2, maxRows: 6 }"
                placeholder="autosize={minRows:2, maxRows:6}"
            />
        </nue-div>
    </demo>
    <demo title="手动调整">
        <nue-div align="center">
            <nue-textarea v-model="t7" :rows="4" resize />
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Demo from '../layouts/demo.vue';
import { NueDiv, NueTextarea, NueText } from '@nue-ui/components';

const t1 = ref('');
const t2 = ref('');
const t3 = ref('');
const t4 = ref('');
const t5 = ref('');
const t6 = ref('');
const t7 = ref('');
</script>

<style scoped></style>
