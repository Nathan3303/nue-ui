<template>
    <div :class="classes">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed, provide, reactive } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { BUTTON_GROUP_CTX_KEY } from './constants';
import type { NueButtonGroupCtxType, NueButtonGroupProps } from './types';
import './button-group.css';

defineOptions({ name: 'NueButtonGroup' });

const props = defineProps<NueButtonGroupProps>();

const ButtonGroupCtx = reactive<NueButtonGroupCtxType>({
    size: props.size,
    disabled: props.disabled
});

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = 'nue-button-group';
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

provide(BUTTON_GROUP_CTX_KEY, ButtonGroupCtx);
</script>
