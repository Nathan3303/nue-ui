import { describe, it, expect, vi } from 'vite-plus/test';
import { ref } from 'vue';
import { useCalendar } from '../index';
import type { CalendarType, CalendarValueFormat } from '../index';

type SetupOptions = {
    modelValue?: string | null;
    type?: CalendarType;
    valueFormat?: CalendarValueFormat;
};

function setup(options: SetupOptions = {}) {
    const modelValue = ref<string | null | undefined>(options.modelValue ?? null);
    const type = ref<CalendarType>(options.type ?? 'date');
    const valueFormat = ref<CalendarValueFormat>(options.valueFormat ?? 'iso');
    const emit = vi.fn();

    const calendar = useCalendar({ modelValue, type, valueFormat, emit });

    return { modelValue, type, valueFormat, emit, calendar };
}

/** 旧实现（'iso' 口径）的等价换算，用于回归断言 */
function legacyIsoValue(dateStr: string, hour = 0, minute = 0) {
    const dateObj = new Date(dateStr);
    dateObj.setHours(hour, minute, 0, 0);
    return dateObj.toISOString();
}

describe('useCalendar · valueFormat 日期序列化', () => {
    describe("默认 'iso'：既有行为不变", () => {
        it('type=date 时输出与原实现完全一致的 UTC ISO 字符串', () => {
            const { calendar, emit } = setup();

            calendar.handleDateSelect('2024-05-06');

            expect(emit).toHaveBeenCalledWith('update:modelValue', legacyIsoValue('2024-05-06'));
            expect(emit).toHaveBeenCalledWith('change', legacyIsoValue('2024-05-06'));
        });

        it('不传 valueFormat 时等价于 valueFormat="iso"', () => {
            const explicit = setup({ valueFormat: 'iso' });
            const implicit = setup();

            explicit.calendar.handleDateSelect('2024-05-06');
            implicit.calendar.handleDateSelect('2024-05-06');

            expect(implicit.emit.mock.calls).toEqual(explicit.emit.mock.calls);
        });

        it('type=datetime 时携带当前时刻，输出 UTC ISO 字符串', () => {
            const { calendar, emit } = setup({ type: 'datetime' });

            calendar.handleTimeChange({ hour: 14, minute: 5 });
            calendar.handleDateSelect('2024-05-06');

            const value = emit.mock.calls.find(call => call[0] === 'update:modelValue')?.[1];
            expect(value).toBe(legacyIsoValue('2024-05-06', 14, 5));
        });
    });

    describe("'date'：本地日期，不做时区换算", () => {
        it('原样输出选中的日期字符串', () => {
            const { calendar, emit } = setup({ valueFormat: 'date' });

            calendar.handleDateSelect('2024-05-06');

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-05-06');
            expect(emit).toHaveBeenCalledWith('change', '2024-05-06');
        });

        it('与运行环境时区无关（月初日期不会被推回上一天/上一月）', () => {
            const { calendar, emit } = setup({ valueFormat: 'date' });

            calendar.handleDateSelect('2024-06-01');

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-06-01');
        });

        it('type=datetime 时也只输出日期（时间被忽略）', () => {
            const { calendar, emit } = setup({ valueFormat: 'date', type: 'datetime' });

            calendar.handleDateSelect('2024-05-06');

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-05-06');
        });
    });

    describe("'local-datetime'：本地时刻", () => {
        it('type=date 时时刻归零', () => {
            const { calendar, emit } = setup({ valueFormat: 'local-datetime' });

            calendar.handleDateSelect('2024-05-06');

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-05-06 00:00:00');
        });

        it('type=datetime 时使用选中的时刻', () => {
            const { calendar, emit } = setup({
                valueFormat: 'local-datetime',
                type: 'datetime'
            });

            calendar.handleTimeChange({ hour: 14, minute: 5 });
            calendar.handleDateSelect('2024-05-06');

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-05-06 14:05:00');
        });

        it('改时间时基于已选日期重新序列化', () => {
            const { calendar, emit } = setup({
                modelValue: '2024-05-06',
                valueFormat: 'local-datetime',
                type: 'datetime'
            });

            calendar.handleTimeChange({ hour: 9, minute: 7 });

            expect(emit).toHaveBeenCalledWith('update:modelValue', '2024-05-06 09:07:00');
        });
    });

    describe('非法输入：不抛 RangeError，保持原值不 emit', () => {
        it('非日期串调用 handleDateSelect 时不抛错、不 emit', () => {
            const { calendar, emit } = setup({ valueFormat: 'iso' });

            expect(() => calendar.handleDateSelect('abc')).not.toThrow();
            expect(emit).not.toHaveBeenCalled();
        });

        it('空串与不存在的日期同样不 emit', () => {
            const { calendar, emit } = setup({ valueFormat: 'date' });

            expect(() => calendar.handleDateSelect('')).not.toThrow();
            expect(() => calendar.handleDateSelect('2024-02-31')).not.toThrow();
            expect(emit).not.toHaveBeenCalled();
        });

        it('modelValue 为非法串时改时间不抛 RangeError，且不清空原值', () => {
            const { modelValue, calendar, emit } = setup({
                modelValue: 'abc',
                type: 'datetime'
            });

            expect(() => calendar.handleTimeChange({ hour: 10, minute: 0 })).not.toThrow();
            expect(emit).not.toHaveBeenCalled();
            expect(modelValue.value).toBe('abc');
        });

        it('modelValue 为空时不 emit（无可序列化的日期）', () => {
            const { calendar, emit } = setup({ modelValue: null, type: 'datetime' });

            calendar.handleTimeChange({ hour: 10, minute: 0 });

            expect(emit).not.toHaveBeenCalled();
        });
    });

    describe('回填：modelValue 决定当前年月', () => {
        it("'date' 格式的月初值回填为当月（不因 UTC 解析退到上月）", () => {
            const { calendar } = setup({ valueFormat: 'date', modelValue: '2024-06-01' });

            expect(calendar.currentYear.value).toBe(2024);
            expect(calendar.currentMonth.value).toBe(6);
        });

        it("'local-datetime' 格式回填日期与时刻", () => {
            const { calendar } = setup({
                valueFormat: 'local-datetime',
                type: 'datetime',
                modelValue: '2024-06-01 08:09:00'
            });

            expect(calendar.currentYear.value).toBe(2024);
            expect(calendar.currentMonth.value).toBe(6);
            expect(calendar.currentHour.value).toBe(8);
            expect(calendar.currentMinute.value).toBe(9);
        });

        it('非法 modelValue 回填时回退到当前年月（不抛错）', () => {
            const now = new Date();
            const { calendar } = setup({ modelValue: 'abc' });

            expect(calendar.currentYear.value).toBe(now.getFullYear());
            expect(calendar.currentMonth.value).toBe(now.getMonth() + 1);
        });
    });
});