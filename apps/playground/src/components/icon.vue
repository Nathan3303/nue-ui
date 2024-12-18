<template>
    <demo title="Icon 图标">
        <nue-div align="center" wrap>
            <nue-icon color="blue" name="setting" />
            <nue-icon name="warning" size="24px" />
            <nue-icon name="loading" spin />
            <nue-icon name="scan" spin spin-speed="4s" />
        </nue-div>
    </demo>
    <demo title="所有图标">
        <nue-div align="center">
            <nue-icon
                v-for="(name, idx) in IconNames"
                :key="idx"
                :name="name"
                class="icon-item"
            >
                {{ name }}
            </nue-icon>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import NueIcon from '@nue-ui/components/icon/icon.vue';
import { IconNames } from '@nue-ui/components/icon/constants.ts';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.icon-item {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: 1px solid var(--nue-ui-border-color);
    border-radius: var(--nue-ui-primary-radius);
    line-height: 1;
}
</style>
