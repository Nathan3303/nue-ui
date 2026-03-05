<template>
    <nue-dropdown :class="classes" :disabled="disabled" placement="bottom-start">
        <template #trigger="{ trigger }">
            <nue-button :disabled="disabled" @click="trigger">
                <template v-if="modelValue">
                    {{ displayValue }}
                </template>
                <nue-text v-else color="gray">
                    {{ realPlaceholder }}
                </nue-text>
                <template #append>
                    <nue-icon name="calendar" />
                    <nue-icon
                        v-if="clearable && modelValue"
                        name="clear"
                        @click.stop="handleClear"
                    />
                </template>
            </nue-button>
        </template>
        <date-picker-panel
            :model-value="modelValue"
            :type="type"
            @update:model-value="handleDateSelect"
            @change="handleChange"
        />
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { NueButton, NueDropdown, NueIcon, NueText } from '@nue-ui/components';
import { parseTheme } from '@nue-ui/utils';
import DatePickerPanel from './date-picker-panel.vue';
import { PLACEHOLDERS } from './constants';
import type { NueDatePickerProps, NueDatePickerEmits, NueDatePickerValue } from './types';

defineOptions({ name: 'NueDatePicker' });

const props = withDefaults(defineProps<NueDatePickerProps>(), {
    type: 'date',
    placeholder: '',
    disabled: false,
    clearable: false
});

const emit = defineEmits<NueDatePickerEmits>();

const classes = computed(() => {
    const prefix = 'nue-date-picker';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const realPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder;
    return PLACEHOLDERS.single;
});

const displayValue = computed(() => {
    return props.modelValue || '';
});

const handleClear = () => {
    emit('update:modelValue', null);
    emit('change', null);
    emit('clear');
};

const handleDateSelect = (value: NueDatePickerValue) => {
    emit('update:modelValue', value);
};

const handleChange = (value: NueDatePickerValue) => {
    emit('change', value);
};
</script>
