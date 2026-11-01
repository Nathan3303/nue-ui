import { describe, it, expect, afterEach, vi } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueSwitch } from '../index';

describe('NueSwitch', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认开关', () => {
            const wrapper = mount(NueSwitch);
            expect(wrapper.find('.nue-switch').exists()).toBe(true);
        });

        it('应该渲染不同尺寸的开关', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueSwitch, { props: { size } });
                expect(wrapper.find('.nue-switch').classes()).toContain(`nue-switch--${size}`);
            });
        });

        it('应该渲染禁用状态的开关', () => {
            const wrapper = mount(NueSwitch, { props: { disabled: true } });
            expect(wrapper.find('.nue-switch').classes()).toContain('nue-switch--disabled');
        });

        it('应该渲染加载状态的开关', () => {
            const wrapper = mount(NueSwitch, { props: { loading: true } });
            expect(wrapper.find('.nue-switch__loading-icon').exists()).toBe(true);
        });
    });

    describe('v-model 双向绑定', () => {
        it('应该触发 update:modelValue 事件', async () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: false }
            });
            await wrapper.find('.nue-switch').trigger('click');
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
        });

        it('应该触发 change 事件', async () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: false }
            });
            await wrapper.find('.nue-switch').trigger('click');
            expect(wrapper.emitted('change')?.[0]).toEqual([true]);
        });

        it('禁用状态下不应该触发事件', async () => {
            const wrapper = mount(NueSwitch, {
                props: { disabled: true }
            });
            await wrapper.find('.nue-switch').trigger('click');
            expect(wrapper.emitted('change')).toBeFalsy();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('加载状态下不应该触发事件', async () => {
            const wrapper = mount(NueSwitch, {
                props: { loading: true }
            });
            await wrapper.find('.nue-switch').trigger('click');
            expect(wrapper.emitted('change')).toBeFalsy();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });
    });

    describe('可访问性', () => {
        it('应该暴露 switch 语义与可访问名', () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: false },
                attrs: { 'aria-label': '通知开关' }
            });
            const switchEl = wrapper.find('.nue-switch');
            expect(switchEl.attributes('role')).toBe('switch');
            expect(switchEl.attributes('aria-checked')).toBe('false');
            expect(switchEl.attributes('tabindex')).toBe('0');
            expect(switchEl.attributes('aria-label')).toBe('通知开关');
        });

        it('aria-checked 应该跟随状态变化', async () => {
            const wrapper = mount(NueSwitch, { props: { modelValue: false } });
            const switchEl = wrapper.find('.nue-switch');
            await wrapper.setProps({ modelValue: true });
            expect(switchEl.attributes('aria-checked')).toBe('true');
        });

        it('禁用时应该不可聚焦且标记 aria-disabled', () => {
            const wrapper = mount(NueSwitch, { props: { disabled: true } });
            const switchEl = wrapper.find('.nue-switch');
            expect(switchEl.attributes('tabindex')).toBe('-1');
            expect(switchEl.attributes('aria-disabled')).toBe('true');
        });

        it('Space 应该切换状态', async () => {
            const wrapper = mount(NueSwitch, { props: { modelValue: false } });
            await wrapper.find('.nue-switch').trigger('keydown', { key: ' ' });
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
            expect(wrapper.emitted('change')?.[0]).toEqual([true]);
        });

        it('Enter 应该切换状态', async () => {
            const wrapper = mount(NueSwitch, { props: { modelValue: false } });
            await wrapper.find('.nue-switch').trigger('keydown', { key: 'Enter' });
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
        });

        it('禁用时键盘不应该切换状态', async () => {
            const wrapper = mount(NueSwitch, { props: { modelValue: false, disabled: true } });
            await wrapper.find('.nue-switch').trigger('keydown', { key: ' ' });
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染 circle 插槽', () => {
            const wrapper = mount(NueSwitch, {
                slots: { circle: '<span class="circle-content">✓</span>' }
            });
            expect(wrapper.find('.circle-content').exists()).toBe(true);
        });
    });

    describe('状态文本', () => {
        it('应该渲染激活状态文本', () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: true, showText: true, activeText: '已开启' }
            });
            expect(wrapper.text()).toContain('已开启');
        });

        it('应该渲染非激活状态文本', () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: false, showText: true, inactiveText: '已关闭' }
            });
            expect(wrapper.text()).toContain('已关闭');
        });
    });

    describe('默认插槽文案', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        // master 820a36c9 基线：showText 形态（不传插槽）落盘捕获，用作零回归逐字符比对
        const SHOW_TEXT_BASELINE_ATTRIBUTES = {
            'aria-checked': 'false',
            class: 'nue-switch',
            tabindex: '0',
            role: 'switch'
        };
        const SHOW_TEXT_BASELINE_INNER_HTML =
            '<div class="nue-switch__circle"><!--v-if--></div><div class="nue-switch__text">已关闭</div>';

        it('S-01 默认插槽应作为开关文案渲染', () => {
            const wrapper = mount(NueSwitch, { slots: { default: '开启通知' } });
            expect(wrapper.findAll('.nue-switch__text')).toHaveLength(1);
            expect(wrapper.find('.nue-switch__text').text()).toBe('开启通知');
            expect(wrapper.find('.nue-switch__circle').exists()).toBe(true);
            expect(wrapper.text()).toContain('开启通知');
        });

        it('S-02 同时提供默认插槽与 #text 时只渲染 #text', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const error = vi.spyOn(console, 'error').mockImplementation(() => {});
            const wrapper = mount(NueSwitch, {
                slots: { default: '开启通知', text: '插槽文案' }
            });
            expect(wrapper.findAll('.nue-switch__text')).toHaveLength(1);
            expect(wrapper.find('.nue-switch__text').text()).toBe('插槽文案');
            expect(wrapper.text()).not.toContain('开启通知');
            expect(warn).not.toHaveBeenCalled();
            expect(error).not.toHaveBeenCalled();
        });

        it('S-03 空白默认插槽不应渲染文案容器', () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const blank = mount(NueSwitch, { slots: { default: '   ' } });
            expect(blank.findAll('.nue-switch__text')).toHaveLength(0);
            expect(blank.find('.nue-switch__circle').exists()).toBe(true);

            const empty = mount(NueSwitch, { slots: { default: '' } });
            expect(empty.findAll('.nue-switch__text')).toHaveLength(0);
            expect(empty.find('.nue-switch__circle').exists()).toBe(true);

            expect(warn).not.toHaveBeenCalled();
        });

        it('S-04 无插槽的 showText 形态应与 master 基线一致', async () => {
            const wrapper = mount(NueSwitch, {
                props: {
                    modelValue: false,
                    showText: true,
                    inactiveText: '已关闭',
                    activeText: '已开启'
                }
            });
            expect(wrapper.find('.nue-switch__text').text()).toBe('已关闭');
            expect(wrapper.attributes()).toEqual(SHOW_TEXT_BASELINE_ATTRIBUTES);
            expect(wrapper.element.innerHTML).toBe(SHOW_TEXT_BASELINE_INNER_HTML);

            await wrapper.setProps({ modelValue: true });
            expect(wrapper.find('.nue-switch__text').text()).toBe('已开启');
        });

        it('S-05 带默认插槽时 a11y 行为不应回退', async () => {
            const props = { modelValue: false };
            const slots = { default: '开启通知' };

            const wrapper = mount(NueSwitch, { props, slots });
            const switchEl = wrapper.find('.nue-switch');
            expect(switchEl.attributes('role')).toBe('switch');
            expect(switchEl.attributes('tabindex')).toBe('0');
            expect(switchEl.attributes('aria-checked')).toBe('false');
            expect(wrapper.find('.nue-switch__text').attributes('tabindex')).toBeUndefined();
            await switchEl.trigger('click');
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

            const enterWrapper = mount(NueSwitch, { props, slots });
            await enterWrapper.find('.nue-switch').trigger('keydown', { key: 'Enter' });
            expect(enterWrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

            const spaceWrapper = mount(NueSwitch, { props, slots });
            await spaceWrapper.find('.nue-switch').trigger('keydown', { key: ' ' });
            expect(spaceWrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
        });

        it('S-06 showText 的状态文案应优先于默认插槽', () => {
            const wrapper = mount(NueSwitch, {
                props: { modelValue: false, showText: true, inactiveText: '关闭' },
                slots: { default: '开启通知' }
            });
            expect(wrapper.findAll('.nue-switch__text')).toHaveLength(1);
            expect(wrapper.find('.nue-switch__text').text()).toBe('关闭');
            expect(wrapper.text()).not.toContain('开启通知');
        });
    });
});