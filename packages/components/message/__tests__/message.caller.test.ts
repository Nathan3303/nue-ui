import { describe, it, expect, vi } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NueMessage, NueMessageWrapper } from '../index';
import MessageNodeInner from '../message-inner.vue';

describe('NueMessage', () => {
    describe('插槽渲染', () => {
        it('应该渲染默认插槽替换消息文本', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息'
                },
                slots: { default: '自定义消息内容' }
            });
            expect(wrapper.text()).toContain('自定义消息内容');
        });
    });

    describe('扩展插槽', () => {
        it('应该渲染字符串扩展内容', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: '撤销'
                }
            });
            expect(wrapper.find('.nue-message-node-inner__extension').text()).toBe('撤销');
        });

        it('应该渲染 VNode 扩展内容', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: h('button', { class: 'action' }, '查看详情')
                }
            });
            expect(wrapper.find('.nue-message-node-inner__extension button').text()).toBe(
                '查看详情'
            );
        });

        it('VNode 扩展内容应该支持点击操作', async () => {
            const onClick = vi.fn();
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: h('button', { onClick }, '撤销')
                }
            });
            await wrapper.find('.nue-message-node-inner__extension button').trigger('click');
            expect(onClick).toHaveBeenCalled();
        });

        it('不传 extension 时不应该渲染扩展区域', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息'
                }
            });
            expect(wrapper.find('.nue-message-node-inner__extension').exists()).toBe(false);
        });

        it('应该渲染渲染函数返回的 VNode 扩展内容', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: () => h('button', { class: 'action' }, '查看详情')
                }
            });
            expect(wrapper.find('.nue-message-node-inner__extension button').text()).toBe(
                '查看详情'
            );
        });

        it('渲染函数扩展内容可以通过 ctx.close 关闭消息', async () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: (ctx: { close: () => void }) =>
                        h('button', { onClick: () => ctx.close() }, '关闭')
                }
            });
            await wrapper.find('.nue-message-node-inner__extension button').trigger('click');
            await new Promise(resolve => setTimeout(resolve, 600));
            expect(mockWrapper.children.length).toBe(0);
        });

        it('应该渲染具名插槽 extension 的内容', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息'
                },
                slots: { extension: '插槽扩展内容' }
            });
            expect(wrapper.find('.nue-message-node-inner__extension').text()).toBe('插槽扩展内容');
        });

        it('具名插槽应该优先于 extension 属性', () => {
            const mockNode = document.createElement('div');
            const mockWrapper = document.createElement('div');
            const wrapper = mount(MessageNodeInner, {
                props: {
                    node: mockNode,
                    wrapper: mockWrapper,
                    message: '默认消息',
                    extension: '属性内容'
                },
                slots: { extension: '插槽内容' }
            });
            expect(wrapper.find('.nue-message-node-inner__extension').text()).toBe('插槽内容');
        });

        it('NueMessage 应该返回带 close 方法的句柄', () => {
            const handle = NueMessage({ message: '测试消息' });
            expect(typeof handle.close).toBe('function');
        });

        it('NueMessage 句柄 close 应该移除对应消息节点且重复调用安全', async () => {
            const host = document.createElement('div');
            document.body.appendChild(host);
            const wrapper = mount(NueMessageWrapper, { attachTo: host });
            const handle = NueMessage({ message: '测试消息', duration: 0 });
            expect(host.querySelectorAll('.nue-message-node').length).toBe(1);
            handle.close();
            handle.close();
            await new Promise(resolve => setTimeout(resolve, 600));
            expect(host.querySelectorAll('.nue-message-node').length).toBe(0);
            wrapper.unmount();
            host.remove();
        });

        it('调用 NueMessage 时应该支持 extension 参数', () => {
            expect(() =>
                NueMessage({
                    message: '测试消息',
                    extension: h('button', '操作')
                })
            ).not.toThrow();
        });
    });

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