<template>
    <demo title="基础">
        <nue-div gap="1.25rem" vertical>
            <nue-div gap="4rem">
                <nue-badge value="简体中文">
                    <nue-button>文字徽标</nue-button>
                </nue-badge>
                <nue-badge dot>
                    <nue-button>点状徽标</nue-button>
                </nue-badge>
            </nue-div>
        </nue-div>
    </demo>
    <demo title="数字徽标 & 最大限值">
        <nue-badge :max="99" :value="100">
            <nue-button>数字徽标 + 最大值限制</nue-button>
        </nue-badge>
    </demo>
    <demo title="显示与隐藏">
        <nue-badge :hidden="visible" value="新">
            <nue-button @click="visible = !visible">显示与隐藏</nue-button>
        </nue-badge>
    </demo>
    <demo title="组件内联徽标">
        <nue-button>
            组件内联徽标
            <template #append>
                <nue-badge :max="99" :value="100" />
            </template>
        </nue-button>
    </demo>
    <demo title="溢出隐藏">
        <nue-badge value="简体中文 1 2 3">
            <nue-button>文字徽标</nue-button>
        </nue-badge>
    </demo>
    <demo title="样式">
        <nue-badge theme="for-ico-btn" dot>
            <nue-button theme="icon,ghost" icon="theme" />
        </nue-badge>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueDiv, NueBadge, NueButton } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const visible = ref(false);
</script>
