<template>
    <demo title="基础">
        <nue-div>
            <nue-icon name="setting" />
            <nue-icon name="theme" />
        </nue-div>
    </demo>
    <demo title="大小">
        <nue-div align="center" style="font-size: 1.25rem">
            <nue-icon name="theme" />
            <nue-icon name="theme" style="--nue-icon-size: 1.5rem" />
            <nue-icon name="theme" size="1.75rem" />
            <nue-icon name="theme" size="2rem" />
        </nue-div>
    </demo>
    <demo title="旋转 & 旋转动画时长">
        <nue-div>
            <nue-icon name="loading" spin />
            <nue-icon name="loading" spin spin-speed="5s" />
        </nue-div>
    </demo>
    <demo title="所有图标">
        <nue-div align="center">
            <nue-div
                v-for="name in IconNames"
                :key="name"
                align="center"
                gap="0.5rem"
                width="11rem"
            >
                <nue-icon :name="name" size="1.25rem" />
                <nue-text color="gray" size="0.75rem" style="line-height: 1.4">
                    {{ name }}
                </nue-text>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText, NueIcon } from '@nue-ui/components';
import { IconNames } from '@nue-ui/components/icon/constants.ts';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.icon-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid var(--nue-border-color);
    border-radius: var(--nue-primary-radius);
    line-height: 1;
}
</style>
