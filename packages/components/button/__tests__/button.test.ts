import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueButton } from '../index';

describe('NueButton', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认按钮', () => {
            const wrapper = mount(NueButton);
            expect(wrapper.find('button').exists()).toBe(true);
            expect(wrapper.text()).toBe('');
        });

        it('应该渲染带文本的按钮', () => {
            const wrapper = mount(NueButton, {
                slots: { default: '点击我' }
            });
            expect(wrapper.text()).toBe('点击我');
        });

        it('应该渲染不同尺寸的按钮', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueButton, { props: { size } });
                expect(wrapper.find('button').classes()).toContain(`nue-button--${size}`);
            });
        });

        it('应该渲染不同主题的按钮', () => {
            const themes = ['primary', 'success', 'warning', 'danger', 'ghost', 'icon'];
            themes.forEach(theme => {
                const wrapper = mount(NueButton, { props: { theme } });
                expect(wrapper.find('button').classes()).toContain(`nue-button--${theme}`);
            });
        });

        it('应该渲染扁平按钮', () => {
            const wrapper = mount(NueButton, { props: { flat: true } });
            expect(wrapper.find('button').classes()).toContain('nue-button--flat');
        });

        it('应该渲染不同对齐方式的按钮', () => {
            const alignments = ['start', 'center', 'end'] as const;
            alignments.forEach(alignment => {
                const wrapper = mount(NueButton, { props: { alignment } });
                expect(wrapper.find('button').attributes('style')).toContain(
                    `--nue-button-alignment: ${alignment}`
                );
            });
        });

        it('应该渲染带 flex 的按钮', () => {
            const wrapper = mount(NueButton, { props: { flex: '1' } });
            expect(wrapper.find('button').attributes('style')).toContain('--nue-button-flex');
        });

        it('应该渲染禁用状态的按钮', () => {
            const wrapper = mount(NueButton, { props: { disabled: true } });
            expect(wrapper.find('button').classes()).toContain('nue-button--disabled');
            expect(wrapper.find('button').attributes('disabled')).toBeDefined();
        });

        it('应该渲染加载状态的按钮', () => {
            const wrapper = mount(NueButton, { props: { loading: true } });
            expect(wrapper.find('button').classes()).toContain('nue-button--disabled');
            expect(wrapper.find('.nue-button__icon').exists()).toBe(true);
        });

        it('应该渲染带标题的按钮', () => {
            const wrapper = mount(NueButton, { props: { title: '提示文本' } });
            expect(wrapper.find('button').attributes('title')).toBe('提示文本');
        });

        it('应该渲染不同类型的按钮', () => {
            const types = ['submit', 'reset', 'button'] as const;
            types.forEach(type => {
                const wrapper = mount(NueButton, { props: { type } });
                expect(wrapper.find('button').attributes('type')).toBe(type);
            });
        });
    });

    describe('事件处理', () => {
        it('应该触发 click 事件', async () => {
            const wrapper = mount(NueButton);
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted('click')).toBeTruthy();
            expect(wrapper.emitted('click')?.[0]).toHaveLength(1);
        });

        it('禁用状态下不应该触发 click 事件', async () => {
            const wrapper = mount(NueButton, { props: { disabled: true } });
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted('click')).toBeFalsy();
        });

        it('加载状态下不应该触发 click 事件', async () => {
            const wrapper = mount(NueButton, { props: { loading: true } });
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted('click')).toBeFalsy();
        });
    });

    describe('图标渲染', () => {
        it('应该渲染图标', () => {
            const wrapper = mount(NueButton, { props: { icon: 'search' } });
            expect(wrapper.find('.nue-button__icon').exists()).toBe(true);
        });

        it('加载状态应该显示加载图标', () => {
            const wrapper = mount(NueButton, {
                props: { loading: true, loadingIcon: 'loading' }
            });
            expect(wrapper.find('.nue-button__icon').exists()).toBe(true);
        });

        it('应该同时渲染图标和文本', () => {
            const wrapper = mount(NueButton, {
                props: { icon: 'search' },
                slots: { default: '搜索' }
            });
            expect(wrapper.find('.nue-button__icon').exists()).toBe(true);
            expect(wrapper.text()).toContain('搜索');
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueButton, {
                slots: { default: '按钮文本' }
            });
            expect(wrapper.text()).toBe('按钮文本');
        });

        it('应该渲染 append 插槽', () => {
            const wrapper = mount(NueButton, {
                slots: {
                    default: '按钮',
                    append: '<span class="append-content">后缀</span>'
                }
            });
            expect(wrapper.find('.append-content').exists()).toBe(true);
        });
    });

    describe('节流功能', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('启用节流时应该限制点击频率', async () => {
            const wrapper = mount(NueButton, {
                props: { useThrottle: true, throttleDuration: 200 }
            });
            const button = wrapper.find('button');
            await button.trigger('click');
            await button.trigger('click');
            expect(wrapper.emitted('click')?.length).toBe(1);
        });

        it('节流时间过后应该允许再次点击', async () => {
            const wrapper = mount(NueButton, {
                props: { useThrottle: true, throttleDuration: 200 }
            });
            const button = wrapper.find('button');
            await button.trigger('click');
            vi.advanceTimersByTime(200);
            await button.trigger('click');
            expect(wrapper.emitted('click')?.length).toBe(2);
        });

        it('未启用节流时不应该限制点击频率', async () => {
            const wrapper = mount(NueButton, {
                props: { useThrottle: false }
            });
            const button = wrapper.find('button');
            await button.trigger('click');
            await button.trigger('click');
            expect(wrapper.emitted('click')?.length).toBe(2);
        });
    });
});
