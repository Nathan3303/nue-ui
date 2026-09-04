import { withInstall } from '@nue-ui/utils';
import Calendar from './calendar.vue';
import CalendarHeader from './calendar-header.vue';
import CalendarBody from './calendar-body.vue';
import CalendarYear from './calendar-year.vue';
import CalendarMonth from './calendar-month.vue';
import CalendarTimePicker from './calendar-time-picker.vue';
import type {
    NueCalendarProps,
    NueCalendarEmits,
    NueCalendarValue,
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
} from './types';

export const NueCalendar = withInstall(Calendar);
// 子组件可直接 import 使用，无需全局注册
export { CalendarHeader as NueCalendarHeader };
export { CalendarBody as NueCalendarBody };
export { CalendarYear as NueCalendarYear };
export { CalendarMonth as NueCalendarMonth };
export { CalendarTimePicker as NueCalendarTimePicker };

export type {
    NueCalendarProps,
    NueCalendarEmits,
    NueCalendarValue,
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
};