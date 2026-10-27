import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';

export type CalendarViewMode = 'date' | 'month' | 'year';
export type CalendarType = 'date' | 'datetime';
/**
 * modelValue 的序列化格式
 * - `'iso'`（默认）：本地时刻转 UTC 的 ISO 字符串，保持既有行为
 * - `'date'`：本地日期 `YYYY-MM-DD`，纯字符串处理、不做时区换算
 * - `'local-datetime'`：本地时刻 `YYYY-MM-DD HH:mm:ss`
 */
export type CalendarValueFormat = 'iso' | 'date' | 'local-datetime';

function pad2(n: number): string {
    return String(n).padStart(2, '0');
}

/**
 * 校验并归一化 `YYYY-MM-DD` 本地日期串，纯字符串处理、不经过 Date 的时区换算。
 * 格式不符或日期不存在（如 `2024-02-31`）时返回 null。
 */
function normalizeDateOnly(dateStr: string): string | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
    if (!match) return null;

    const yearStr = match[1];
    const monthStr = match[2];
    const dayStr = match[3];
    if (!yearStr || !monthStr || !dayStr) return null;

    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);
    // 本地构造器会把溢出日期「滚动」到别的日子（如 2024-02-31 → 03-02），回读比对即可判真伪
    const probe = new Date(year, month - 1, day);
    if (probe.getFullYear() !== year || probe.getMonth() !== month - 1 || probe.getDate() !== day) {
        return null;
    }
    return `${yearStr}-${monthStr}-${dayStr}`;
}

/** 用本地时间构造 `YYYY-MM-DD`，避免 `new Date(dateStr)` 按 UTC 解析；非法返回 null */
function createLocalDate(dateStr: string): Date | null {
    const dateOnly = normalizeDateOnly(dateStr);
    if (!dateOnly) return null;
    const [yearStr = '', monthStr = '', dayStr = ''] = dateOnly.split('-');
    return new Date(Number(yearStr), Number(monthStr) - 1, Number(dayStr));
}

/**
 * 把「选中日期 + 时刻」序列化为 modelValue 字符串。
 * 返回 null 表示输入无法解析为合法日期，调用方应保持原值、不 emit（不抛 RangeError）。
 */
function serializeValue(
    dateStr: string,
    hour: number,
    minute: number,
    format: CalendarValueFormat
): string | null {
    if (format === 'date') return normalizeDateOnly(dateStr);

    if (format === 'local-datetime') {
        const dateOnly = normalizeDateOnly(dateStr);
        return dateOnly ? `${dateOnly} ${pad2(hour)}:${pad2(minute)}:00` : null;
    }

    // 'iso'：保持既有行为（本地时刻 → UTC ISO），仅补非法日期保护
    const dateObj = new Date(dateStr);
    if (isNaN(dateObj.getTime())) return null;
    dateObj.setHours(hour, minute, 0, 0);
    return dateObj.toISOString();
}

export function useCalendar(options: {
    modelValue: Ref<string | null | undefined>;
    type?: Ref<CalendarType>;
    valueFormat?: Ref<CalendarValueFormat>;
    emit: (event: string, ...args: unknown[]) => void;
    /* 当时间变化且已有选中日期时，是否自动 emit（Calendar 内联场景下可能需要手动控制） */
    autoEmitOnTimeChange?: boolean;
}) {
    const { modelValue, emit, autoEmitOnTimeChange = true } = options;
    const type = options.type || ref<CalendarType>('date');
    const valueFormat = options.valueFormat || ref<CalendarValueFormat>('iso');

    const currentYear = ref(new Date().getFullYear());
    const currentMonth = ref(new Date().getMonth() + 1);
    const currentView = ref<CalendarViewMode>('date');
    const currentHour = ref(new Date().getHours());
    const currentMinute = ref(new Date().getMinutes());
    const selectedDate = ref<string | null>(null);

    const showTimePicker = computed(() => {
        return (
            type.value === 'datetime' &&
            currentView.value !== 'year' &&
            currentView.value !== 'month'
        );
    });

    const canClear = computed(() => selectedDate.value !== null);

    function parseDateTime(value: string | null) {
        if (!value) return null;

        const now = new Date();

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

        const parts = value.split(' ');
        if (parts.length === 2) {
            const [datePart, timePart] = parts;
            // length === 2 已保证两段都存在，此处仅作类型收窄
            if (datePart !== undefined && timePart !== undefined) {
                // 缺省段（如 `12` 缺分）回退到当前时间
                let [hour = now.getHours(), minute = now.getMinutes()] = timePart
                    .split(':')
                    .map(Number);
                if (isNaN(hour) || hour < 0 || hour > 23) hour = now.getHours();
                if (isNaN(minute) || minute < 0 || minute > 59) minute = now.getMinutes();
                return { date: datePart, hour, minute };
            }
        }
        return { date: value, hour: now.getHours(), minute: now.getMinutes() };
    }

    watch(
        modelValue,
        val => {
            selectedDate.value = val ?? null;
            const now = new Date();

            if (val) {
                const parsed = parseDateTime(val);
                if (parsed) {
                    const date = createLocalDate(parsed.date);
                    if (date) {
                        currentYear.value = date.getFullYear();
                        currentMonth.value = date.getMonth() + 1;
                    } else {
                        currentYear.value = now.getFullYear();
                        currentMonth.value = now.getMonth() + 1;
                    }
                    currentHour.value = parsed.hour;
                    currentMinute.value = parsed.minute;
                }
            } else {
                currentYear.value = now.getFullYear();
                currentMonth.value = now.getMonth() + 1;
                currentHour.value = now.getHours();
                currentMinute.value = now.getMinutes();
            }
        },
        { immediate: true }
    );

    function handleDateSelect(date: string) {
        const isDateTime = type.value === 'datetime';
        const value = serializeValue(
            date,
            isDateTime ? currentHour.value : 0,
            isDateTime ? currentMinute.value : 0,
            valueFormat.value
        );
        // 非法日期：保持原值、不 emit（不清空用户已有数据，也不抛 RangeError）
        if (value === null) return;

        selectedDate.value = date;
        emit('update:modelValue', value);
        emit('change', value);
    }

    function handleYearSelect(year: number) {
        currentYear.value = year;
    }

    function handleMonthSelect(month: number) {
        currentMonth.value = month;
    }

    function handleTimeChange(time: { hour: number; minute: number }) {
        currentHour.value = time.hour;
        currentMinute.value = time.minute;

        if (selectedDate.value && autoEmitOnTimeChange) {
            // 取日期部分：兼容 `YYYY-MM-DD HH:mm` 与 ISO `YYYY-MM-DDTHH:mm:ss`
            const [datePart = selectedDate.value] = selectedDate.value.split(' ');
            const dateStr = datePart.split('T')[0] ?? datePart;
            const value = serializeValue(dateStr, time.hour, time.minute, valueFormat.value);
            if (value === null) return;

            emit('update:modelValue', value);
            emit('change', value);
        }
    }

    function handleViewChange(view: CalendarViewMode) {
        currentView.value = view;
    }

    function handleYearUpdate(year: number) {
        currentYear.value = year;
    }

    function handleMonthUpdate(month: number) {
        currentMonth.value = month;
    }

    function handleClear() {
        selectedDate.value = null;
        emit('update:modelValue', null);
        emit('change', null);
        emit('clear');
    }

    return {
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
    };
}