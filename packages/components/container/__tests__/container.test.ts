import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueContainer, NueSeparator } from '../index';

describe('NueContainer', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认容器', () => {
            const wrapper = mount(NueContainer, {
                slots: {
                    default: '<div class="content">内容</div>'
                }
            });
            expect(wrapper.find('.nue-container').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueContainer, {
                slots: {
                    default: '<div class="content">默认内容</div>'
                }
            });
            expect(wrapper.find('.content').exists()).toBe(true);
        });
    });
});

describe('NueSeparator', () => {
    describe('插槽渲染', () => {
        it('应该渲染默认插槽作为手柄指示器', () => {
            const wrapper = mount(NueSeparator, {
                slots: { default: '<span class="grip-icon">||</span>' }
            });
            expect(wrapper.find('.grip-icon').exists()).toBe(true);
        });
    });
});