import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueCalendar } from '../index';

describe('NueCalendar', () => {
    describe('渲染', () => {
        it('应该渲染默认日历组件', () => {
            const wrapper = mount(NueCalendar);
            expect(wrapper.find('.nue-calendar').exists()).toBe(true);
            expect(wrapper.find('.nue-calendar-header').exists()).toBe(true);
            expect(wrapper.find('.nue-calendar-body').exists()).toBe(true);
        });

        it('应该渲染年份选择视图', () => {
            const wrapper = mount(NueCalendar);
            // 默认渲染日期视图，不渲染年份视图
            expect(wrapper.find('.nue-calendar-year').exists()).toBe(false);
        });

        it('应该应用 size prop', () => {
            const wrapper = mount(NueCalendar, {
                props: { size: 'small' }
            });
            expect(wrapper.find('.nue-calendar--small').exists()).toBe(true);
        });

        it('应该应用 large size', () => {
            const wrapper = mount(NueCalendar, {
                props: { size: 'large' }
            });
            expect(wrapper.find('.nue-calendar--large').exists()).toBe(true);
        });
    });

    describe('日期选择', () => {
        it('点击日期单元格应该触发 update:modelValue', async () => {
            const wrapper = mount(NueCalendar);
            // 找到第一个可点击的日期单元格（非禁用、当月）
            const dateCell = wrapper.find('.date-cell:not(.other-month):not(.disabled)');
            expect(dateCell.exists()).toBe(true);

            await dateCell.trigger('click');
            const emitted = wrapper.emitted('update:modelValue');
            expect(emitted).toBeTruthy();
            expect(emitted![0][0]).toEqual(expect.any(String));
        });

        it('点击日期单元格应该触发 change 事件', async () => {
            const wrapper = mount(NueCalendar);
            const dateCell = wrapper.find('.date-cell:not(.other-month):not(.disabled)');
            await dateCell.trigger('click');

            const emitted = wrapper.emitted('change');
            expect(emitted).toBeTruthy();
            expect(emitted![0][0]).toEqual(expect.any(String));
        });
    });

    describe('视图切换', () => {
        it('点击年按钮应切换到年份视图', async () => {
            const wrapper = mount(NueCalendar);
            // 点击年份按钮
            const yearBtn = wrapper.find('.nue-calendar-header__year');
            await yearBtn.trigger('click');

            expect(wrapper.find('.nue-calendar-year').exists()).toBe(true);
            expect(wrapper.find('.nue-calendar-body').exists()).toBe(false);
        });

        it('点击月按钮应切换到月份视图', async () => {
            const wrapper = mount(NueCalendar);
            // 点击月份按钮
            const monthBtn = wrapper.find('.nue-calendar-header__month');
            await monthBtn.trigger('click');

            expect(wrapper.find('.nue-calendar-month').exists()).toBe(true);
            expect(wrapper.find('.nue-calendar-body').exists()).toBe(false);
        });

        it('在年份视图选择年份后应返回日期视图', async () => {
            const wrapper = mount(NueCalendar);
            // 先切换到年份视图
            await wrapper.find('.nue-calendar-header__year').trigger('click');
            expect(wrapper.find('.nue-calendar-year').exists()).toBe(true);

            // 点击一个年份
            const yearCell = wrapper.find('.year-cell');
            await yearCell.trigger('click');

            expect(wrapper.find('.nue-calendar-year').exists()).toBe(false);
            expect(wrapper.find('.nue-calendar-body').exists()).toBe(true);
        });

        it('在月份视图选择月份后应返回日期视图', async () => {
            const wrapper = mount(NueCalendar);
            // 先切换到月份视图
            await wrapper.find('.nue-calendar-header__month').trigger('click');
            expect(wrapper.find('.nue-calendar-month').exists()).toBe(true);

            // 点击一个月份
            const monthCell = wrapper.find('.month-cell');
            await monthCell.trigger('click');

            expect(wrapper.find('.nue-calendar-month').exists()).toBe(false);
            expect(wrapper.find('.nue-calendar-body').exists()).toBe(true);
        });
    });

    describe('插槽', () => {
        it('应该渲染 cell 作用域插槽', () => {
            const wrapper = mount(NueCalendar, {
                slots: {
                    cell: '<span class="custom-cell">1</span>'
                }
            });
            expect(wrapper.find('.custom-cell').exists()).toBe(true);
        });

        it('应该在有 footer 插槽时显示底部区域', () => {
            const wrapper = mount(NueCalendar, {
                slots: {
                    footer: '<span class="custom-footer">自定义操作</span>'
                }
            });
            expect(wrapper.find('.custom-footer').exists()).toBe(true);
            expect(wrapper.find('.nue-calendar__footer').exists()).toBe(true);
        });

        it('footer 插槽的 clear 函数应能清除选中日期', async () => {
            const wrapper = mount(NueCalendar, {
                slots: {
                    footer: `
                        <template #footer="{ clear }">
                            <button class="clear-btn" @click="clear">清除</button>
                        </template>
                    `
                }
            });

            // 先选中一个日期
            const dateCell = wrapper.find('.date-cell:not(.other-month):not(.disabled)');
            await dateCell.trigger('click');
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();

            // 点击清除按钮
            await wrapper.find('.clear-btn').trigger('click');
            const emitted = wrapper.emitted('update:modelValue');
            expect(emitted![1][0]).toBeNull();
        });
    });

    describe('v-model', () => {
        it('应该通过 modelValue 显示选中日期', async () => {
            const wrapper = mount(NueCalendar, {
                props: { modelValue: '2024-04-20T00:00:00.000Z' }
            });
            const selectedCells = wrapper.findAll('.date-cell.selected');
            expect(selectedCells.length).toBeGreaterThanOrEqual(1);
        });

        it('应该没有选中项当 modelValue 为 null', () => {
            const wrapper = mount(NueCalendar, {
                props: { modelValue: null }
            });
            const selectedCells = wrapper.findAll('.date-cell.selected');
            expect(selectedCells.length).toBe(0);
        });
    });

    describe('禁用日期', () => {
        it('minDate 之前的日期应被禁用', () => {
            const wrapper = mount(NueCalendar, {
                props: {
                    modelValue: '2024-06-15T00:00:00.000Z',
                    minDate: '2024-06-01'
                }
            });
            const disabledCells = wrapper.findAll('.date-cell.disabled');
            expect(disabledCells.length).toBeGreaterThan(0);
        });
    });

    describe('datetime 类型', () => {
        it('datetime 类型时应该渲染时间选择器', () => {
            const wrapper = mount(NueCalendar, {
                props: { type: 'datetime' }
            });
            expect(wrapper.find('.nue-calendar-time-picker').exists()).toBe(true);
        });

        it('date 类型时不应该渲染时间选择器', () => {
            const wrapper = mount(NueCalendar, {
                props: { type: 'date' }
            });
            expect(wrapper.find('.nue-calendar-time-picker').exists()).toBe(false);
        });
    });
});
