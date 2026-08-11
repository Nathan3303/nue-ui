import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueEmpty } from '../index';

describe('NueEmpty', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认空状态', () => {
            const wrapper = mount(NueEmpty);
            expect(wrapper.find('.nue-empty').exists()).toBe(true);
        });

        it('应该渲染带描述的空状态', () => {
            const wrapper = mount(NueEmpty, {
                props: { description: '暂无数据' }
            });
            expect(wrapper.text()).toContain('暂无数据');
        });

        it('应该渲染自定义图片的空状态', () => {
            const wrapper = mount(NueEmpty, {
                props: { imageSrc: 'https://example.com/empty.png' }
            });
            expect(wrapper.find('img').exists()).toBe(true);
        });

        it('应该渲染不同图片尺寸的空状态', () => {
            const sizes = ['small', 'large'] as const;
            sizes.forEach(size => {
                const wrapper = mount(NueEmpty, {
                    props: { imageSrc: 'https://example.com/empty.png', imageSize: size }
                });
                expect(wrapper.find('.nue-empty').attributes('style')).toContain(
                    `--nue-empty-image-size: ${size}`
                );
            });
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueEmpty, {
                slots: {
                    default: '<div class="custom-content">自定义内容</div>'
                }
            });
            expect(wrapper.find('.custom-content').exists()).toBe(true);
        });

        it('应该渲染 image 插槽', () => {
            const wrapper = mount(NueEmpty, {
                slots: {
                    image: '<div class="custom-image">自定义图片</div>'
                }
            });
            expect(wrapper.find('.custom-image').exists()).toBe(true);
        });

        it('应该渲染 description 插槽', () => {
            const wrapper = mount(NueEmpty, {
                slots: {
                    description: '<div class="custom-description">自定义描述</div>'
                }
            });
            expect(wrapper.find('.custom-description').exists()).toBe(true);
        });
    });
});