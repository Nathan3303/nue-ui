<template>
    <nue-container :height="height" class="demo-layout" theme="vertical,inner">
        <nue-header height="3rem">
            <nue-text size="df">
                <slot name="title">{{ title }}</slot>
            </nue-text>
        </nue-header>
        <nue-main>
            <nue-content style="padding: 1rem">
                <slot />
            </nue-content>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueMain, NueText, NueContent } from '@nue-ui/components';

defineProps<{ title?: string; height?: string }>();
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
