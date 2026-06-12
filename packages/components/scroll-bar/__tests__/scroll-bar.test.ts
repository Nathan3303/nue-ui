import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueScrollBar } from '../index';

describe('NueScrollBar', () => {
    describe('渲染', () => {
        it('应该渲染默认插槽内容', () => {
            const wrapper = mount(NueScrollBar, {
                slots: {
                    default: '<div class="content">内容</div>'
                }
            });
            expect(wrapper.find('.content').exists()).toBe(true);
            expect(wrapper.find('.content').text()).toBe('内容');
        });

        it('应该包含正确的基础 class', () => {
            const wrapper = mount(NueScrollBar);
            expect(wrapper.find('.nue-scroll-bar').exists()).toBe(true);
        });

        it('应该根据 vertical 属性渲染垂直轨道', () => {
            const wrapper = mount(NueScrollBar, {
                props: { vertical: true },
                slots: { default: '<div style="height:200px">内容</div>' }
            });
            expect(wrapper.find('.nue-scroll-bar__track--vertical').exists()).toBe(true);
        });

        it('当 vertical=false 时不应该渲染垂直轨道', () => {
            const wrapper = mount(NueScrollBar, {
                props: { vertical: false }
            });
            expect(wrapper.find('.nue-scroll-bar__track--vertical').exists()).toBe(false);
        });

        it('应该根据 horizontal 属性渲染水平轨道', () => {
            const wrapper = mount(NueScrollBar, {
                props: { horizontal: true },
                slots: { default: '<div style="width:2000px">内容</div>' }
            });
            expect(wrapper.find('.nue-scroll-bar__track--horizontal').exists()).toBe(true);
        });

        it('默认不应渲染水平轨道', () => {
            const wrapper = mount(NueScrollBar);
            expect(wrapper.find('.nue-scroll-bar__track--horizontal').exists()).toBe(false);
        });
    });

    describe('模式', () => {
        it('mode="always" 应该添加对应的 class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { mode: 'always' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain('nue-scroll-bar--always');
        });

        it('mode="hover" 应该添加对应的 class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { mode: 'hover' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain('nue-scroll-bar--hover');
        });

        it('mode="hidden" 应该添加对应的 class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { mode: 'hidden' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain('nue-scroll-bar--hidden');
        });
    });

    describe('thumbSize', () => {
        it('thumbSize="small" 应该添加对应的 class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { thumbSize: 'small' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain(
                'nue-scroll-bar--thumb-small'
            );
        });

        it('thumbSize="large" 应该添加对应的 class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { thumbSize: 'large' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain(
                'nue-scroll-bar--thumb-large'
            );
        });
    });

    describe('主题', () => {
        it('应该渲染 theme class', () => {
            const wrapper = mount(NueScrollBar, {
                props: { theme: 'primary' }
            });
            expect(wrapper.find('.nue-scroll-bar').classes()).toContain('nue-scroll-bar--primary');
        });
    });

    describe('滚动事件', () => {
        it('滚动时应该 emit scroll 事件', async () => {
            const wrapper = mount(NueScrollBar, {
                props: { vertical: true },
                slots: { default: '<div style="height:2000px">长内容</div>' },
                attachTo: document.body
            });
            const viewport = wrapper.find('.nue-scroll-bar__viewport');
            await viewport.trigger('scroll');
            expect(wrapper.emitted('scroll')).toBeTruthy();
        });
    });
});
