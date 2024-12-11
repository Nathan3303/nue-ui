<template>
    <nue-container class="demo-layout" theme="vertical,inner">
        <nue-header>
            <template #logo>
                <nue-text size="var(--nue-ui-text-default)">
                    <slot name="title">
                        {{ title }}
                    </slot>
                </nue-text>
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
defineProps<{ title?: string }>();
</script>

<style scoped>
.demo-layout {
    &:deep(.wrapper) {
        border: 1px solid var(--nue-ui-divider-color);
        border-radius: var(--nue-ui-primary-radius);
        overflow: hidden;
    }
}
</style>
