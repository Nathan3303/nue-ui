import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueAside, NueContainer, NueMain, NueSeparator } from '../index';

describe('NueContainer', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认容器', () => {
            const wrapper = mount(NueContainer, {
                slots: {
                    default: '<div class="content">内容</div>'
                }
            });
            expect(wrapper.find('.nue-container').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueContainer, {
                slots: {
                    default: '<div class="content">默认内容</div>'
                }
            });
            expect(wrapper.find('.content').exists()).toBe(true);
        });
    });
});

/**
 * Issue #97：`collapsed` 覆盖两种形态 —— 默认图标模式收窄到 4.5rem，
 * 传 `collapsed-width="0"` 则完全隐藏。
 *
 * 折叠宽度走既有的 `--nue-aside-width` / `-min-width` / `-max-width` 三个变量
 * （主题的 `.nue-aside` 规则直接消费它们），因此组件单测能直接断言「宽度指向折叠值」；
 * 「padding 归零」属于主题 CSS，见 `packages/themes/glass/__tests__/container-collapse.test.ts`。
 */
describe('NueAside', () => {
    describe('折叠（collapsed / collapsedWidth）', () => {
        it('collapsed=true 时输出 data-collapsed="true"，三个宽度变量指向默认折叠宽度', () => {
            const wrapper = mount(NueAside, { props: { collapsed: true } });
            const style = wrapper.attributes('style') ?? '';
            expect(wrapper.attributes('data-collapsed')).toBe('true');
            expect(style).toContain('--nue-aside-width: 4.5rem');
            // min/max 必须同步：只改 width 会被 min-width 撑回原宽
            expect(style).toContain('--nue-aside-min-width: 4.5rem');
            expect(style).toContain('--nue-aside-max-width: 4.5rem');
        });

        it('collapsed-width="0" 时折叠宽度为 0（完全隐藏形态）', () => {
            const wrapper = mount(NueAside, {
                props: { collapsed: true, collapsedWidth: '0' }
            });
            const style = wrapper.attributes('style') ?? '';
            for (const prop of ['width', 'min-width', 'max-width']) {
                expect(style).toContain(`--nue-aside-${prop}: 0`);
            }
        });

        it('collapsed=false 时恢复原宽度', () => {
            const wrapper = mount(NueAside, {
                props: { width: '240px', minWidth: '16%', maxWidth: '32%' }
            });
            const style = wrapper.attributes('style') ?? '';
            expect(wrapper.attributes('data-collapsed')).toBe('false');
            expect(style).toContain('--nue-aside-width: 240px');
            expect(style).toContain('--nue-aside-min-width: 16%');
            expect(style).toContain('--nue-aside-max-width: 32%');
        });

        it('折叠 → 展开后不残留折叠宽度与内联内边距（受控 prop 往返）', async () => {
            const wrapper = mount(NueAside, {
                props: { width: '240px', collapsed: true, collapsedWidth: '0' }
            });
            expect(wrapper.attributes('data-collapsed')).toBe('true');
            expect(wrapper.attributes('style')).toContain('--nue-aside-width: 0');

            await wrapper.setProps({ collapsed: false });
            const style = wrapper.attributes('style') ?? '';
            expect(wrapper.attributes('data-collapsed')).toBe('false');
            expect(style).toContain('--nue-aside-width: 240px');
            expect(style).not.toContain('4.5rem');
            expect(style).not.toContain('padding');
        });
    });
});

describe('NueSeparator', () => {
    describe('插槽渲染', () => {
        it('应该渲染默认插槽作为手柄指示器', () => {
            const wrapper = mount(NueSeparator, {
                slots: { default: '<span class="grip-icon">||</span>' }
            });
            expect(wrapper.find('.grip-icon').exists()).toBe(true);
        });
    });

    /**
     * Issue #97：separator 曾把「拖到最小宽度」写进 opTarget 的 `data-collapsed`，
     * 与 NueAside 的受控 `collapsed` 抢同一个属性（拖拽后 aside 变成折叠宽度 + 原内边距）。
     * 现在 separator 只写私有属性 `data-resize-collapsed`，并跳过受控折叠的目标。
     */
    describe('与折叠 Aside 的属性隔离', () => {
        const mountShell = (asideProps: Record<string, unknown> = {}) =>
            mount({
                components: { NueMain, NueAside, NueSeparator },
                template: `
                    <nue-main>
                        <nue-aside v-bind="asideProps" />
                        <nue-separator op-target="previous" />
                    </nue-main>
                `,
                data: () => ({ asideProps })
            });

        const dragTo = async (wrapper: ReturnType<typeof mountShell>, toX: number) => {
            await wrapper.find('.nue-separator').trigger('mousedown', { clientX: 300 });
            document.documentElement.dispatchEvent(new MouseEvent('mousemove', { clientX: toX }));
            await wrapper.find('.nue-separator').trigger('mouseup');
        };

        it('拖到最小宽度时只写私有属性，不改写 aside 的 data-collapsed', async () => {
            const wrapper = mountShell({ width: '240px' });
            const aside = wrapper.find('.nue-aside');
            expect(aside.attributes('data-collapsed')).toBe('false');

            await wrapper.find('.nue-separator').trigger('mousedown', { clientX: 300 });
            await dragTo(wrapper, 350); // newWidth 50 < minWidth(72) → 最小态

            expect(aside.attributes('data-resize-collapsed')).toBe('true');
            expect(aside.attributes('data-collapsed'), '公共属性不得被 separator 改写').toBe(
                'false'
            );
            expect(aside.attributes('style') ?? '').not.toContain('width: 50px');
        });

        it('受控 collapsed 的 aside 拖拽后仍保持折叠宽度，不产生内联宽度', async () => {
            const wrapper = mountShell({ collapsed: true, width: '240px' });
            const aside = wrapper.find('.nue-aside');
            expect(aside.attributes('data-collapsed')).toBe('true');

            await wrapper.find('.nue-separator').trigger('mousedown', { clientX: 300 });
            await dragTo(wrapper, 400);
            await wrapper.find('.nue-separator').trigger('dblclick');

            const style = aside.attributes('style') ?? '';
            expect(aside.attributes('data-collapsed')).toBe('true');
            expect(aside.attributes('data-resize-collapsed'), '折叠目标不参与拖拽').toBeUndefined();
            expect(style).toContain('--nue-aside-width: 4.5rem');
            expect(style).not.toContain('width: 100px');
        });
    });
});