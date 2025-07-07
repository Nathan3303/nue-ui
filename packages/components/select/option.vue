<template>
    <li :class="classes" :data-executeid="executeId" @click="handleClick">
        {{ label }}
        <nue-icon v-if="selected" name="completed" />
    </li>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { generateId, parseTheme } from '@nue-ui/utils';
import NueIcon from '../icon/icon.vue';
import { NueSelectContextKey } from './constants';
import type { NueSelectContext, NueSelectOptionProps } from './types';
import './option.css';

defineOptions({ name: 'NueSelectOption' });
const props = defineProps<NueSelectOptionProps>();

const selectContext = inject<NueSelectContext>(NueSelectContextKey);

const executeId = generateId(8);

const selected = computed(() => {
    const selectedOption = selectContext?.selectedOption.value;
    return selectedOption?.label === props.label;
});

const classes = computed(() => {
    const prefix = 'nue-select-option';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.disabled && `${prefix}--disabled`,
        selected.value && `${prefix}--selected`
    ];
});

const handleClick = (e: MouseEvent) => {
    if (props.disabled) e.stopPropagation();
};

selectContext?.optionRegister({
    label: props.label,
    value: props.value,
    executeId
});
</script>
