<template>
    <nue-container class="demo-layout" theme="vertical,inner">
        <nue-header>
            <template #logo>
                <slot name="title">{{ title }}</slot>
            </template>
        </nue-header>
        <nue-main>
            <template #default>
                <slot />
            </template>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueMain } from '@nue-ui/components';
defineProps<{ title?: string }>();
</script>

<style scoped>
.nue-header:deep(> .nue-header__logo) {
    font-size: var(--nue-text-df);
}

.demo-layout:deep(.wrapper) {
    border: 1px solid var(--nue-divider-color);
    border-radius: var(--nue-primary-radius);
    overflow: hidden;
}
</style>
