import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueSelect } from '../index';

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
