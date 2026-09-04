/**
 * 日历上下文类型
 */
export type NueCalendarContext = {
    size?: 'small' | 'large';
    disabled: boolean;
};

/**
 * 日历视图模式
 */
export type CalendarViewMode = 'date' | 'month' | 'year';

/**
 * 日历头部属性类型
 */
export type NueCalendarHeaderProps = {
    year: number;
    month: number;
    mode?: CalendarViewMode;
};
export type NueCalendarHeaderEmits = {
    (e: 'update:year', year: number): void;
    (e: 'update:month', month: number): void;
    (e: 'update:view', view: CalendarViewMode): void;
};

/**
 * 日历主体属性类型
 */
export type NueCalendarBodyProps = {
    year: number;
    month: number;
    selectedDate?: string | null;
    minDate?: string;
    maxDate?: string;
};
export type NueCalendarBodyEmits = {
    (e: 'select', date: string): void;
};

/**
 * 日历月份选择属性类型
 */
export type NueCalendarMonthProps = {
    year: number;
    month: number;
};
export type NueCalendarMonthEmits = {
    (e: 'select', month: number): void;
    (e: 'update:view', view: 'date' | 'month' | 'year'): void;
};

/**
 * 日历年份选择属性类型
 */
export type NueCalendarYearProps = {
    year: number;
};
export type NueCalendarYearEmits = {
    (e: 'select', year: number): void;
    (e: 'update:view', view: 'date' | 'month' | 'year'): void;
};

/**
 * 日历时间选择属性类型
 */
export type NueCalendarTimeProps = {
    hour: number;
    minute: number;
};
export type NueCalendarTimeEmits = {
    (e: 'update:hour', hour: number): void;
    (e: 'update:minute', minute: number): void;
    (e: 'change', time: { hour: number; minute: number; second?: number }): void;
};