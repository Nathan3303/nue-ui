<template>
    <nue-container theme="demo" :height="height">
        <nue-header theme="demo">
            <nue-div vertical gap=".25rem">
                <nue-div>
                    <nue-text size="df">
                        <slot name="title">{{ title }}</slot>
                    </nue-text>
                    <nue-text theme="subtitle">
                        <slot name="sub-title">{{ subTitle }}</slot>
                    </nue-text>
                </nue-div>
                <nue-text v-if="$slots.description || description" theme="description">
                    <slot name="description">{{ description }}</slot>
                </nue-text>
            </nue-div>
        </nue-header>
        <nue-main>
            <nue-content style="padding: 1rem; overflow: hidden">
                <slot />
            </nue-content>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup>
import { NueContainer, NueHeader, NueMain, NueText, NueContent, NueDiv } from '@nue-ui/components';

defineProps<{ title?: string; height?: string; description?: string; subTitle?: string }>();
</script>

<style scoped>
.nue-container--demo {
    margin-bottom: 1rem;

    .nue-header--demo {
        height: auto;
        min-height: 3rem;
        align-items: end;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;

        .nue-text--subtitle {
            color: gray;
            font-size: var(--nue-text-sm);
            font-family: 'Consolas', 'Noto Sans SC', sans-serif;
        }

        .nue-text--description {
            color: gray;
            font-size: var(--nue-text-sm);
        }
    }
}
</style>
