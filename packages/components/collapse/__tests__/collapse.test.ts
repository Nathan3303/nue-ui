import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueCollapse } from '../index';

describe('NueCollapse', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认折叠面板', () => {
            const wrapper = mount(NueCollapse, {
                slots: {
                    default: '<div class="panel">内容1</div>'
                }
            });
            expect(wrapper.find('.nue-collapse').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueCollapse, {
                slots: {
                    default: '<div class="panel">内容1</div>'
                }
            });
            expect(wrapper.find('.panel').exists()).toBe(true);
        });
    });
});