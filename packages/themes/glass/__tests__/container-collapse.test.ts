/**
 * Aside 折叠契约 · 两套主题（Issue #97 / #86 批 2）。
 *
 * jsdom 没有 CSS 引擎，`padding` 归零、宽度链路这些判定只能在主题源码上锁。
 * 两套主题各验一次：glass 与 shadlike 的 `container.css` 都必须满足同一份契约。
 *
 * 分工：
 * - 组件侧（`collapsed` 输出 `data-collapsed`、宽度变量取值）见
 *   `packages/components/container/__tests__/container.test.ts`；
 * - 本文件只锁主题对**收起态**的响应：归零内边距/间距 + 消费组件的宽度变量。
 */
import { describe, expect, it } from 'vite-plus/test';
import {
    GLASS_SRC,
    SHADLIKE_SRC,
    findRules,
    readCss,
    ruleCustomProps,
    ruleProperty,
    stripComments
} from './css-helpers';

const COLLAPSED_SELECTOR = "&[data-collapsed='true']";
const ASIDE_SELECTOR = '> .nue-aside';

const themes = [
    ['glass', readCss(GLASS_SRC, 'components/container.css')],
    ['shadlike', readCss(SHADLIKE_SRC, 'components/container.css')]
] as const;

describe.each(themes)('%s 主题 · aside 收起态', (_theme, css) => {
    it('padding / gap 归零（aside 是 content-box，否则宽度归零仍占内边距）', () => {
        expect(ruleProperty(css, COLLAPSED_SELECTOR, 'padding')).toBe('0');
        expect(ruleProperty(css, COLLAPSED_SELECTOR, 'gap')).toBe('0');
    });

    it('不使用 !important（折叠宽度靠组件内联自定义属性覆盖）', () => {
        const bodies = findRules(css, COLLAPSED_SELECTOR).map(rule => stripComments(rule.body));
        expect(bodies.length).toBeGreaterThan(0);
        expect(bodies.join('\n')).not.toContain('!important');
    });

    it('宽度链路消费组件的 --nue-aside-width / -min-width / -max-width', () => {
        const customProps = ruleCustomProps(css, ASIDE_SELECTOR);
        expect(customProps.get('--nue-aside-width')).toBeDefined();
        expect(customProps.get('--nue-aside-min-width')).toBeDefined();
        expect(customProps.get('--nue-aside-max-width')).toBeDefined();
        for (const prop of ['width', 'min-width', 'max-width']) {
            expect(ruleProperty(css, ASIDE_SELECTOR, prop)).toBe(`var(--nue-aside-${prop})`);
        }
    });
});