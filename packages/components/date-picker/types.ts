import type { GlobalProps } from '@nue-ui/utils';

/**
 * 日期选择器类型
 */
// 日期选择器类型
export type NueDatePickerType = 'date' | 'datetime';
// 日期选择器值类型
export type NueDatePickerValue = string | null | undefined;
// 日期选择器大小类型
export type NueDatePickerSize = 'small' | 'large';
// 日期选择器视图模式类型
export type DatePickerViewMode = 'date' | 'month' | 'year';
// 日期选择器属性类型
export interface NueDatePickerProps extends GlobalProps {
    modelValue?: NueDatePickerValue;
    type?: NueDatePickerType;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
    size?: NueDatePickerSize;
}
// 日期选择器事件类型
export type NueDatePickerEmits = {
    (e: 'update:modelValue', value: NueDatePickerValue): void;
    (e: 'change', value: NueDatePickerValue): void;
    (e: 'clear'): void;
    (e: 'close'): void;
};
// 日期选择器上下文类型
export type NueDatePickerContext = {
    size?: NueDatePickerSize;
    disabled: boolean;
};

/**
 * 日期选择器面板类型
 */
// 日期选择器面板属性类型
export type NueDatePickerPanelProps = {
    size?: 'small' | 'large';
    modelValue?: string | null;
    type?: NueDatePickerType;
};
// 日期选择器面板事件类型
export type NueDatePickerPanelEmits = {
    (e: 'update:modelValue', value: string | null): void;
    (e: 'change', value: string | null): void;
    (e: 'clear'): void;
};

/**
 * 日期选择器头部类型
 */
// 日期选择器头部属性类型
export type NueDatePickerHeaderProps = {
    year: number;
    month: number;
    mode?: DatePickerViewMode;
};
// 日期选择器头部事件类型
export type NueDatePickerHeaderEmits = {
    (e: 'update:year', year: number): void;
    (e: 'update:month', month: number): void;
    (e: 'update:view', view: DatePickerViewMode): void;
};

/**
 * 日期选择器主体类型
 */
// 日期选择器主体属性类型
export type NueDatePickerBodyProps = {
    year: number;
    month: number;
    selectedDate?: string | null;
    minDate?: string;
    maxDate?: string;
};
// 日期选择器主体事件类型
export type NueDatePickerBodyEmits = {
    (e: 'select', date: string): void;
};

/**
 * 日期选择器月份类型
 */
// 日期选择器月份属性类型
export type NueDatePickerMonthProps = {
    year: number;
    month: number;
};
// 日期选择器月份事件类型
export type NueDatePickerMonthEmits = {
    (e: 'select', month: number): void;
    (e: 'update:view', view: 'date' | 'month' | 'year'): void;
};

/**
 * 日期选择器年份类型
 */
// 日期选择器年份属性类型
export type NueDatePickerYearProps = {
    year: number;
};
// 日期选择器年份事件类型
export type NueDatePickerYearEmits = {
    (e: 'select', year: number): void;
    (e: 'update:view', view: 'date' | 'month' | 'year'): void;
};

/**
 * 日期选择器时间类型
 */
// 日期选择器时间属性类型
export type NueDatePickerTimeProps = {
    hour: number;
    minute: number;
};
// 日期选择器时间事件类型
export type NueDatePickerTimeEmits = {
    (e: 'update:hour', hour: number): void;
    (e: 'update:minute', minute: number): void;
    (e: 'change', time: { hour: number; minute: number; second?: number }): void;
};
