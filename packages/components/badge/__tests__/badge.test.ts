import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueBadge } from '../index';

describe('NueBadge', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认徽标', () => {
            const wrapper = mount(NueBadge, {
                props: { value: 5 },
                slots: { default: '内容' }
            });
            expect(wrapper.text()).toContain('内容');
            expect(wrapper.text()).toContain('5');
        });

        it('应该渲染点状徽标', () => {
            const wrapper = mount(NueBadge, {
                props: { dot: true },
                slots: { default: '内容' }
            });
            expect(wrapper.find('.nue-badge--dot').exists()).toBe(true);
        });

        it('应该隐藏徽标', () => {
            const wrapper = mount(NueBadge, {
                props: { hidden: true, value: 5 },
                slots: { default: '内容' }
            });
            expect(wrapper.find('.nue-badge__value').exists()).toBe(false);
        });

        it('应该渲染最大值限制', () => {
            const wrapper = mount(NueBadge, {
                props: { value: 100, max: 99 }
            });
            expect(wrapper.text()).toContain('99+');
        });

        it('应该渲染不同主题的徽标', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueBadge, {
                    props: { value: 1, theme }
                });
                expect(wrapper.find('.nue-badge').classes()).toContain(`nue-badge--${theme}`);
            });
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueBadge, {
                props: { value: 5 },
                slots: { default: '测试内容' }
            });
            expect(wrapper.text()).toContain('测试内容');
        });
    });
});