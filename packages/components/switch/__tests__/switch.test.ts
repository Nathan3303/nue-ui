import { describe, it, expect } from 'vitest';
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
});
