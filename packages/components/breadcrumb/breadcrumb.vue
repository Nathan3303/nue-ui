<template>
    <ul class="nue-breadcrumb">
        <slot></slot>
    </ul>
</template>

<script lang="ts" setup>
import { provide } from 'vue';
import { NueBreadcrumbContextKey } from './constants';
import type { NueBreadcrumbProps, NueBreadcrumbContext } from './types';

defineOptions({ name: 'NueBreadcrumb' });
const props = withDefaults(defineProps<NueBreadcrumbProps>(), {
    separator: 'arrow-right'
});

provide<NueBreadcrumbContext>(NueBreadcrumbContextKey, {
    separator: props.separator
});
</script>
