import type { GlobalProps } from '@nue-ui/utils';

export type NueCalendarValue = string | null | undefined;
export type NueCalendarSize = 'small' | 'large';
export type NueCalendarType = 'date' | 'datetime';

export interface NueCalendarProps extends GlobalProps {
    modelValue?: NueCalendarValue;
    type?: NueCalendarType;
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
