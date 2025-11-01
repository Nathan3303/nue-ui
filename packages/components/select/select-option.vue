<template>
    <nue-dropdown-item
        :class="classes"
        :data-selected="selected"
        :execute-id="executeId"
        :disabled="disabled"
        :text="label"
        @click="handleClick"
    >
        <template #append>
            <nue-icon v-if="selected" name="check" />
        </template>
    </nue-dropdown-item>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { generateId, parseTheme } from '@nue-ui/utils';
import { NueIcon, NueDropdownItem } from '@nue-ui/components';
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
    return [prefix, ...parseTheme(props.theme, prefix), props.disabled && `${prefix}--disabled`];
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
