import { describe, it, expect, vi } from 'vite-plus/test';
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

describe('NueDatePicker 时区无关显示', () => {
    // 用 vi.stubEnv 切换时区：Node 会在 process.env.TZ 变更后重新读取，Date 随之切换
    const withTZ = (tz: string, fn: () => void) => {
        vi.stubEnv('TZ', tz);
        try {
            fn();
        } finally {
            vi.unstubAllEnvs();
        }
    };

    it('西半球时区（America/New_York）下 date-only 值不应错一天', () => {
        withTZ('America/New_York', () => {
            const wrapper = mount(NueDatePicker, { props: { modelValue: '2024-04-20' } });
            expect(wrapper.text()).toContain('2024年04月20日');
        });
    });

    it('UTC / 东半球 / 极东时区下 date-only 值保持当天', () => {
        for (const tz of ['UTC', 'Asia/Shanghai', 'Pacific/Kiritimati']) {
            withTZ(tz, () => {
                const wrapper = mount(NueDatePicker, { props: { modelValue: '2024-04-20' } });
                expect(wrapper.text()).toContain('2024年04月20日');
            });
        }
    });

    it('type="datetime" 带时间串应显示本地时刻', () => {
        withTZ('America/New_York', () => {
            const wrapper = mount(NueDatePicker, {
                props: { modelValue: '2024-04-20 14:30', type: 'datetime' }
            });
            expect(wrapper.text()).toContain('2024年04月20日 14:30');
        });
    });

    it('type="datetime" ISO 时刻串按本地时区换算显示', () => {
        withTZ('America/New_York', () => {
            const wrapper = mount(NueDatePicker, {
                props: { modelValue: '2024-04-20T18:30:00Z', type: 'datetime' }
            });
            expect(wrapper.text()).toContain('2024年04月20日 14:30');
        });
    });

    it('type="datetime" date-only 值不应错一天（时刻补 00:00）', () => {
        withTZ('America/New_York', () => {
            const wrapper = mount(NueDatePicker, {
                props: { modelValue: '2024-04-20', type: 'datetime' }
            });
            expect(wrapper.text()).toContain('2024年04月20日 00:00');
        });
    });

    it('无效日期在各时区仍提示无效', () => {
        for (const tz of ['America/New_York', 'Asia/Shanghai']) {
            withTZ(tz, () => {
                const wrapper = mount(NueDatePicker, { props: { modelValue: '2024-02-31' } });
                expect(wrapper.text()).toContain('无效日期');
            });
        }
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
describe('NueDatePicker 可访问性', () => {
    it('清除按钮应该是触发按钮的同级原生 button，且有可访问名', () => {
        const wrapper = mount(NueDatePicker, {
            props: { modelValue: '2024-04-20', clearable: true }
        });
        expect(wrapper.find('.nue-date-picker__clear').exists()).toBe(true);
        const clear = wrapper.find('.nue-date-picker__clear');
        expect(clear.element.tagName).toBe('BUTTON');
        expect(clear.attributes('type')).toBe('button');
        expect(clear.attributes('aria-label')).toBe('清除日期');
    });

    it('不应该出现 button 内嵌 button', () => {
        const wrapper = mount(NueDatePicker, {
            props: { modelValue: '2024-04-20', clearable: true }
        });
        expect(wrapper.findAll('button button').length).toBe(0);
    });

    it('点击清除按钮应该清空值并派发 clear', async () => {
        const wrapper = mount(NueDatePicker, {
            props: { modelValue: '2024-04-20', clearable: true }
        });
        await wrapper.find('.nue-date-picker__clear').trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([null]);
        expect(wrapper.emitted('change')?.[0]).toEqual([null]);
        expect(wrapper.emitted('clear')).toBeTruthy();
    });

    it('禁用时清除按钮同步禁用', () => {
        const wrapper = mount(NueDatePicker, {
            props: { modelValue: '2024-04-20', clearable: true, disabled: true }
        });
        expect(wrapper.find('.nue-date-picker__clear').attributes('disabled')).toBeDefined();
    });

    it('无值时不渲染清除按钮', () => {
        const wrapper = mount(NueDatePicker, { props: { clearable: true } });
        expect(wrapper.find('.nue-date-picker__clear').exists()).toBe(false);
    });
});