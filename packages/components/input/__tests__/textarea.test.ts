import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueTextarea } from '../index';

describe('NueTextarea', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认文本域', () => {
            const wrapper = mount(NueTextarea);
            expect(wrapper.find('textarea').exists()).toBe(true);
        });

        it('应该渲染带占位符的文本域', () => {
            const wrapper = mount(NueTextarea, {
                props: { placeholder: '请输入内容' }
            });
            expect(wrapper.find('textarea').attributes('placeholder')).toBe('请输入内容');
        });

        it('应该渲染禁用状态的文本域', () => {
            const wrapper = mount(NueTextarea, {
                props: { disabled: true }
            });
            expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
        });

        it('应该渲染只读状态的文本域', () => {
            const wrapper = mount(NueTextarea, {
                props: { readonly: true }
            });
            expect(wrapper.find('textarea').attributes('readonly')).toBeDefined();
        });

        it('应该渲染不同尺寸的文本域', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueTextarea, { props: { size } });
                expect(wrapper.find('.nue-textarea').classes()).toContain(`nue-textarea--${size}`);
            });
        });

        it('应该渲染不同形状的文本域', () => {
            const shapes = ['rounded', 'noshape'] as const;
            shapes.forEach(shape => {
                const wrapper = mount(NueTextarea, { props: { shape } });
                expect(wrapper.find('.nue-textarea').classes()).toContain(`nue-textarea--${shape}`);
            });
        });

        it('应该渲染不同主题的文本域', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueTextarea, { props: { theme } });
                expect(wrapper.find('.nue-textarea').classes()).toContain(`nue-textarea--${theme}`);
            });
        });

        it('应该渲染指定行数的文本域', () => {
            const wrapper = mount(NueTextarea, {
                props: { rows: 5 }
            });
            expect(wrapper.find('textarea').attributes('rows')).toBe('5');
        });
    });

    describe('v-model 双向绑定', () => {
        it('应该正确绑定 modelValue', () => {
            const wrapper = mount(NueTextarea, {
                props: { modelValue: '测试内容' }
            });
            expect(wrapper.find('textarea').element.value).toBe('测试内容');
        });

        it('应该响应 modelValue 变化', async () => {
            const wrapper = mount(NueTextarea, {
                props: { modelValue: '初始内容' }
            });
            await wrapper.setProps({ modelValue: '更新内容' });
            expect(wrapper.find('textarea').element.value).toBe('更新内容');
        });
    });

    describe('事件处理', () => {
        it('应该触发 change 事件', async () => {
            const wrapper = mount(NueTextarea);
            const textarea = wrapper.find('textarea');
            await textarea.trigger('change');
            expect(wrapper.emitted('change')).toBeTruthy();
        });

        it('应该触发 blur 事件', async () => {
            const wrapper = mount(NueTextarea);
            const textarea = wrapper.find('textarea');
            await textarea.trigger('blur');
            expect(wrapper.emitted('blur')).toBeTruthy();
        });
    });

    describe('字符计数', () => {
        it('应该显示字符计数', () => {
            const wrapper = mount(NueTextarea, {
                props: { modelValue: 'test', counter: 'both' }
            });
            expect(wrapper.find('.word-counter').exists()).toBe(true);
        });

        it('不应该显示字符计数（counter 为 off）', () => {
            const wrapper = mount(NueTextarea, {
                props: { modelValue: 'test', counter: 'off' }
            });
            expect(wrapper.find('.word-counter').exists()).toBe(false);
        });
    });
});
