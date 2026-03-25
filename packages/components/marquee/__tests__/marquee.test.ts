import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueMarquee } from '../index';

describe('NueMarquee', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认跑马灯', () => {
            const wrapper = mount(NueMarquee, {
                slots: { default: '测试内容' }
            });
            expect(wrapper.find('.nue-marquee').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueMarquee, {
                slots: { default: '插槽内容' }
            });
            expect(wrapper.text()).toContain('插槽内容');
        });
    });
});
