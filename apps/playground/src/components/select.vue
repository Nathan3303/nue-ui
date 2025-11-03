<template>
    <demo title="基础">
        <nue-div>
            <nue-select placeholder="基础选择器">
                <nue-select-option label="一些选项..." value="some options..." />
            </nue-select>
            <nue-select placeholder="空选择器" />
        </nue-div>
    </demo>
    <demo title="禁用">
        <nue-div>
            <nue-select placeholder="禁用选择器" disabled></nue-select>
            <nue-select placeholder="禁用选项">
                <nue-select-option label="选项 A" value="option-a" />
                <nue-select-option label="选项 B" value="option-b" disabled />
            </nue-select>
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center">
            <nue-select v-model="s2" placeholder="小型选择器" size="small">
                <nue-select-option label="选项 A" value="option a" />
                <nue-select-option label="选项 B" value="option b" />
            </nue-select>
            <nue-select v-model="s2" placeholder="大型选择器" size="large">
                <nue-select-option label="选项 A" value="option a" />
                <nue-select-option label="选项 B" value="option b" />
            </nue-select>
        </nue-div>
    </demo>
    <demo title="值传递">
        <nue-div align="center" width="fit-content">
            <nue-select v-model="s1" placeholder="选择大小">
                <nue-select-option :value="54" label="54像素" />
                <nue-select-option :value="72" label="72像素" />
                <nue-select-option :value="96" label="96像素" />
                <nue-select-option :value="128" disabled label="128像素" />
            </nue-select>
            =
            <nue-select v-model="s1" placeholder="选择大小">
                <nue-select-option :value="54" label="54像素" />
                <nue-select-option :value="72" label="72像素" />
                <nue-select-option :value="96" label="96像素" />
                <nue-select-option :value="128" label="128像素" />
            </nue-select>
            =
            <nue-avatar :size="`${s1}px`" theme="round">{{ s1 }}</nue-avatar>
        </nue-div>
    </demo>
    <demo title="选项组件">
        <nue-select v-model="s3">
            <nue-select-option icon="theme" value="icon" label="图标选项" />
            <nue-select-option value="custom-content" label="自定义主体">
                <nue-div align="center" gap="0.5rem">
                    <nue-avatar
                        theme="round"
                        size="1.75rem"
                        src="https://avatars.githubusercontent.com/u/67311306?v=4&size=64"
                    />
                    <nue-text>Nathan</nue-text>
                </nue-div>
            </nue-select-option>
            <nue-select-option value="append-slot" label="自定义追加插槽">
                <template #append>
                    <nue-text size="0.875rem" color="orange">+5</nue-text>
                </template>
            </nue-select-option>
            <nue-select-option value="loading" label="加载中" loading />
            <nue-select-option value="disabled" label="禁用选项" disabled />
        </nue-select>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueSelect, NueSelectOption, NueAvatar, NueText } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const s1 = ref(128);
const s2 = ref('option a');
const s3 = ref('');
</script>
