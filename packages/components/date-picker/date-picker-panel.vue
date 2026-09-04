<script lang="ts" setup>
import { computed, toRef } from 'vue';
import { NueButton } from '../button';
import { NueDivider } from '../divider';
import { useCalendar } from '@nue-ui/hooks';
import CalendarHeader from '../calendar/calendar-header.vue';
import CalendarBody from '../calendar/calendar-body.vue';
import CalendarYear from '../calendar/calendar-year.vue';
import CalendarMonth from '../calendar/calendar-month.vue';
import CalendarTimePicker from '../calendar/calendar-time-picker.vue';
import type { NueDatePickerPanelProps, NueDatePickerPanelEmits } from './types';

defineOptions({ name: 'NueDatePickerPanel' });

const props = withDefaults(defineProps<NueDatePickerPanelProps>(), {
    type: 'date',
    modelValue: null
});

const emit = defineEmits<NueDatePickerPanelEmits>();

const calendar = useCalendar({
    modelValue: toRef(props, 'modelValue'),
    type: toRef(props, 'type'),
    // defineEmits returns a typed emit which may be incompatible with
    // useCalendar's expected signature; cast to a generic emit function
    emit: emit as unknown as (event: string, ...args: unknown[]) => void
});

const {
    currentYear,
    currentMonth,
    currentView,
    currentHour,
    currentMinute,
    selectedDate,
    showTimePicker,
    canClear,
    handleDateSelect,
    handleYearSelect,
    handleMonthSelect,
    handleTimeChange,
    handleViewChange,
    handleYearUpdate,
    handleMonthUpdate,
    handleClear
} = calendar;

const classes = computed(() => {
    const prefix = 'nue-date-picker-panel';
    return [
        prefix,
        props.type === 'datetime' && `${prefix}--datetime`,
        props.size && `${prefix}--${props.size}`
    ];
});
</script>

<template>
    <div :class="classes">
        <!-- 头部 -->
        <CalendarHeader
            :year="currentYear"
            :month="currentMonth"
            :mode="currentView"
            @update:year="handleYearUpdate"
            @update:month="handleMonthUpdate"
            @update:view="handleViewChange"
        />
        <!-- 日期部分 -->
        <div class="nue-date-picker-panel__body">
            <div class="nue-date-picker-panel__date">
                <!-- 日期网格视图 -->
                <CalendarBody
                    v-if="currentView === 'date'"
                    :year="currentYear"
                    :month="currentMonth"
                    :selected-date="selectedDate?.split(' ')[0] || null"
                    @select="handleDateSelect"
                >
                    <template #cell="{ date, dateStr, isCurrentMonth }">
                        <slot
                            name="cell"
                            :date="date"
                            :dateStr="dateStr"
                            :isCurrentMonth="isCurrentMonth"
                        ></slot>
                    </template>
                </CalendarBody>
                <!-- 年份选择视图 -->
                <CalendarYear
                    v-if="currentView === 'year'"
                    :year="currentYear"
                    @select="handleYearSelect"
                    @update:view="handleViewChange"
                />
                <!-- 月份选择视图 -->
                <CalendarMonth
                    v-if="currentView === 'month'"
                    :year="currentYear"
                    :month="currentMonth"
                    @select="handleMonthSelect"
                    @update:view="handleViewChange"
                />
            </div>
            <template v-if="showTimePicker">
                <nue-divider />
                <!-- 时间选择器（datetime 类型时在日历下方） -->
                <CalendarTimePicker
                    :hour="currentHour"
                    :minute="currentMinute"
                    @change="handleTimeChange"
                />
            </template>
        </div>
        <nue-divider />
        <!-- 底部 -->
        <div class="nue-date-picker-panel__footer">
            <slot name="footer" :clear="handleClear">
                <nue-button
                    :size="size"
                    :disabled="!canClear"
                    icon="clear"
                    theme="ghost"
                    @click="handleClear"
                >
                    清除
                </nue-button>
            </slot>
        </div>
    </div>
</template>