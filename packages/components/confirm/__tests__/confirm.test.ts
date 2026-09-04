import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueConfirm } from '../index';
import ConfirmInner from '../confirm.vue';

describe('NueConfirm', () => {
    describe('插槽渲染', () => {
        const mockProps = { close: () => {}, destroy: () => {} };

        it('应该渲染 header 插槽', () => {
            const wrapper = mount(ConfirmInner, {
                props: mockProps,
                slots: { header: '<span class="header-content">自定义头部</span>' }
            });
            expect(wrapper.find('.header-content').exists()).toBe(true);
        });

        it('应该渲染默认插槽', () => {
            const wrapper = mount(ConfirmInner, {
                props: mockProps,
                slots: { default: '<span class="body-content">自定义内容</span>' }
            });
            expect(wrapper.find('.body-content').exists()).toBe(true);
        });

        it('应该渲染 footer 插槽', () => {
            const wrapper = mount(ConfirmInner, {
                props: mockProps,
                slots: { footer: '<span class="footer-content">自定义底部</span>' }
            });
            expect(wrapper.find('.footer-content').exists()).toBe(true);
        });
    });

    describe('API 测试', () => {
        it('应该导出 NueConfirm 函数', () => {
            expect(typeof NueConfirm).toBe('function');
        });

        it('应该返回 Promise', () => {
            const result = NueConfirm({ title: '测试' });
            expect(result).toBeInstanceOf(Promise);
        });

        it('应该支持基本参数', () => {
            expect(() =>
                NueConfirm({
                    title: '测试标题',
                    content: '测试内容'
                })
            ).not.toThrow();
        });

        it('应该支持自定义按钮文本', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
            ).not.toThrow();
        });

        it('应该支持禁用取消按钮', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    unuseCancelButton: true
                })
            ).not.toThrow();
        });

        it('应该支持 loading 状态', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    loading: true
                })
            ).not.toThrow();
        });

        it('应该支持 wrapperId', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    wrapperId: 'test-wrapper'
                })
            ).not.toThrow();
        });

        it('应该支持回调函数', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    onConfirm: () => {},
                    beforeOpen: () => {},
                    afterOpen: () => {},
                    afterConfirm: () => {},
                    afterCancel: () => {},
                    beforeClose: () => {},
                    afterClose: () => {}
                })
            ).not.toThrow();
        });

        it('应该支持动画配置', () => {
            expect(() =>
                NueConfirm({
                    title: '测试',
                    overlayAnimation: { name: 'fade' },
                    overlayCloseAnimation: { name: 'fade' }
                })
            ).not.toThrow();
        });

        it('应该支持全局属性', () => {
            expect(() => NueConfirm({ title: '测试' })).not.toThrow();
        });
    });

    describe('Promise 行为', () => {
        it('应该能够创建 Promise 实例', () => {
            const promise = NueConfirm({ title: '测试' });
            expect(promise).toBeInstanceOf(Promise);
        });
    });
});