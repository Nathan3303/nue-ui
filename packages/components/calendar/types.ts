import type { GlobalProps } from '@nue-ui/utils';
import type { CalendarValueFormat } from '@nue-ui/hooks/use-calendar';

export type NueCalendarValue = string | null | undefined;
export type NueCalendarSize = 'small' | 'large';
export type NueCalendarType = 'date' | 'datetime';
/** `modelValue` 序列化格式，语义见 `CalendarValueFormat` */
export type NueCalendarValueFormat = CalendarValueFormat;

export interface NueCalendarProps extends GlobalProps {
    modelValue?: NueCalendarValue;
    type?: NueCalendarType;
    /**
     * modelValue 序列化格式
     * - `'iso'`（默认）：UTC ISO 字符串，保持既有行为
     * - `'date'`：本地日期 `YYYY-MM-DD`（`type="date"` 的语义正确形态）
     * - `'local-datetime'`：本地时刻 `YYYY-MM-DD HH:mm:ss`
     */
    valueFormat?: NueCalendarValueFormat;
    size?: NueCalendarSize;
    minDate?: string;
    maxDate?: string;
}

export type NueCalendarEmits = {
    (e: 'update:modelValue', value: NueCalendarValue): void;
    (e: 'change', value: NueCalendarValue): void;
    (e: 'clear'): void;
};

// Re-export sub-component types for public API
export type {
    NueCalendarContext,
    CalendarViewMode,
    NueCalendarHeaderProps,
    NueCalendarHeaderEmits,
    NueCalendarBodyProps,
    NueCalendarBodyEmits,
    NueCalendarYearProps,
    NueCalendarYearEmits,
    NueCalendarMonthProps,
    NueCalendarMonthEmits,
    NueCalendarTimeProps,
    NueCalendarTimeEmits
} from './calendar-types';