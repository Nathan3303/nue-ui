<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { provide, computed, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import useCollapse from './use-collapse';
import { NUE_COLLAPSE_CONTEXT_KEY } from './constants';
import type { NueCollapseEmit, NueCollapseProps, NueCollapseContext } from './types';

defineOptions({ name: 'NueCollapse' });
const props = defineProps<NueCollapseProps>();
const emit = defineEmits<NueCollapseEmit>();

const { activedItemNames, active } = useCollapse(props, emit);

const classes = computed(() => {
    const prefix = 'nue-collapse';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

// @beforeMount 注册激活项
watch(
    () => props.modelValue,
    newValue => {
        if (!newValue || !newValue.length) return;
        if (props.accordion) {
            active(newValue[0]);
            return;
        }
        activedItemNames.value = [...newValue];
        return;
    },
    { immediate: true, once: true }
);

// @provide 为子组件提供数据和方法
provide<NueCollapseContext>(NUE_COLLAPSE_CONTEXT_KEY, {
    active,
    activedItemNames
});
</script>
