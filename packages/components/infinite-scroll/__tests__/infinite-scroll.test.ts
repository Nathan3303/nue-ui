import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueInfiniteScroll } from '../index';

describe('NueInfiniteScroll', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认无限滚动', () => {
            const wrapper = mount(NueInfiniteScroll, {
                slots: { default: '<div class="item">项目1</div><div class="item">项目2</div>' }
            });
            expect(wrapper.find('.nue-infinite-scroll').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueInfiniteScroll, {
                slots: { default: '<div class="item">项目1</div><div class="item">项目2</div>' }
            });
            expect(wrapper.findAll('.item').length).toBe(2);
        });
    });
});
