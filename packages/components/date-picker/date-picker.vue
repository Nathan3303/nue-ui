<template>
    <nue-dropdown
        :class="classes"
        :disabled="disabled"
        placement="bottom-start"
        @close="emit('close')"
    >
        <template #trigger="{ trigger }">
            <div
                :class="[
                    'nue-date-picker__trigger',
                    clearable && 'nue-date-picker__trigger--clearable',
                    size && `nue-date-picker__trigger--${size}`
                ]"
            >
                <nue-button :disabled="disabled" :size="size" @click="trigger">
                    <template v-if="modelValue">
                        {{ displayValue || '无效日期' }}
                    </template>
                    <nue-text theme="placeholder" v-else>{{ realPlaceholder }}</nue-text>
                    <template #append>
                        <nue-icon name="calendar" />
                    </template>
                </nue-button>
                <button
                    v-if="clearable && modelValue"
                    aria-label="清除日期"
                    class="nue-date-picker__clear"
                    :disabled="disabled"
                    type="button"
                    @click="handleClear"
                >
                    <nue-icon name="clear" />
                </button>
            </div>
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
import { NUE_CALENDAR_CTX_KEY } from '../calendar/calendar-constants';
import { PLACEHOLDERS } from './constants';
import type { NueDatePickerProps, NueDatePickerEmits, NueDatePickerValue } from './types';
import type { NueCalendarContext } from '../calendar/calendar-types';
import { formatDateFriendly, formatDateTimeFriendly, parseDate } from '@nue-ui/utils';

defineOptions({ name: 'NueDatePicker' });

const props = withDefaults(defineProps<NueDatePickerProps>(), {
    type: 'date',
    placeholder: '选择日期',
    disabled: false,
    clearable: false
});

const emit = defineEmits<NueDatePickerEmits>();

provide<NueCalendarContext>(NUE_CALENDAR_CTX_KEY, {
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
    const [datePart] = props.modelValue.split(' ');
    // split 结果至少一段，此处仅作类型收窄
    if (datePart === undefined) return false;
    return parseDate(datePart) === null;
});

const displayValue = computed(() => {
    if (!props.modelValue || isInvalidDate.value) return '';

    const value = props.modelValue;
    // 带 T/空格的串表示一个「时刻」，需保留时分；纯 date-only 串没有时刻语义
    const hasTimePart = /^\d{4}-\d{2}-\d{2}(T| )/.test(value);

    if (props.type === 'datetime' && hasTimePart) {
        // 时刻用 Date 解析后按本地时区显示，时分才正确
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;
        return formatDateTimeFriendly(date);
    }

    // date-only 串必须走 parseDate（本地构造），否则 new Date('2024-04-20')
    // 按 UTC 午夜解析，西半球时区会显示成前一天
    const date = parseDate(value);
    if (!date) return value;

    return props.type === 'datetime' ? formatDateTimeFriendly(date) : formatDateFriendly(date);
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