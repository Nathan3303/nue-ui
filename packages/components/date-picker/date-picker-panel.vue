<script lang="ts" setup>
import { ref, computed, watch, inject } from 'vue';
import { NueButton, NueDivider } from '@nue-ui/components';
import DatePickerHeader from './date-picker-header.vue';
import DatePickerBody from './date-picker-body.vue';
import DatePickerYear from './date-picker-year.vue';
import DatePickerMonth from './date-picker-month.vue';
import TimePicker from './time-picker.vue';
import type {
    NueDatePickerPanelProps,
    NueDatePickerPanelEmits,
    NueDatePickerContext
} from './types';
import { NUE_DATE_PICKER_CTX_KEY } from './constants';

defineOptions({ name: 'NueDatePickerPanel' });

const props = withDefaults(defineProps<NueDatePickerPanelProps>(), {
    type: 'date',
    modelValue: null
});

const emit = defineEmits<NueDatePickerPanelEmits>();

const datePickerCtx = inject<NueDatePickerContext>(NUE_DATE_PICKER_CTX_KEY)!;

// 当前视图的年月
const currentYear = ref(new Date().getFullYear());
const currentMonth = ref(new Date().getMonth() + 1);
const currentView = ref<'date' | 'month' | 'year'>('date');

// 当前选择的时间
const currentHour = ref(new Date().getHours());
const currentMinute = ref(new Date().getMinutes());

// 当前选择的日期（内部状态）
const selectedDate = ref<string | null>(null);

// 计算类名
const classes = computed(() => {
    const prefix = 'nue-date-picker-panel';
    return [
        prefix,
        props.type === 'datetime' && `${prefix}--datetime`,
        props.size && `${prefix}--${props.size}`
    ];
});

// 解析日期时间，增加安全检查
function parseDateTime(value: string | null) {
    if (!value) return null;

    const now = new Date();

    // 先尝试解析 ISO 格式 (带 T 分隔符)
    if (value.includes('T')) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = date.getHours();
            const minute = date.getMinutes();
            return { date: `${year}-${month}-${day}`, hour, minute };
        }
    }

    // 回退到原有的格式解析 (空格分隔)
    const parts = value.split(' ');
    if (parts.length === 2) {
        const [datePart, timePart] = parts;
        let [hour, minute] = timePart.split(':').map(Number);
        // 安全检查，确保 hour 和 minute 有效
        if (isNaN(hour) || hour < 0 || hour > 23) hour = now.getHours();
        if (isNaN(minute) || minute < 0 || minute > 59) minute = now.getMinutes();
        return { date: datePart, hour, minute };
    }
    return { date: value, hour: now.getHours(), minute: now.getMinutes() };
}

// 监听外部 modelValue 变化
watch(
    () => props.modelValue,
    val => {
        selectedDate.value = val;
        const now = new Date();

        // 如果有选中日期时间，更新当前年月和时间
        if (val) {
            const parsed = parseDateTime(val);
            if (parsed) {
                const date = new Date(parsed.date);
                if (!isNaN(date.getTime())) {
                    currentYear.value = date.getFullYear();
                    currentMonth.value = date.getMonth() + 1;
                } else {
                    // 日期无效，使用当前年月
                    currentYear.value = now.getFullYear();
                    currentMonth.value = now.getMonth() + 1;
                }
                currentHour.value = parsed.hour;
                currentMinute.value = parsed.minute;
            }
        } else {
            // 没有值，使用当前时间
            currentYear.value = now.getFullYear();
            currentMonth.value = now.getMonth() + 1;
            currentHour.value = now.getHours();
            currentMinute.value = now.getMinutes();
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

    const dateObj = new Date(date);
    let value: string;
    if (props.type === 'datetime') {
        dateObj.setHours(currentHour.value, currentMinute.value, 0, 0);
        value = dateObj.toISOString();
    } else {
        dateObj.setHours(0, 0, 0, 0);
        value = dateObj.toISOString();
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
        const dateStr = selectedDate.value.split(' ')[0].split('T')[0];
        const dateObj = new Date(dateStr);
        dateObj.setHours(time.hour, time.minute, 0, 0);
        const value = dateObj.toISOString();

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

// 是否显示时间选择器
const showTimePicker = computed(() => {
    return (
        props.type === 'datetime' && currentView.value !== 'year' && currentView.value !== 'month'
    );
});
</script>

<template>
    <div :class="classes">
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
        <div class="nue-date-picker-panel__body">
            <div class="nue-date-picker-panel__date">
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
            <template v-if="showTimePicker">
                <nue-divider />
                <!-- 时间选择器（datetime 类型时在日历下方） -->
                <TimePicker
                    :hour="currentHour"
                    :minute="currentMinute"
                    @change="handleTimeChange"
                />
            </template>
        </div>
        <nue-divider />
        <!-- 底部 -->
        <div class="nue-date-picker-panel__footer">
            <nue-button
                :size="datePickerCtx.size"
                :disabled="!canClear"
                icon="clear"
                theme="ghost,small"
                @click="handleClear"
            >
                清除
            </nue-button>
        </div>
    </div>
</template>

