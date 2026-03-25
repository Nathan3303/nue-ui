import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueProgress } from '../index';

describe('NueProgress', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认进度条', () => {
            const wrapper = mount(NueProgress, {
                props: { percentage: 50 }
            });
            expect(wrapper.find('.nue-progress').exists()).toBe(true);
        });

        it('应该渲染线型进度条', () => {
            const wrapper = mount(NueProgress, {
                props: { percentage: 50, type: 'line' }
            });
            expect(wrapper.find('.nue-progress__bar').exists()).toBe(true);
        });

        it('应该渲染圆形进度条', () => {
            const wrapper = mount(NueProgress, {
                props: { percentage: 50, type: 'circle' }
            });
            expect(wrapper.find('.nue-progress__circle').exists()).toBe(true);
        });

        it('应该渲染不同主题的进度条', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueProgress, {
                    props: { percentage: 50, theme }
                });
                expect(wrapper.find('.nue-progress').classes()).toContain(`nue-progress--${theme}`);
            });
        });
    });
});
