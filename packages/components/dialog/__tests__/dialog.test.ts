import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueDialog } from '../index';

describe('NueDialog', () => {
    describe('Props 渲染', () => {
        it('modelValue 为 false 时不应该显示对话框', () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: false }
            });
            expect(wrapper.find('.nue-dialog').exists()).toBe(false);
        });

        it('modelValue 为 true 时应该显示对话框', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true, title: '标题' }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.find('.nue-dialog').exists()).toBe(true);
        });

        it('应该渲染标题', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true, title: '测试标题' }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.text()).toContain('测试标题');
        });

        it('应该渲染不同主题的对话框', async () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueDialog, {
                    props: { modelValue: true, theme }
                });
                expect(wrapper.find('.nue-dialog').classes()).toContain(`nue-dialog--${theme}`);
            });
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染 header 插槽', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true },
                slots: {
                    header: '<div class="custom-header">自定义头部</div>'
                }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.find('.custom-header').exists()).toBe(true);
        });

        it('应该渲染 content 插槽', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true },
                slots: {
                    content: '<div class="custom-content">自定义内容</div>'
                }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.find('.custom-content').exists()).toBe(true);
        });

        it('应该渲染 footer 插槽', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true },
                slots: {
                    footer: '<div class="custom-footer">自定义底部</div>'
                }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.find('.custom-footer').exists()).toBe(true);
        });

        it('应该渲染默认插槽', async () => {
            const wrapper = mount(NueDialog, {
                props: { modelValue: true },
                slots: {
                    default: '<div class="custom-default">默认内容</div>'
                }
            });
            await new Promise(resolve => setTimeout(resolve, 0));
            expect(wrapper.find('.custom-default').exists()).toBe(true);
        });
    });
});