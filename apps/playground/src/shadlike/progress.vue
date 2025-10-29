<template>
    <demo title="默认主题">
        <nue-progress :percentage="36" />
    </demo>
    <demo title="边框主题" sub-title="bordered">
        <nue-progress theme="bordered" :percentage="36" show-inner-text />
    </demo>
</template>

<script lang="ts" setup>
import { NueProgress } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>
