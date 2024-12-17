<template>
    <li
        :data-disabled="disabled"
        :data-executeid="executeId"
        :data-selected="selected"
        class="nue-select__option"
        @click="handleClick"
    >
        {{ label }}
        <nue-icon v-if="selected" name="completed" />
    </li>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { generateId } from '@nue-ui/utils';
import NueIcon from '../icon/icon.vue';
import type { SelectContext, SelectOptionProps } from './types';
import './option.css';

const selectContext: SelectContext = inject('SelectContext')!;

defineOptions({ name: 'NueSelectOption' });
const props = defineProps<SelectOptionProps>();

const executeId = ref<string>(generateId(4));

const selected = computed(() => {
    const selectedOption = selectContext.selectedOption.value;
    return selectedOption?.label === props.label;
});

function handleClick(e: MouseEvent) {
    if (props.disabled) {
        e.preventDefault();
        e.stopPropagation();
    }
}

selectContext.optionRegister({
    executeId: executeId.value,
    ...props
});
</script>
