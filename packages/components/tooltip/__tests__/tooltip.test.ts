import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueTooltip } from '../index';

describe('NueTooltip', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认提示框', () => {
            const wrapper = mount(NueTooltip, {
                slots: {
                    default: '<div class="trigger">触发器</div>',
                    content: '<div class="content">提示内容</div>'
                }
            });
            expect(wrapper.find('.nue-tooltip-wrapper').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueTooltip, {
                slots: {
                    default: '<div class="trigger">触发器</div>',
                    content: '<div class="content">提示内容</div>'
                }
            });
            expect(wrapper.find('.trigger').exists()).toBe(true);
        });
    });
});
