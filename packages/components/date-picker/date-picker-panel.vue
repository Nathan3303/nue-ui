<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { NueButton } from '@nue-ui/components';
import DatePickerHeader from './date-picker-header.vue';
import DatePickerBody from './date-picker-body.vue';
import DatePickerYear from './date-picker-year.vue';
import DatePickerMonth from './date-picker-month.vue';
import TimePicker from './time-picker.vue';
import type { NueDatePickerType } from './types';

defineOptions({ name: 'NueDatePickerPanel' });

export interface NueDatePickerPanelProps {
    modelValue?: string | null;
    type?: NueDatePickerType;
}

export interface NueDatePickerPanelEmits {
    (e: 'update:modelValue', value: string | null): void;
    (e: 'change', value: string | null): void;
    (e: 'clear'): void;
}

const props = withDefaults(defineProps<NueDatePickerPanelProps>(), {
    type: 'date',
    modelValue: null
});

const emit = defineEmits<NueDatePickerPanelEmits>();

// 当前视图的年月
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const currentView = ref<'date' | 'month' | 'year'>('date');

// 当前选择的时间
const currentHour = ref(new Date().getHours());
const currentMinute = ref(new Date().getMinutes());

// 当前选择的日期（内部状态）
const selectedDate = ref<string | null>(null);

// 解析日期时间
function parseDateTime(value: string | null) {
    if (!value) return null;
    const parts = value.split(' ');
    if (parts.length === 2) {
        const [datePart, timePart] = parts;
        const [hour, minute] = timePart.split(':').map(Number);
        return { date: datePart, hour, minute };
    }
    return { date: value, hour: 0, minute: 0 };
}

// 格式化日期时间
function formatDateTime(date: string, hour: number, minute: number): string {
    return `${date} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

// 监听外部 modelValue 变化
watch(
    () => props.modelValue,
    val => {
        selectedDate.value = val;
        // 如果有选中日期时间，更新当前年月和时间
        if (val) {
            const parsed = parseDateTime(val);
            if (parsed) {
                const date = new Date(parsed.date);
                if (!isNaN(date.getTime())) {
                    currentYear.value = date.getFullYear();
                    currentMonth.value = date.getMonth() + 1;
                }
                currentHour.value = parsed.hour;
                currentMinute.value = parsed.minute;
            }
        }
    },
    { immediate: true }
);

// 清除选择
function handleClear() {
    selectedDate.value = null;
    emit('update:modelValue', null);
    emit('change', null);
    emit('clear');
}

// 处理日期选择
function handleDateSelect(date: string) {
    selectedDate.value = date;

    let value: string;
    if (props.type === 'datetime') {
        value = formatDateTime(date, currentHour.value, currentMinute.value);
    } else {
        value = date;
    }

    emit('update:modelValue', value);
    emit('change', value);
}

// 处理年份选择
function handleYearSelect(year: number) {
    currentYear.value = year;
}

// 处理月份选择
function handleMonthSelect(month: number) {
    currentMonth.value = month;
}

// 处理时间选择
function handleTimeChange(time: { hour: number; minute: number }) {
    currentHour.value = time.hour;
    currentMinute.value = time.minute;

    // 如果已有日期选择，更新完整日期时间
    if (selectedDate.value) {
        const dateStr = selectedDate.value.split(' ')[0];
        const value = formatDateTime(dateStr, time.hour, time.minute);
        emit('update:modelValue', value);
        emit('change', value);
    }
}

// 处理视图切换
function handleViewChange(view: 'date' | 'month' | 'year') {
    currentView.value = view;
}

// 处理年月变化
function handleYearUpdate(year: number) {
    currentYear.value = year;
}

// 处理月份变化
function handleMonthUpdate(month: number) {
    currentMonth.value = month;
}

// 是否可以清除
const canClear = computed(() => {
    return selectedDate.value !== null;
});

// 日期面板类名
const datePanelClass = computed(() => {
    return 'date-picker-panel__date';
});

// 是否显示时间选择器
const showTimePicker = computed(() => {
    return (
        props.type === 'datetime' && currentView.value !== 'year' && currentView.value !== 'month'
    );
});
</script>

<template>
    <div class="date-picker-panel" :class="{ 'date-picker-panel--datetime': type === 'datetime' }">
        <!-- 头部 -->
        <DatePickerHeader
            :year="currentYear"
            :month="currentMonth"
            :mode="currentView"
            @update:year="handleYearUpdate"
            @update:month="handleMonthUpdate"
            @update:view="handleViewChange"
        />

        <!-- 日期部分 -->
        <div class="date-picker-panel__body">
            <div :class="datePanelClass">
                <!-- 日期网格视图 -->
                <DatePickerBody
                    v-if="currentView === 'date'"
                    :year="currentYear"
                    :month="currentMonth"
                    :selected-date="selectedDate?.split(' ')[0] || null"
                    @select="handleDateSelect"
                />

                <!-- 年份选择视图 -->
                <DatePickerYear
                    v-if="currentView === 'year'"
                    :year="currentYear"
                    @select="handleYearSelect"
                    @update:view="handleViewChange"
                />

                <!-- 月份选择视图 -->
                <DatePickerMonth
                    v-if="currentView === 'month'"
                    :year="currentYear"
                    :month="currentMonth"
                    @select="handleMonthSelect"
                    @update:view="handleViewChange"
                />
            </div>

            <!-- 时间选择器（datetime 类型时在日历下方） -->
            <div v-if="showTimePicker" class="date-picker-panel__time">
                <TimePicker
                    :hour="currentHour"
                    :minute="currentMinute"
                    @change="handleTimeChange"
                />
            </div>
        </div>

        <!-- 底部 -->
        <div class="date-picker-panel__footer">
            <nue-button :disabled="!canClear" icon="clear" theme="ghost,small" @click="handleClear">
                清除
            </nue-button>
        </div>
    </div>
</template>
