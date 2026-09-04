import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NuePrompt } from '../index';
import PromptInner from '../prompt.vue';

describe('NuePrompt', () => {
    describe('插槽渲染', () => {
        const mockProps = { close: () => {}, destroy: () => {} };

        it('应该渲染 header 插槽', () => {
            const wrapper = mount(PromptInner, {
                props: mockProps,
                slots: { header: '<span class="header-content">自定义头部</span>' }
            });
            expect(wrapper.find('.header-content').exists()).toBe(true);
        });

        it('应该渲染 footer 插槽', () => {
            const wrapper = mount(PromptInner, {
                props: mockProps,
                slots: { footer: '<span class="footer-content">自定义底部</span>' }
            });
            expect(wrapper.find('.footer-content').exists()).toBe(true);
        });
    });

    describe('API 测试', () => {
        it('应该导出 NuePrompt 函数', () => {
            expect(typeof NuePrompt).toBe('function');
        });

        it('应该返回 Promise', () => {
            const result = NuePrompt({ title: '测试' });
            expect(result).toBeInstanceOf(Promise);
        });

        it('应该支持基本参数', () => {
            expect(() =>
                NuePrompt({
                    title: '测试标题',
                    description: '测试描述'
                })
            ).not.toThrow();
        });

        it('应该支持自定义按钮文本', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
            ).not.toThrow();
        });

        it('应该支持占位符', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    placeholder: '请输入内容'
                })
            ).not.toThrow();
        });

        it('应该支持输入类型', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    inputType: 'password'
                })
            ).not.toThrow();
        });

        it('应该支持默认输入值', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    inputValue: '默认值'
                })
            ).not.toThrow();
        });

        it('应该支持 wrapperId', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    wrapperId: 'test-wrapper'
                })
            ).not.toThrow();
        });

        it('应该支持验证器', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    validator: value => {
                        if (!value) return '不能为空';
                        return null;
                    }
                })
            ).not.toThrow();
        });

        it('应该支持回调函数', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    onConfirm: (_, done) => {
                        done();
                        return null;
                    },
                    afterConfirm: () => {},
                    afterCancel: () => {},
                    beforeOpen: () => {},
                    afterOpen: () => {},
                    beforeClose: () => {},
                    afterClose: () => {}
                })
            ).not.toThrow();
        });

        it('应该支持动画配置', () => {
            expect(() =>
                NuePrompt({
                    title: '测试',
                    overlayAnimation: { name: 'fade' },
                    overlayCloseAnimation: { name: 'fade' }
                })
            ).not.toThrow();
        });

        it('应该支持全局属性', () => {
            expect(() =>
                NuePrompt({
                    title: '测试'
                })
            ).not.toThrow();
        });
    });

    describe('Promise 行为', () => {
        it('应该能够创建 Promise 实例', () => {
            const promise = NuePrompt({ title: '测试' });
            expect(promise).toBeInstanceOf(Promise);
        });
    });
});