import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
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

    describe('错误态复位', () => {
        it('A-01 src 变化后应重新渲染图片', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/a.png' } });
            await wrapper.find('img').trigger('error');
            expect(wrapper.find('img').exists()).toBe(false);

            await wrapper.setProps({ src: '/b.png' });
            expect(wrapper.find('img').exists()).toBe(true);
            expect(wrapper.find('img').attributes('src')).toBe('/b.png');
            expect(wrapper.find('.nue-avatar__icon').exists()).toBe(false);
            expect(wrapper.find('.nue-avatar__text').exists()).toBe(false);
        });

        it('A-02 同一 src 不应重复发起加载', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/a.png' } });
            await wrapper.find('img').trigger('error');
            await wrapper.setProps({ src: '/a.png' });
            await nextTick();
            await wrapper.setProps({ size: 'small' });

            expect(wrapper.find('img').exists()).toBe(false);
            expect(wrapper.emitted('error')).toHaveLength(1);
            expect(wrapper.emitted('load')).toBeUndefined();
        });

        it('A-03 src 置空应保持回退且不报错', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/a.png' } });
            await wrapper.find('img').trigger('error');
            const errorCount = wrapper.emitted('error')?.length;

            // 第一段：置为空串
            await wrapper.setProps({ src: '' });
            expect(wrapper.find('img').exists()).toBe(false);
            expect(wrapper.find('.nue-avatar__icon').exists()).toBe(true);
            expect(wrapper.find('.nue-avatar__text').exists()).toBe(false);
            expect(wrapper.emitted('error')).toHaveLength(errorCount!);
            expect(wrapper.classes()).toContain('nue-avatar');

            // 第二段：置为 undefined
            await wrapper.setProps({ src: undefined });
            expect(wrapper.find('img').exists()).toBe(false);
            expect(wrapper.find('.nue-avatar__icon').exists()).toBe(true);
            expect(wrapper.emitted('error')).toHaveLength(errorCount!);
            expect(wrapper.classes()).toContain('nue-avatar');

            // 有 alt 时同样保持回退（注：既有实现里 alt 首字母文本在默认插槽的 fallback 内，
            // 不传默认插槽时仍走图标回退，与本单修复无关，已回报 PM）
            const withAlt = mount(NueAvatar, { props: { src: '/a.png', alt: '李四' } });
            await withAlt.find('img').trigger('error');
            await withAlt.setProps({ src: '' });
            expect(withAlt.find('img').exists()).toBe(false);
            expect(withAlt.find('.nue-avatar__icon').exists()).toBe(true);
            expect(withAlt.emitted('error')).toHaveLength(1);
            expect(withAlt.classes()).toContain('nue-avatar');
        });

        it('A-04 新 src 加载成功后错误态应清零且不重复 emit', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/a.png' } });
            await wrapper.find('img').trigger('error');

            await wrapper.setProps({ src: '/b.png' });
            const img = wrapper.find('img');
            expect(img.attributes('src')).toBe('/b.png');
            await img.trigger('load');

            expect(wrapper.emitted('error')).toHaveLength(1);
            expect(wrapper.find('img').exists()).toBe(true);
            expect(wrapper.find('.nue-avatar__icon').exists()).toBe(false);

            await nextTick();
            expect(wrapper.find('img').exists()).toBe(true);
            expect(wrapper.emitted('error')).toHaveLength(1);
        });

        it('A-05 src 不变时其它 props 变更不应重置错误态', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/bad.png' } });
            await wrapper.find('img').trigger('error');

            await wrapper.setProps({ title: '头像', size: 'small' });
            expect(wrapper.find('img').exists()).toBe(false);
            expect(wrapper.emitted('error')).toHaveLength(1);
            expect(wrapper.emitted('load')).toBeUndefined();
        });

        it('A-06 反复换源应每次都重建图片', async () => {
            const wrapper = mount(NueAvatar, { props: { src: '/a.png' } });
            await wrapper.find('img').trigger('error');

            await wrapper.setProps({ src: '/b.png' });
            expect(wrapper.find('img').attributes('src')).toBe('/b.png');

            await wrapper.setProps({ src: '/a.png' });
            expect(wrapper.find('img').exists()).toBe(true);
            expect(wrapper.find('img').attributes('src')).toBe('/a.png');
        });
    });
});