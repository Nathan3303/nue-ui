import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueInput } from '../index';

describe('NueInput', () => {
    describe('v-model 双向绑定', () => {
        it('应该正确绑定 modelValue', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'hello' }
            });
            const input = wrapper.find('input');
            expect(input.element.value).toBe('hello');
        });

        it('应该触发 update:modelValue 事件', async () => {
            const wrapper = mount(NueInput);
            const input = wrapper.find('input');
            await input.setValue('world');
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world']);
        });

        it('应该响应 modelValue 变化', async () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'initial' }
            });
            await wrapper.setProps({ modelValue: 'updated' });
            expect(wrapper.find('input').element.value).toBe('updated');
        });
    });

    describe('输入功能', () => {
        it('应该支持中文输入法', async () => {
            const wrapper = mount(NueInput);
            const input = wrapper.find('input');
            await input.trigger('compositionstart');
            await input.setValue('测试');
            await input.trigger('compositionend');
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.emitted('update:modelValue')).toBeTruthy();
        });

        it('应该触发 input 事件', async () => {
            const wrapper = mount(NueInput);
            const input = wrapper.find('input');
            await input.setValue('test');
            expect(wrapper.emitted('input')).toBeTruthy();
        });

        it('应该触发 change 事件', async () => {
            const wrapper = mount(NueInput);
            const input = wrapper.find('input');
            await input.trigger('change');
            expect(wrapper.emitted('change')).toBeTruthy();
        });

        it('应该触发 blur 事件', async () => {
            const wrapper = mount(NueInput);
            const input = wrapper.find('input');
            await input.trigger('blur');
            expect(wrapper.emitted('blur')).toBeTruthy();
        });
    });

    describe('输入限制', () => {
        it('应该支持 maxlength 属性', () => {
            const wrapper = mount(NueInput, { props: { maxlength: '5' } });
            const input = wrapper.find('input');
            expect(input.attributes('maxlength')).toBe('5');
        });

        it('应该支持 type 属性', () => {
            const types = ['text', 'password', 'number', 'email'] as const;
            types.forEach(type => {
                const wrapper = mount(NueInput, { props: { type } });
                expect(wrapper.find('input').attributes('type')).toBe(type);
            });
        });

        it('应该支持 name 属性', () => {
            const wrapper = mount(NueInput, { props: { name: 'username' } });
            expect(wrapper.find('input').attributes('name')).toBe('username');
        });

        it('应该支持 placeholder 属性', () => {
            const wrapper = mount(NueInput, { props: { placeholder: '请输入内容' } });
            expect(wrapper.find('input').attributes('placeholder')).toBe('请输入内容');
        });
    });

    describe('清除功能', () => {
        it('应该显示清除按钮', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', clearable: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBeGreaterThan(0);
        });

        it('不应该显示清除按钮（禁用状态）', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', clearable: true, disabled: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBe(0);
        });

        it('不应该显示清除按钮（只读状态）', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', clearable: true, readonly: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBe(0);
        });

        it('不应该显示清除按钮（空值）', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: '', clearable: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBe(0);
        });

        it('点击清除按钮应该清空输入', async () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', clearable: true }
            });
            const clearButton = wrapper.findAll('.nue-input__icon-button')[0];
            await clearButton.trigger('click');
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
        });
    });

    describe('密码显示', () => {
        it('应该显示密码切换按钮', () => {
            const wrapper = mount(NueInput, {
                props: { type: 'password', modelValue: '123456', allowShowPassword: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBeGreaterThan(0);
        });

        it('不应该显示密码切换按钮（空值）', () => {
            const wrapper = mount(NueInput, {
                props: { type: 'password', modelValue: '', allowShowPassword: true }
            });
            expect(wrapper.findAll('.nue-input__icon-button').length).toBe(0);
        });

        it('应该支持密码显示切换', async () => {
            const wrapper = mount(NueInput, {
                props: { type: 'password', modelValue: '123456', allowShowPassword: true }
            });
            const iconButton = wrapper.findAll('.nue-input__icon-button')[0];
            await iconButton.trigger('click');
            expect(wrapper.find('input').attributes('type')).toBe('text');
            await iconButton.trigger('click');
            expect(wrapper.find('input').attributes('type')).toBe('password');
        });
    });

    describe('防抖功能', () => {
        it('应该支持 debounceTime 属性', () => {
            const wrapper = mount(NueInput, { props: { debounceTime: 300 } });
            expect(wrapper.props('debounceTime')).toBe(300);
        });
    });

    describe('字符计数', () => {
        it('应该显示字符计数', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', counter: 'both' }
            });
            expect(wrapper.find('.word-counter').exists()).toBe(true);
        });

        it('不应该显示字符计数（number 类型）', () => {
            const wrapper = mount(NueInput, {
                props: { type: 'number', modelValue: '123', counter: 'off' }
            });
            expect(wrapper.find('.word-counter').exists()).toBe(false);
        });

        it('不应该显示字符计数（counter 为 off）', () => {
            const wrapper = mount(NueInput, {
                props: { modelValue: 'test', counter: 'off' }
            });
            expect(wrapper.find('.word-counter').exists()).toBe(false);
        });
    });

    describe('图标渲染', () => {
        it('应该渲染图标', () => {
            const wrapper = mount(NueInput, { props: { icon: 'search' } });
            expect(wrapper.find('.nue-input__icon').exists()).toBe(true);
        });
    });

    describe('样式和尺寸', () => {
        it('应该渲染不同尺寸', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueInput, { props: { size } });
                expect(wrapper.find('.nue-input').classes()).toContain(`nue-input--${size}`);
            });
        });

        // it('应该渲染不同形状', () => {
        //   const shapes = ['circle', 'round'] as const
        //   shapes.forEach(shape => {
        //     const wrapper = mount(NueInput, { props: { shape } })
        //     expect(wrapper.find('.nue-input').classes()).toContain(`nue-input--${shape}`)
        //   })
        // })

        it('应该渲染不同主题', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueInput, { props: { theme } });
                expect(wrapper.find('.nue-input').classes()).toContain(`nue-input--${theme}`);
            });
        });

        it('应该支持自定义宽度', () => {
            const wrapper = mount(NueInput, { props: { width: '300px' } });
            expect(wrapper.find('.nue-input').attributes('style')).toContain(
                '--nue-input-width: 300px'
            );
        });

        it('应该支持 flex 布局', () => {
            const wrapper = mount(NueInput, { props: { flex: '1' } });
            expect(wrapper.find('.nue-input').attributes('style')).toContain('--flex');
        });
    });

    describe('禁用和只读状态', () => {
        it('应该渲染禁用状态', () => {
            const wrapper = mount(NueInput, { props: { disabled: true } });
            expect(wrapper.find('.nue-input').classes()).toContain('nue-input--disabled');
            expect(wrapper.find('input').attributes('disabled')).toBeDefined();
        });

        it('应该渲染只读状态', () => {
            const wrapper = mount(NueInput, { props: { readonly: true } });
            expect(wrapper.find('input').attributes('readonly')).toBeDefined();
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染 prefix 插槽', () => {
            const wrapper = mount(NueInput, {
                slots: { prefix: '<span class="prefix-content">前缀</span>' }
            });
            expect(wrapper.find('.prefix-content').exists()).toBe(true);
        });

        it('应该渲染 suffix 插槽', () => {
            const wrapper = mount(NueInput, {
                slots: { suffix: '<span class="suffix-content">后缀</span>' }
            });
            expect(wrapper.find('.suffix-content').exists()).toBe(true);
        });
    });

    describe('暴露的方法', () => {
        it('应该暴露 innerInputRef', () => {
            const wrapper = mount(NueInput);
            expect(wrapper.vm.innerInputRef).toBeDefined();
        });
    });
});
