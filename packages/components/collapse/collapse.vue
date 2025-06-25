<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCollapse } from './use-collapse';
import { parseTheme } from '@nue-ui/utils';
import type { NueCollapseEmit, NueCollapseProps } from './types';
import './collapse.css';

defineOptions({ name: 'NueCollapse' });

const emit = defineEmits<NueCollapseEmit>();
const props = withDefaults(defineProps<NueCollapseProps>(), {});

const { activedItems, pushActivedItem } = useCollapse(props, emit);

const classes = computed(() => {
    const prefix = 'nue-collapse';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

defineExpose({ activedItems, pushActivedItem });
</script>
