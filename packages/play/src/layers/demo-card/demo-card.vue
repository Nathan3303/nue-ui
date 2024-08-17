<template>
    <nue-div vertical theme="card" :divider="{}">
        <nue-text size="24px">{{ title }}</nue-text>
        <slot></slot>
    </nue-div>
</template>

<script setup lang="ts">
import type { DemoCardProps } from "./types";

defineOptions({ name: "DemoCard " });
defineProps<DemoCardProps>();
</script>
