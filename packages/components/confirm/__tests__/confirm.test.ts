import { describe, it, expect } from 'vitest';
import { NueConfirm } from '../index';

describe('NueConfirm', () => {
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
