<template>
    <demo title="Badge 徽标">
        <nue-div gap="1.25rem" vertical>
            <nue-div gap="4rem">
                <nue-badge value="简体中文">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
                <nue-badge value="繁体中文">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
                <nue-badge value="English">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
                <nue-badge value="にほんご">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
                <nue-badge value="한국어">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
            </nue-div>
            <nue-div gap="4rem">
                <nue-badge :max="99" :value="100">
                    <nue-button>数字徽标 + 最大值限制</nue-button>
                </nue-badge>
                <nue-badge dot>
                    <nue-button>小红点</nue-button>
                </nue-badge>
                <nue-badge :hidden="visible" value="新">
                    <nue-button @click="visible = !visible">
                        显示与隐藏
                    </nue-button>
                </nue-badge>
            </nue-div>
            <nue-div gap="4rem">
                <nue-button>
                    NueButton 组件内联徽标
                    <template #append>
                        <nue-badge :max="99" :value="100" />
                    </template>
                </nue-button>
                <nue-link theme="btnlike,actived">
                    NueLink 组件内联徽标（小红点）
                    <template #append>
                        <nue-badge dot />
                    </template>
                </nue-link>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueBadge, NueButton, NueLink } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const visible = ref(false);
</script>
