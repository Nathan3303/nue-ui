<template>
    <li class="nue-breadcrumb-item">
        <slot></slot>
    </li>
    <li class="nue-breadcrumb__separator">
        <slot name="separator">
            <nue-icon :name="separator" />
        </slot>
    </li>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import { NueIcon } from '../icon';
import type { NueBreadcrumbContext, NueBreadcrumbItemProps } from './types';
import { NueBreadcrumbContextKey } from './constants';
import './breadcrumb-item.css';

defineOptions({ name: 'NueBreadcrumbItem' });
const props = withDefaults(defineProps<NueBreadcrumbItemProps>(), {});

const breadcrumbContext = inject<NueBreadcrumbContext>(NueBreadcrumbContextKey);

const separator = computed(
    () => props.separator ?? breadcrumbContext?.separator
);
</script>
