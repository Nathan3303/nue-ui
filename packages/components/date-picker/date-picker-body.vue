<script setup lang="ts">
import { computed } from 'vue';
import { WEEKDAYS } from './constants';
import { getDaysInMonth, getWeekday, isSameDay } from './utils/date-utils';
import type { NueDatePickerBodyProps, NueDatePickerBodyEmits } from './types';

const props = withDefaults(defineProps<NueDatePickerBodyProps>(), {
    selectedDate: null,
    minDate: '',
    maxDate: ''
});

const emit = defineEmits<NueDatePickerBodyEmits>();

// 当天日期字符串
const todayStr = computed(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
});

// 获取当月第一天的星期几
const firstDayWeekday = computed(() => {
    return getWeekday(new Date(props.year, props.month - 1, 1));
});

// 获取当月天数
const daysInMonth = computed(() => {
    return getDaysInMonth(props.year, props.month);
});

// 获取上月末尾需要显示的天数
const prevMonthDays = computed(() => {
    const days: { date: Date; dateStr: string }[] = [];
    const prevMonth = props.month === 1 ? 12 : props.month - 1;
    const prevYear = props.month === 1 ? props.year - 1 : props.year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = firstDayWeekday.value - 1; i >= 0; i--) {
        const date = new Date(prevYear, prevMonth - 1, daysInPrevMonth - i);
        days.push({
            date,
            dateStr: formatDateStr(date)
        });
    }
    return days;
});

// 获取当月需要显示的天数
const currentMonthDays = computed(() => {
    const days: { date: Date; dateStr: string; isCurrentMonth: boolean }[] = [];

    for (let i = 1; i <= daysInMonth.value; i++) {
        const date = new Date(props.year, props.month - 1, i);
        days.push({
            date,
            dateStr: formatDateStr(date),
            isCurrentMonth: true
        });
    }
    return days;
});

// 获取下月开头需要显示的天数
const nextMonthDays = computed(() => {
    const days: { date: Date; dateStr: string }[] = [];
    const totalDays = prevMonthDays.value.length + currentMonthDays.value.length;
    const remainingDays = 42 - totalDays; // 6行 x 7列 = 42

    const nextMonth = props.month === 12 ? 1 : props.month + 1;
    const nextYear = props.month === 12 ? props.year + 1 : props.year;

    for (let i = 1; i <= remainingDays; i++) {
        const date = new Date(nextYear, nextMonth - 1, i);
        days.push({
            date,
            dateStr: formatDateStr(date)
        });
    }
    return days;
});

// 合并所有日期
const allDays = computed(() => {
    return [
        ...prevMonthDays.value.map(d => ({ ...d, isCurrentMonth: false })),
        ...currentMonthDays.value,
        ...nextMonthDays.value.map(d => ({ ...d, isCurrentMonth: false }))
    ];
});

// 格式化日期为 YYYY-MM-DD
function formatDateStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// 判断是否为选中日期
function isSelected(dateStr: string): boolean {
    if (!props.selectedDate) return false;
    return isSameDay(new Date(dateStr), new Date(props.selectedDate));
}

// 判断是否为今日
function isToday(dateStr: string): boolean {
    return dateStr === todayStr.value;
}

// 判断是否在可选范围内
function isDisabled(dateStr: string): boolean {
    const date = new Date(dateStr);

    if (props.minDate) {
        const min = new Date(props.minDate);
        if (date < min) return true;
    }

    if (props.maxDate) {
        const max = new Date(props.maxDate);
        if (date > max) return true;
    }

    return false;
}

// 处理日期点击
function handleDateClick(day: { date: Date; dateStr: string; isCurrentMonth: boolean }) {
    if (isDisabled(day.dateStr)) return;
    emit('select', day.dateStr);
}
</script>

<template>
    <div class="nue-date-picker-body">
        <!-- 星期头部 -->
        <div class="weekday-header">
            <div v-for="day in WEEKDAYS" :key="day" class="weekday-item">
                {{ day }}
            </div>
        </div>
        <!-- 日期网格 -->
        <div class="date-grid">
            <div
                v-for="(day, index) in allDays"
                :key="index"
                class="date-cell"
                :class="{
                    'other-month': !day.isCurrentMonth,
                    selected: isSelected(day.dateStr),
                    today: isToday(day.dateStr),
                    disabled: isDisabled(day.dateStr)
                }"
                @click="handleDateClick(day)"
            >
                {{ day.date.getDate() }}
            </div>
        </div>
    </div>
</template>
