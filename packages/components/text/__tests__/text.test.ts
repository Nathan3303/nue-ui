import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueText } from '../index';

describe('NueText', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认文本', () => {
            const wrapper = mount(NueText, {
                slots: { default: '测试文本' }
            });
            expect(wrapper.find('.nue-text').exists()).toBe(true);
        });

        it('应该渲染插槽内容', () => {
            const wrapper = mount(NueText, {
                slots: { default: '插槽内容' }
            });
            expect(wrapper.text()).toContain('插槽内容');
        });
    });
});