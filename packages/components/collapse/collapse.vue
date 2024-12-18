<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { CollapseEmitType, CollapsePropsType } from './types';
import { useCollapse } from './use-collapse';
import { parseTheme } from '@nue-ui/utils';
import './collapse.css';

defineOptions({ name: 'NueCollapse' });

const emit = defineEmits<CollapseEmitType>();
const props = withDefaults(defineProps<CollapsePropsType>(), {});

const { activedItems, pushActivedItem } = useCollapse(props, emit);

const classes = computed(() => {
    const prefix = 'nue-collapse';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

defineExpose({ activedItems, pushActivedItem });
</script>
