<template>
    <nue-dropdown
        :class="classes"
        :disabled="disabled"
        placement="bottom-start"
        @close="emit('close')"
    >
        <template #trigger="{ trigger }">
            <nue-button :disabled="disabled" :size="size" @click="trigger">
                <template v-if="modelValue">
                    {{ displayValue || '无效日期' }}
                </template>
                <nue-text theme="placeholder" v-else>{{ realPlaceholder }}</nue-text>
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
        >
            <template #cell="{ date, dateStr, isCurrentMonth }">
                <slot
                    name="cell"
                    :date="date"
                    :dateStr="dateStr"
                    :isCurrentMonth="isCurrentMonth"
                ></slot>
            </template>
            <template #footer="{ clear }">
                <slot name="footer" :clear="clear"></slot>
            </template>
        </date-picker-panel>
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { NueButton } from '../button';
import { NueDropdown } from '../dropdown';
import { NueIcon } from '../icon';
import { NueText } from '../text';
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
    placeholder: '选择日期',
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
