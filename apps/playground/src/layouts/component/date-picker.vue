<template>
    <demo title="日期选择">
        <nue-date-picker v-model="date" type="date" />
    </demo>
    <demo title="日期和时间选择 & 占位符">
        <nue-date-picker v-model="datetime" type="datetime" placeholder="选择日期和时间！😁" />
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-date-picker
                v-model="size"
                type="datetime"
                clearable
                placeholder="选择日期（小）"
                size="small"
            />
            <nue-date-picker v-model="size" type="datetime" clearable placeholder="选择日期" />
            <nue-date-picker
                v-model="size"
                type="datetime"
                clearable
                placeholder="选择日期（大）"
                size="large"
            />
        </nue-div>
    </demo>
    <demo title="按钮中直接可清除">
        <nue-date-picker v-model="clearable" type="datetime" clearable />
    </demo>
    <demo title="生命周期">
        <nue-date-picker v-model="lifecycle" type="date" @close="NueMessage.info(lifecycle)" />
    </demo>
    <demo title="ISO 格式支持 (日期)">
        <nue-div align="center">
            <nue-date-picker v-model="isoDate" type="date" clearable />
            <nue-text>输入值: {{ isoDate }}</nue-text>
            <nue-div>
                <nue-button size="small" @click="isoDate = '2024-04-20T14:30:00Z'">
                    ISO 带时区
                </nue-button>
                <nue-button size="small" @click="isoDate = '2024-05-01'">标准格式</nue-button>
            </nue-div>
        </nue-div>
    </demo>
    <demo title="ISO 格式支持 (日期时间)">
        <nue-div align="center" wrap="wrap">
            <nue-date-picker v-model="isoDatetime" type="datetime" clearable />
            <nue-text>输入值: {{ isoDatetime }}</nue-text>
            <nue-div>
                <nue-button size="small" @click="isoDatetime = '2024-04-20T14:30:45.123+08:00'">
                    ISO 完整格式
                </nue-button>
                <nue-button size="small" @click="isoDatetime = '2024-04-20 14:30'">
                    标准格式
                </nue-button>
            </nue-div>
        </nue-div>
    </demo>
    <demo title="无效日期处理">
        <nue-div align="center" wrap="wrap">
            <nue-date-picker v-model="invalidDate" type="date" clearable />
            <nue-text>输入值: {{ invalidDate }}</nue-text>
            <nue-div>
                <nue-button size="small" @click="invalidDate = 'invalid-date'">
                    设置无效日期
                </nue-button>
                <nue-button size="small" @click="invalidDate = '2024-02-30'">
                    设置不存在的日期
                </nue-button>
                <nue-button size="small" @click="invalidDate = '2024-04-20'">
                    设置有效日期
                </nue-button>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDatePicker, NueButton, NueDiv, NueText } from '@nue-ui/components';
import Demo from '@/components/demo.vue';
import { ref } from 'vue';
import { NueMessage } from 'nue-ui';

const date = ref('');
const datetime = ref('');
const size = ref('');
const clearable = ref('');
const lifecycle = ref('2026-03-05');
const isoDate = ref('2024-04-20T14:30:00Z');
const isoDatetime = ref('2024-04-20T14:30:45.123+08:00');
const invalidDate = ref('invalid-date');
</script>
