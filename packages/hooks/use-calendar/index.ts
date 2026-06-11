import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';

export type CalendarViewMode = 'date' | 'month' | 'year';
export type CalendarType = 'date' | 'datetime';

export function useCalendar(options: {
    modelValue: Ref<string | null | undefined>;
    type?: Ref<CalendarType>;
    emit: (event: string, ...args: unknown[]) => void;
    /* 当时间变化且已有选中日期时，是否自动 emit（Calendar 内联场景下可能需要手动控制） */
    autoEmitOnTimeChange?: boolean;
}) {
    const { modelValue, emit, autoEmitOnTimeChange = true } = options;
    const type = options.type || ref<CalendarType>('date');

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
            let [hour, minute] = timePart.split(':').map(Number);
            if (isNaN(hour) || hour < 0 || hour > 23) hour = now.getHours();
            if (isNaN(minute) || minute < 0 || minute > 59) minute = now.getMinutes();
            return { date: datePart, hour, minute };
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
                    const date = new Date(parsed.date);
                    if (!isNaN(date.getTime())) {
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
        selectedDate.value = date;

        const dateObj = new Date(date);
        let value: string;
        if (type.value === 'datetime') {
            dateObj.setHours(currentHour.value, currentMinute.value, 0, 0);
            value = dateObj.toISOString();
        } else {
            dateObj.setHours(0, 0, 0, 0);
            value = dateObj.toISOString();
        }

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
            const dateStr = selectedDate.value.split(' ')[0].split('T')[0];
            const dateObj = new Date(dateStr);
            dateObj.setHours(time.hour, time.minute, 0, 0);
            const value = dateObj.toISOString();

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
