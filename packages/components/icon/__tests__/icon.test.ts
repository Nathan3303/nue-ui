import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueIcon } from '../index';

describe('NueIcon', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认图标', () => {
            const wrapper = mount(NueIcon, {
                props: { name: 'user' }
            });
            expect(wrapper.find('.nue-icon').exists()).toBe(true);
        });

        it('应该渲染旋转动画的图标', () => {
            const wrapper = mount(NueIcon, {
                props: { name: 'user', spin: true }
            });
            expect(wrapper.find('.nue-icon').classes()).toContain('nue-icon--spin');
        });
    });
});
