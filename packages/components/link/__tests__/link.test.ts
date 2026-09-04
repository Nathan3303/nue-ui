import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueLink } from '../index';

describe('NueLink', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认链接', () => {
            const wrapper = mount(NueLink, {
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').exists()).toBe(true);
        });

        it('应该渲染禁用状态的链接', () => {
            const wrapper = mount(NueLink, {
                props: { disabled: true },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').classes()).toContain('nue-link--disabled');
        });

        it('应该渲染不同主题的链接', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueLink, {
                    props: { theme },
                    slots: { default: '链接文本' }
                });
                expect(wrapper.find('a').classes()).toContain(`nue-link--${theme}`);
            });
        });

        it('应该渲染带图标的链接', () => {
            const wrapper = mount(NueLink, {
                props: { icon: 'arrow-right' },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('.nue-link__icon').exists()).toBe(true);
        });

        it('应该渲染不同 target 的链接', () => {
            const wrapper = mount(NueLink, {
                props: { target: '_blank' },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').attributes('target')).toBe('_blank');
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueLink, {
                slots: { default: '链接文本' }
            });
            expect(wrapper.text()).toContain('链接文本');
        });

        it('应该渲染 prepend 插槽', () => {
            const wrapper = mount(NueLink, {
                slots: {
                    default: '链接',
                    prepend: '<span class="prepend-content">前缀</span>'
                }
            });
            expect(wrapper.find('.prepend-content').exists()).toBe(true);
        });
    });
});