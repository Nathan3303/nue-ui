import { describe, it, expect } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueAside, NueContainer, NueSeparator } from '../index';

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
});