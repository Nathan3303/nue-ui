<template>
    <ul class="nue-breadcrumb">
        <slot></slot>
    </ul>
</template>

<style src="./breadcrumb.css"></style>

<script lang="ts" setup>
import { provide } from 'vue';
import type { NueBreadcrumbProps, NueBreadcrumbContext } from './types';
import { NueBreadcrumbContextKey } from './constants';

defineOptions({ name: 'NueBreadcrumb' });
const props = withDefaults(defineProps<NueBreadcrumbProps>(), {
    separator: 'arrow-right'
});

provide<NueBreadcrumbContext>(NueBreadcrumbContextKey, {
    separator: props.separator
});
</script>
