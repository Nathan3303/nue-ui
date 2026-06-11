import type { GlobalProps } from '@nue-ui/utils';

/**
 * 日期选择器类型
 */
export type NueDatePickerType = 'date' | 'datetime';
export type NueDatePickerValue = string | null | undefined;
export type NueDatePickerSize = 'small' | 'large';

// Calendar types re-exported for backward compatibility
export type {
    CalendarViewMode as DatePickerViewMode,
    NueCalendarContext as NueDatePickerContext,
    NueCalendarHeaderProps as NueDatePickerHeaderProps,
    NueCalendarHeaderEmits as NueDatePickerHeaderEmits,
    NueCalendarBodyProps as NueDatePickerBodyProps,
    NueCalendarBodyEmits as NueDatePickerBodyEmits,
    NueCalendarMonthProps as NueDatePickerMonthProps,
    NueCalendarMonthEmits as NueDatePickerMonthEmits,
    NueCalendarYearProps as NueDatePickerYearProps,
    NueCalendarYearEmits as NueDatePickerYearEmits,
    NueCalendarTimeProps as NueDatePickerTimeProps,
    NueCalendarTimeEmits as NueDatePickerTimeEmits
} from '../calendar/calendar-types';

/**
 * 日期选择器属性类型
 */
export interface NueDatePickerProps extends GlobalProps {
    modelValue?: NueDatePickerValue;
    type?: NueDatePickerType;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    size?: NueDatePickerSize;
}

export type NueDatePickerEmits = {
    (e: 'update:modelValue', value: NueDatePickerValue): void;
    (e: 'change', value: NueDatePickerValue): void;
    (e: 'clear'): void;
    (e: 'close'): void;
};

/**
 * 日期选择器面板类型
 */
export type NueDatePickerPanelProps = {
    size?: 'small' | 'large';
    modelValue?: string | null;
    type?: NueDatePickerType;
};

export type NueDatePickerPanelEmits = {
    (e: 'update:modelValue', value: string | null): void;
    (e: 'change', value: string | null): void;
    (e: 'clear'): void;
};
