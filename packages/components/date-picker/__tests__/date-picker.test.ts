import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueDatePicker } from '../index';
import { NueCalendarBody } from '../../calendar';
import DatePickerPanel from '../date-picker-panel.vue';
import { NUE_DATE_PICKER_CTX_KEY } from '../constants';
import { parseDate } from '@nue-ui/utils';

describe('NueDatePicker', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认日期选择器', () => {
            const wrapper = mount(NueDatePicker);
            expect(wrapper.find('.nue-dropdown-wrapper').exists()).toBe(true);
        });
    });

    describe('日期解析', () => {
        it('parseDate 应该支持 YYYY-MM-DD 格式', () => {
            const date = parseDate('2024-04-20');
            expect(date).not.toBeNull();
            expect(date?.getFullYear()).toBe(2024);
            expect(date?.getMonth()).toBe(3);
            expect(date?.getDate()).toBe(20);
        });

        it('parseDate 应该支持 ISO 格式带时间', () => {
            const date = parseDate('2024-04-20T14:30:00');
            expect(date).not.toBeNull();
            expect(date?.getFullYear()).toBe(2024);
            expect(date?.getMonth()).toBe(3);
            expect(date?.getDate()).toBe(20);
        });

        it('parseDate 应该支持 ISO 格式带时区', () => {
            const date = parseDate('2024-04-20T14:30:00Z');
            expect(date).not.toBeNull();
        });

        it('parseDate 应该支持 ISO 格式带毫秒', () => {
            const date = parseDate('2024-04-20T14:30:00.123Z');
            expect(date).not.toBeNull();
        });

        it('parseDate 应该返回 null 对于无效日期格式', () => {
            expect(parseDate('invalid-date')).toBeNull();
            expect(parseDate('2024/04/20')).toBeNull();
            expect(parseDate('20-04-2024')).toBeNull();
            expect(parseDate('')).toBeNull();
        });

        it('parseDate 应该返回 null 对于不存在的日期', () => {
            expect(parseDate('2024-02-30')).toBeNull();
            expect(parseDate('2024-13-01')).toBeNull();
        });
    });

    describe('无效日期处理', () => {
        it('应该显示无效日期提示', () => {
            const wrapper = mount(NueDatePicker, {
                props: { modelValue: 'invalid-date' }
            });
            expect(wrapper.text()).toContain('无效日期');
        });

        it('应该正常显示有效日期', () => {
            const wrapper = mount(NueDatePicker, {
                props: { modelValue: '2024-04-20' }
            });
            expect(wrapper.text()).not.toContain('无效日期');
            expect(wrapper.text()).toContain('2024年04月20日');
        });
    });
});

describe('NueCalendarBody', () => {
    describe('插槽渲染', () => {
        it('应该渲染 cell 作用域插槽', () => {
            const wrapper = mount(NueCalendarBody, {
                props: { year: 2024, month: 4 },
                slots: {
                    cell: '<template #cell="{ dateStr }"><span class="custom-cell">{{ dateStr }}</span></template>'
                }
            });
            expect(wrapper.find('.custom-cell').exists()).toBe(true);
        });

        it('cell 插槽默认应渲染日期数字', () => {
            const wrapper = mount(NueCalendarBody, {
                props: { year: 2024, month: 4 }
            });
            expect(wrapper.find('.date-cell').text()).toBeTruthy();
        });
    });
});

describe('NueDatePickerPanel', () => {
    describe('插槽渲染', () => {
        it('应该渲染 footer 插槽替换默认清除按钮', () => {
            const wrapper = mount(DatePickerPanel, {
                global: {
                    provide: {
                        [NUE_DATE_PICKER_CTX_KEY]: { size: undefined, disabled: false }
                    }
                },
                slots: { footer: '<span class="custom-footer">自定义操作</span>' }
            });
            expect(wrapper.find('.custom-footer').exists()).toBe(true);
        });
    });
});