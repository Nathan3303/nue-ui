<template>
    <div :class="classes" role="calendar">
        <CalendarHeader
            :year="currentYear"
            :month="currentMonth"
            :mode="currentView"
            @update:year="handleYearUpdate"
            @update:month="handleMonthUpdate"
            @update:view="handleViewChange"
        />
        <div class="nue-calendar__body">
            <div class="nue-calendar__date">
                <CalendarBody
                    v-if="currentView === 'date'"
                    :year="currentYear"
                    :month="currentMonth"
                    :selected-date="selectedDate?.split(' ')[0] || null"
                    :min-date="minDate"
                    :max-date="maxDate"
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
                <CalendarYear
                    v-if="currentView === 'year'"
                    :year="currentYear"
                    @select="handleYearSelect"
                    @update:view="handleViewChange"
                />
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
                <CalendarTimePicker
                    :hour="currentHour"
                    :minute="currentMinute"
                    @change="handleTimeChange"
                />
            </template>
        </div>
        <nue-divider v-if="$slots.footer" />
        <div v-if="$slots.footer" class="nue-calendar__footer">
            <slot name="footer" :clear="handleClear"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, provide, toRef } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { useCalendar } from '@nue-ui/hooks';
import { NUE_CALENDAR_CTX_KEY } from './calendar-constants';
import CalendarHeader from './calendar-header.vue';
import CalendarBody from './calendar-body.vue';
import CalendarYear from './calendar-year.vue';
import CalendarMonth from './calendar-month.vue';
import CalendarTimePicker from './calendar-time-picker.vue';
import { NueDivider } from '../divider';
import type { NueCalendarProps, NueCalendarEmits, NueCalendarContext } from './types';

defineOptions({ name: 'NueCalendar' });

const props = withDefaults(defineProps<NueCalendarProps>(), {
    type: 'date',
    modelValue: null,
    minDate: '',
    maxDate: ''
});

const emit = defineEmits<NueCalendarEmits>();

provide<NueCalendarContext>(NUE_CALENDAR_CTX_KEY, {
    size: props.size,
    disabled: false
});

const calendar = useCalendar({
    modelValue: toRef(props, 'modelValue'),
    type: toRef(props, 'type'),
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
    const prefix = 'nue-calendar';
    return [
        prefix,
        props.type === 'datetime' && `${prefix}--datetime`,
        props.size && `${prefix}--${props.size}`,
        ...parseTheme(props.theme, prefix)
    ];
});
</script>
