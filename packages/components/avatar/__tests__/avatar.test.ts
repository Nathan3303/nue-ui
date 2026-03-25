import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueAvatar } from '../index';

describe('NueAvatar', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认头像', () => {
            const wrapper = mount(NueAvatar);
            expect(wrapper.find('.nue-avatar').exists()).toBe(true);
        });

        it('应该渲染不同尺寸的头像', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueAvatar, { props: { size } });
                expect(wrapper.find('.nue-avatar').attributes('style')).toContain(
                    `--nue-avatar-size: ${size}`
                );
            });
        });

        it('应该渲染圆角头像', () => {
            const wrapper = mount(NueAvatar, {
                props: { rounded: true }
            });
            expect(wrapper.find('.nue-avatar').classes()).toContain('nue-avatar--rounded');
        });

        it('应该渲染带图标的头像', () => {
            const wrapper = mount(NueAvatar, {
                props: { icon: 'user' }
            });
            expect(wrapper.find('.nue-avatar__icon').exists()).toBe(true);
        });

        it('应该渲染带图片的头像', () => {
            const wrapper = mount(NueAvatar, {
                props: { src: 'https://example.com/avatar.jpg' }
            });
            expect(wrapper.find('img').exists()).toBe(true);
        });

        it('应该渲染不同适应方式的头像', () => {
            const fits = ['cover', 'contain', 'fill'] as const;
            fits.forEach(fit => {
                const wrapper = mount(NueAvatar, {
                    props: { src: 'https://example.com/avatar.jpg', fit }
                });
                expect(wrapper.find('.nue-avatar').attributes('style')).toContain(
                    `--nue-avatar-object-fit: ${fit}`
                );
            });
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueAvatar, {
                slots: { default: '<div class="custom-avatar">自定义头像</div>' }
            });
            expect(wrapper.find('.custom-avatar').exists()).toBe(true);
        });
    });
});
