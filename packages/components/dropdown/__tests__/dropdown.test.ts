import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueDropdown } from '../index';

describe('NueDropdown', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认下拉菜单', () => {
            const wrapper = mount(NueDropdown, {
                slots: {
                    default: '<div class="trigger">触发器</div>',
                    content: '<div class="content">下拉内容</div>'
                }
            });
            expect(wrapper.find('.nue-dropdown').exists()).toBe(true);
        });

        it('应该渲染不同尺寸的下拉菜单', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueDropdown, {
                    props: { size },
                    slots: {
                        default: '<div class="trigger">触发器</div>',
                        content: '<div class="content">下拉内容</div>'
                    }
                });
                expect(wrapper.find('.nue-dropdown').classes()).toContain(`nue-dropdown--${size}`);
            });
        });

        it('应该渲染不同主题的下拉菜单', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueDropdown, {
                    props: { theme },
                    slots: {
                        default: '<div class="trigger">触发器</div>',
                        content: '<div class="content">下拉内容</div>'
                    }
                });
                expect(wrapper.find('.nue-dropdown').classes()).toContain(`nue-dropdown--${theme}`);
            });
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueDropdown, {
                slots: {
                    default: '<div class="trigger">触发器</div>',
                    content: '<div class="content">下拉内容</div>'
                }
            });
            expect(wrapper.find('.trigger').exists()).toBe(true);
        });
    });
});
