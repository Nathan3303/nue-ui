import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NueDivider } from '../index';

describe('NueDivider', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认分割线', () => {
            const wrapper = mount(NueDivider);
            expect(wrapper.find('.nue-divider').exists()).toBe(true);
        });

        it('应该渲染带文本的分割线', () => {
            const wrapper = mount(NueDivider, {
                props: { text: '分割线文本' }
            });
            expect(wrapper.text()).toContain('分割线文本');
        });

        it('应该渲染垂直方向的分割线', () => {
            const wrapper = mount(NueDivider, {
                props: { vertical: true }
            });
            expect(wrapper.find('.nue-divider').classes()).toContain('nue-divider--vertical');
        });

        it('应该渲染不同线型的分割线', () => {
            const lineStyles = ['solid', 'dashed', 'dotted'] as const;
            lineStyles.forEach(lineStyle => {
                const wrapper = mount(NueDivider, {
                    props: { lineStyle }
                });
                expect(wrapper.find('.nue-divider').attributes('style')).toContain(
                    `--nue-divider-border-style: ${lineStyle}`
                );
            });
        });

        it('应该渲染不同线宽的分割线', () => {
            const lineWidths = ['1px', '2px', '3px'] as const;
            lineWidths.forEach(lineWidth => {
                const wrapper = mount(NueDivider, {
                    props: { lineWidth }
                });
                expect(wrapper.find('.nue-divider').attributes('style')).toContain(
                    `--nue-divider-border-width: ${lineWidth}`
                );
            });
        });

        it('应该渲染不同线颜色的分割线', () => {
            const lineColors = ['primary', 'success', 'warning', 'danger'] as const;
            lineColors.forEach(lineColor => {
                const wrapper = mount(NueDivider, {
                    props: { lineColor }
                });
                expect(wrapper.find('.nue-divider').attributes('style')).toContain(
                    `--nue-divider-border-color: ${lineColor}`
                );
            });
        });

        it('应该渲染不同对齐方式的分割线', () => {
            const alignments = ['start', 'center', 'end'] as const;
            alignments.forEach(alignment => {
                const wrapper = mount(NueDivider, {
                    props: { alignment }
                });
                expect(wrapper.find('.nue-divider').attributes('style')).toContain(
                    `--nue-divider-alignment: ${alignment}`
                );
            });
        });
    });
});
