import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueContainer } from '../index';

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
