import { describe, it, expect, afterEach, vi } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import { defineComponent, h, nextTick } from 'vue';
import { NueLink } from '../index';

describe('NueLink', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认链接', () => {
            const wrapper = mount(NueLink, {
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').exists()).toBe(true);
        });

        it('应该渲染禁用状态的链接', () => {
            const wrapper = mount(NueLink, {
                props: { disabled: true },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').classes()).toContain('nue-link--disabled');
        });

        it('应该渲染不同主题的链接', () => {
            const themes = ['primary', 'success', 'warning', 'danger'] as const;
            themes.forEach(theme => {
                const wrapper = mount(NueLink, {
                    props: { theme },
                    slots: { default: '链接文本' }
                });
                expect(wrapper.find('a').classes()).toContain(`nue-link--${theme}`);
            });
        });

        it('应该渲染带图标的链接', () => {
            const wrapper = mount(NueLink, {
                props: { icon: 'arrow-right' },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('.nue-link__icon').exists()).toBe(true);
        });

        it('应该渲染不同 target 的链接', () => {
            const wrapper = mount(NueLink, {
                props: { target: '_blank' },
                slots: { default: '链接文本' }
            });
            expect(wrapper.find('a').attributes('target')).toBe('_blank');
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueLink, {
                slots: { default: '链接文本' }
            });
            expect(wrapper.text()).toContain('链接文本');
        });

        it('应该渲染 prepend 插槽', () => {
            const wrapper = mount(NueLink, {
                slots: {
                    default: '链接',
                    prepend: '<span class="prepend-content">前缀</span>'
                }
            });
            expect(wrapper.find('.prepend-content').exists()).toBe(true);
        });
    });

    describe('路由形态', () => {
        afterEach(() => {
            vi.restoreAllMocks();
        });

        const DummyView = defineComponent({ name: 'DummyView', render: () => h('div') });

        function createTestRouter() {
            return createRouter({
                history: createMemoryHistory(),
                routes: [
                    { path: '/x', component: DummyView },
                    { path: '/y/:id', name: 'y', component: DummyView }
                ]
            });
        }

        async function mountWithRouter(
            props: Record<string, unknown>,
            slotText: string,
            options: { attachTo?: boolean } = {}
        ) {
            const router = createTestRouter();
            await router.push('/x');
            const wrapper = mount(NueLink, {
                props,
                slots: { default: slotText },
                global: { plugins: [router] },
                ...(options.attachTo ? { attachTo: document.body } : {})
            });
            await router.isReady();
            await nextTick();
            return { router, wrapper };
        }

        // master e79030bb 基线：同一挂载片段（href="/docs" + 默认插槽「文档」）捕获，属性顺序
        // 随 Vue 版本漂移时按「attributes 全量 + innerHTML 相等」口径比对
        const HREF_FORM_BASELINE_ATTRS = {
            'active-class': '',
            class: 'nue-link',
            href: '/docs',
            title: '/docs'
        };
        const HREF_FORM_BASELINE_INNER_HTML =
            '<!--v-if--><!--v-if--><span class="nue-text nue-text--clamped nue-link__content" style="--nue-text-clamped-lines: 1;">文档</span><!--v-if-->';

        it('L-01 路由形态应渲染出可用的 href', async () => {
            const { router, wrapper } = await mountWithRouter({ route: '/x' }, '首页');
            const a = wrapper.find('a');
            expect(a.exists()).toBe(true);
            expect(a.attributes('href')).toBe(router.resolve('/x').href);
            expect(a.attributes('href')).not.toBe('');
            expect(a.attributes('to')).toBeUndefined();
        });

        it('L-02 to 形态应解析出可用 href 且不把对象落到 DOM', async () => {
            const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const target = { name: 'y', params: { id: '2' } };
            const { router, wrapper } = await mountWithRouter({ to: target }, '详情');
            const a = wrapper.find('a');
            expect(wrapper.html()).not.toContain('[object Object]');
            expect(a.attributes('href')).toBe(router.resolve(target).href);
            expect(a.attributes('href')).toBe('/y/2');
            expect(a.attributes('to')).toBeUndefined();
            expect(warn).not.toHaveBeenCalled();
        });

        it('L-03 disabled 的路由形态不应可聚焦也不应把 to 落到 DOM', async () => {
            const { wrapper } = await mountWithRouter({ route: '/x', disabled: true }, '首页', {
                attachTo: true
            });
            const a = wrapper.find('a');
            expect(a.element.tagName).toBe('A');
            expect(a.attributes('href')).toBeUndefined();
            expect(a.attributes('to')).toBeUndefined();
            expect(wrapper.html()).not.toContain('[object Object]');
            expect(a.classes()).toContain('nue-link--disabled');
            // jsdom 对无 href 的 <a> 也报 tabIndex 0（与浏览器不一致），故按 QA 定稿口径
            // 断言「不参与 Tab」：无 tabindex 属性且 focus() 不生效
            expect(a.attributes('tabindex')).toBeUndefined();
            (a.element as HTMLElement).focus();
            expect(document.activeElement).not.toBe(a.element);
            wrapper.unmount();
        });

        it('L-04 路由形态链接应可聚焦且 tabIndex >= 0', async () => {
            const { wrapper } = await mountWithRouter({ route: '/x' }, '首页', { attachTo: true });
            const a = wrapper.find('a');
            (a.element as HTMLElement).focus();
            expect(document.activeElement).toBe(a.element);
            expect((a.element as HTMLElement).tabIndex).toBe(0);
            expect(a.attributes('href')).toBeTruthy();
            wrapper.unmount();
        });

        it('L-05 href 形态渲染结果应与 master 基线一致（零回归）', () => {
            const wrapper = mount(NueLink, {
                props: { href: '/docs' },
                slots: { default: '文档' }
            });
            expect(wrapper.attributes('href')).toBe('/docs');
            expect(wrapper.attributes('title')).toBe('/docs');
            expect(wrapper.attributes()).toEqual(HREF_FORM_BASELINE_ATTRS);
            expect(wrapper.element.innerHTML).toBe(HREF_FORM_BASELINE_INNER_HTML);
        });

        it('L-06 route 与 href 同时存在时应以 href 为准', async () => {
            const { router, wrapper } = await mountWithRouter(
                { route: '/x', href: '/external' },
                '首页'
            );
            const a = wrapper.find('a');
            expect(a.attributes('href')).toBe('/external');
            expect(a.attributes('to')).toBeUndefined();
            expect(wrapper.html()).not.toContain('[object Object]');
            expect(router.currentRoute.value.path).toBe('/x');
        });
    });
});