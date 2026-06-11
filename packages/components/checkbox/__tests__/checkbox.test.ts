import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueCheckbox } from '../index';

describe('NueCheckbox', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认复选框', () => {
            const wrapper = mount(NueCheckbox);
            expect(wrapper.find('.nue-checkbox').exists()).toBe(true);
        });

        it('应该渲染带标签的复选框', () => {
            const wrapper = mount(NueCheckbox, {
                props: { label: '选项' }
            });
            expect(wrapper.text()).toContain('选项');
        });

        it('应该渲染带插槽内容的复选框', () => {
            const wrapper = mount(NueCheckbox, {
                slots: { default: '自定义内容' }
            });
            expect(wrapper.text()).toContain('自定义内容');
        });

        it('应该渲染不同尺寸的复选框', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueCheckbox, { props: { size } });
                expect(wrapper.find('.nue-checkbox').classes()).toContain(`nue-checkbox--${size}`);
            });
        });

        it('应该渲染不同主题的复选框', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueCheckbox, { props: { theme } });
                expect(wrapper.find('.nue-checkbox').classes()).toContain(`nue-checkbox--${theme}`);
            });
        });

        it('应该渲染禁用状态的复选框', () => {
            const wrapper = mount(NueCheckbox, { props: { disabled: true } });
            expect(wrapper.find('.nue-checkbox').classes()).toContain('nue-checkbox--disabled');
        });

        it('应该渲染加载状态的复选框', () => {
            const wrapper = mount(NueCheckbox, { props: { loading: true } });
            expect(wrapper.find('.nue-checkbox').classes()).toContain('nue-checkbox--loading');
        });

        it('应该渲染半选状态的复选框', () => {
            const wrapper = mount(NueCheckbox, { props: { indeterminate: true } });
            expect(wrapper.find('.nue-checkbox').classes()).toContain('nue-checkbox--checked');
        });

        it('应该渲染选中状态的复选框', () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: true }
            });
            expect(wrapper.find('.nue-checkbox').classes()).toContain('nue-checkbox--checked');
        });

        it('应该渲染带 name 属性的复选框', () => {
            const wrapper = mount(NueCheckbox, {
                props: { name: 'test-checkbox' }
            });
            expect(wrapper.props('name')).toBe('test-checkbox');
        });
    });

    describe('v-model 双向绑定', () => {
        it('应该正确绑定 modelValue（布尔值）', () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: true }
            });
            expect(wrapper.vm.modelValue).toBe(true);
        });

        it('应该触发 update:modelValue 事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
        });

        it('应该响应 modelValue 变化', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false }
            });
            await wrapper.setProps({ modelValue: true });
            expect(wrapper.vm.modelValue).toBe(true);
        });
    });

    describe('事件处理', () => {
        it('应该触发 change 事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('change')?.[0]).toEqual([true]);
        });

        it('应该触发 checked 事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('checked')).toBeTruthy();
        });

        it('应该触发 unchecked 事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: true }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('unchecked')).toBeTruthy();
        });

        it('禁用状态下不应该触发事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { disabled: true }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('change')).toBeFalsy();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('加载状态下不应该触发事件', async () => {
            const wrapper = mount(NueCheckbox, {
                props: { loading: true }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(wrapper.emitted('change')).toBeFalsy();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });
    });

    describe('beforeCheck 钩子', () => {
        it('应该支持 beforeCheck 钩子（同步）', async () => {
            const beforeCheck = vi.fn(() => true);
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false, beforeCheck }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(beforeCheck).toHaveBeenCalled();
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        });

        it('应该支持 beforeCheck 钩子（异步）', async () => {
            const beforeCheck = vi.fn(() => Promise.resolve(true));
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false, beforeCheck }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            await new Promise(resolve => setTimeout(resolve, 10));
            expect(beforeCheck).toHaveBeenCalled();
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        });

        it('beforeCheck 返回 false 时不应该切换状态', async () => {
            const beforeCheck = vi.fn(() => false);
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false, beforeCheck }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(beforeCheck).toHaveBeenCalled();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });

        it('beforeCheck 抛出异常时不应该切换状态', async () => {
            const beforeCheck = vi.fn(() => {
                throw new Error('Test error');
            });
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false, beforeCheck }
            });
            await wrapper.find('.nue-checkbox').trigger('click');
            expect(beforeCheck).toHaveBeenCalled();
            expect(wrapper.emitted('update:modelValue')).toBeFalsy();
        });
    });

    describe('图标渲染', () => {
        it('应该根据状态渲染不同的图标', () => {
            const wrapper = mount(NueCheckbox, {
                props: { modelValue: false }
            });
            expect(wrapper.find('.nue-checkbox__icon').exists()).toBe(true);
        });

        it('加载状态应该显示加载图标', () => {
            const wrapper = mount(NueCheckbox, {
                props: { loading: true }
            });
            expect(wrapper.find('.nue-checkbox__icon').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染 prefix 插槽', () => {
            const wrapper = mount(NueCheckbox, {
                slots: { prefix: '<span class="prefix-content">[前缀]</span>' }
            });
            expect(wrapper.find('.prefix-content').exists()).toBe(true);
        });

        it('应该渲染 suffix 插槽', () => {
            const wrapper = mount(NueCheckbox, {
                props: { label: '选项' },
                slots: { suffix: '<span class="suffix-content">[后缀]</span>' }
            });
            expect(wrapper.find('.suffix-content').exists()).toBe(true);
        });
    });

    describe('标签渲染', () => {
        it('应该渲染 label 属性', () => {
            const wrapper = mount(NueCheckbox, {
                props: { label: '测试标签' }
            });
            expect(wrapper.text()).toContain('测试标签');
        });

        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueCheckbox, {
                slots: { default: '插槽内容' }
            });
            expect(wrapper.text()).toContain('插槽内容');
        });

        it('默认插槽优先级高于 label 属性', () => {
            const wrapper = mount(NueCheckbox, {
                props: { label: 'Label' },
                slots: { default: 'Slot' }
            });
            expect(wrapper.text()).toContain('Slot');
        });
    });
});
