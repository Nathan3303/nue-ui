<template>
    <nue-div :id="title" vertical>
        <nue-text size="20px" weight="500">{{ title }}</nue-text>
        <slot></slot>
    </nue-div>
</template>

<script lang="ts" setup>
import type { DemoCardProps } from './types';

defineOptions({ name: 'DemoCard ' });
defineProps<DemoCardProps>();
</script>
