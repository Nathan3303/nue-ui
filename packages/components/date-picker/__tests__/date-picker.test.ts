import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueDatePicker } from '../index';

describe('NueDatePicker', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认日期选择器', () => {
            const wrapper = mount(NueDatePicker);
            expect(wrapper.find('.nue-dropdown-wrapper').exists()).toBe(true);
        });
    });
});
