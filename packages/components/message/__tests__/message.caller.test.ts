import { describe, it, expect } from 'vitest';
import { NueMessage } from '../index';

describe('NueMessage', () => {
    describe('API 测试', () => {
        it('应该导出 NueMessage 函数', () => {
            expect(typeof NueMessage).toBe('function');
        });

        it('应该导出 success 方法', () => {
            expect(typeof NueMessage.success).toBe('function');
        });

        it('应该导出 error 方法', () => {
            expect(typeof NueMessage.error).toBe('function');
        });

        it('应该导出 warn 方法', () => {
            expect(typeof NueMessage.warn).toBe('function');
        });

        it('应该导出 info 方法', () => {
            expect(typeof NueMessage.info).toBe('function');
        });

        it('应该导出 log 方法', () => {
            expect(typeof NueMessage.log).toBe('function');
        });

        it('应该能够调用 NueMessage 函数', () => {
            expect(() => NueMessage({ message: '测试消息' })).not.toThrow();
        });

        it('应该能够调用 success 方法', () => {
            expect(() => NueMessage.success('成功消息')).not.toThrow();
        });

        it('应该能够调用 error 方法', () => {
            expect(() => NueMessage.error('错误消息')).not.toThrow();
        });

        it('应该能够调用 warn 方法', () => {
            expect(() => NueMessage.warn('警告消息')).not.toThrow();
        });

        it('应该能够调用 info 方法', () => {
            expect(() => NueMessage.info('信息消息')).not.toThrow();
        });

        it('应该能够调用 log 方法', () => {
            expect(() => NueMessage.log('日志消息')).not.toThrow();
        });

        it('应该支持自定义参数', () => {
            expect(() =>
                NueMessage({
                    message: '测试消息',
                    type: 'success',
                    duration: 5000,
                    icon: 'user',
                    size: 'large'
                })
            ).not.toThrow();
        });

        it('success 方法应该支持可选参数', () => {
            expect(() => NueMessage.success('成功消息', 5000, 'user', 'large')).not.toThrow();
        });

        it('error 方法应该支持可选参数', () => {
            expect(() => NueMessage.error('错误消息', 5000, 'user', 'large')).not.toThrow();
        });

        it('warn 方法应该支持可选参数', () => {
            expect(() => NueMessage.warn('警告消息', 5000, 'user', 'large')).not.toThrow();
        });

        it('info 方法应该支持可选参数', () => {
            expect(() => NueMessage.info('信息消息', 5000, 'user', 'large')).not.toThrow();
        });

        it('log 方法应该支持可选参数', () => {
            expect(() => NueMessage.log('日志消息', 5000, 'user', 'large')).not.toThrow();
        });
    });
});
