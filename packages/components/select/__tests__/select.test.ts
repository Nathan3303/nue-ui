import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';
import { NueSelect, NueSelectOption } from '../index';

describe('NueSelect', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认选择器', () => {
            const wrapper = mount(NueSelect);
            expect(wrapper.find('.nue-select').exists()).toBe(true);
        });

        it('应该渲染带占位符的选择器', () => {
            const wrapper = mount(NueSelect, {
                props: { placeholder: '请选择' }
            });
            expect(wrapper.text()).toContain('请选择');
        });

        it('应该渲染禁用状态的选择器', () => {
            const wrapper = mount(NueSelect, {
                props: { disabled: true }
            });
            expect(wrapper.find('.nue-button').attributes('disabled')).toBeDefined();
        });

        it('应该渲染不同尺寸的选择器', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueSelect, { props: { size } });
                expect(wrapper.find('.nue-button').classes()).toContain(`nue-button--${size}`);
            });
        });

        it('应该渲染不同主题的选择器', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueSelect, { props: { theme } });
                expect(wrapper.find('.nue-select').classes()).toContain(`nue-select--${theme}`);
            });
        });

        it('应该渲染可清除的选择器', () => {
            const wrapper = mount(NueSelect, {
                props: { clearable: true }
            });
            expect(wrapper.props('clearable')).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueSelect, {
                slots: {
                    default: '<div class="custom-option">选项</div>'
                }
            });
            expect(wrapper.find('.custom-option').exists()).toBe(true);
        });
    });
});
describe('NueSelect 可访问性', () => {
    const mountSelected = (props: Record<string, unknown> = {}) =>
        mount(NueSelect, {
            props: { modelValue: 'b', clearable: true, ...props },
            slots: { default: () => h(NueSelectOption, { label: 'B', value: 'b' }) }
        });

    it('清除按钮应该是触发按钮的同级原生 button，且有可访问名', async () => {
        const wrapper = mountSelected();
        await nextTick();
        expect(wrapper.find('.nue-select__clear').exists()).toBe(true);
        const clear = wrapper.find('.nue-select__clear');
        expect(clear.element.tagName).toBe('BUTTON');
        expect(clear.attributes('type')).toBe('button');
        expect(clear.attributes('aria-label')).toBe('清除选择');
    });

    it('不应该出现 button 内嵌 button', async () => {
        const wrapper = mountSelected();
        await nextTick();
        expect(wrapper.findAll('button button').length).toBe(0);
    });

    it('清除按钮在触发按钮之后（Tab 序符合预期）', async () => {
        const wrapper = mountSelected();
        await nextTick();
        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(2);
        expect(buttons[0]?.classes()).toContain('nue-button');
        expect(buttons[1]?.classes()).toContain('nue-select__clear');
    });

    it('点击清除按钮应该清空值', async () => {
        const wrapper = mountSelected();
        await nextTick();
        await wrapper.find('.nue-select__clear').trigger('click');
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([undefined]);
        expect(wrapper.emitted('change')?.[0]).toEqual([undefined]);
    });

    it('禁用时清除按钮同步禁用', async () => {
        const wrapper = mountSelected({ disabled: true });
        await nextTick();
        expect(wrapper.find('.nue-select__clear').attributes('disabled')).toBeDefined();
    });

    it('无值时不渲染清除按钮', () => {
        const wrapper = mount(NueSelect, { props: { clearable: true } });
        expect(wrapper.find('.nue-select__clear').exists()).toBe(false);
    });
});