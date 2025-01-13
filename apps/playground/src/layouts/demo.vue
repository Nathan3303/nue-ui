<template>
    <nue-container class="demo-layout" theme="vertical,inner">
        <nue-header>
            <template #logo>
                <!--                <nue-text size="var(&#45;&#45;nue-ui-text-default)">-->
                <!--                    <slot name="title">-->
                <!--                        {{ title }}-->
                <!--                    </slot>-->
                <!--                </nue-text>-->
                <slot name="title">
                    {{ title }}
                </slot>
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
.demo-layout:deep(.wrapper) {
    border: 1px solid var(--nue-divider-color);
    border-radius: var(--nue-primary-radius);
    overflow: hidden;
}
</style>
