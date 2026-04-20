<template>
    <nue-dropdown
        :class="classes"
        :disabled="disabled"
        placement="bottom-start"
        @close="emit('close')"
    >
        <template #trigger="{ trigger }">
            <nue-button :disabled="disabled" @click="trigger">
                <template v-if="modelValue">
                    <nue-text v-if="isInvalidDate" color="danger">{{ '无效日期' }}</nue-text>
                    <template v-else>{{ displayValue }}</template>
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
            :size="size"
            :model-value="modelValue"
            :type="type"
            @update:model-value="handleDateSelect"
            @change="handleChange"
        />
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { NueButton, NueDropdown, NueIcon } from '@nue-ui/components';
import { parseTheme } from '@nue-ui/utils';
import DatePickerPanel from './date-picker-panel.vue';
import { NUE_DATE_PICKER_CTX_KEY, PLACEHOLDERS } from './constants';
import type {
    NueDatePickerProps,
    NueDatePickerEmits,
    NueDatePickerValue,
    NueDatePickerContext
} from './types';
import { formatDateFriendly, formatDateTimeFriendly, parseDate } from './utils/date-utils';

defineOptions({ name: 'NueDatePicker' });

const props = withDefaults(defineProps<NueDatePickerProps>(), {
    type: 'date',
    placeholder: '',
    disabled: false,
    clearable: false
});

const emit = defineEmits<NueDatePickerEmits>();

provide<NueDatePickerContext>(NUE_DATE_PICKER_CTX_KEY, {
    size: props.size,
    disabled: props.disabled
});

const classes = computed(() => {
    const prefix = 'nue-date-picker';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const realPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder;
    return PLACEHOLDERS.single;
});

const isInvalidDate = computed(() => {
    if (!props.modelValue) return false;
    return parseDate(props.modelValue.split(' ')[0]) === null;
});

const displayValue = computed(() => {
    if (!props.modelValue || isInvalidDate.value) return '';

    const date = new Date(props.modelValue);
    if (isNaN(date.getTime())) return props.modelValue;

    if (props.type === 'datetime') {
        return formatDateTimeFriendly(date);
    }
    return formatDateFriendly(date);
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

