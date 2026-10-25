/**
 * Glass 主题门禁 · T77 阴影裁剪机械断言（S1–S8）。
 *
 * 判据来源：`docs/reports/2026-10-25-T77-shadow-clip.md` §3 / §四；
 * 决策：`docs/adr/2026-10-25-glass-shadow-clip.md`。
 *
 * 解析口径（**不得自创**）：
 * - `box-shadow` 按顶层逗号切层 → `inset` 层外溢记 0 →
 *   其余 `extent = blur + spread + max(|offset-x|, |offset-y|)` → 多层取 **max，不相加**。
 * - `var()` 链解到底（含 focus 变体）；`rem` 按根字号 16px 换算。
 * - S4–S6 断言**最终计算值**（subject + specificity + 源码顺序），
 *   而不是「某条分组规则存在」——否则合并/拆规则会假红或假绿。
 *
 * 覆盖边界：本文件是静态证明（jsdom 无渲染），浏览器实渲染仍由 PM 视觉走查（M6）兜底。
 */
import { describe, expect, it } from 'vite-plus/test';
import {
    GLASS_DIST,
    GLASS_SRC,
    ROOT_FONT_PX,
    ensureDistBuilt,
    extractRules,
    loadTokenStore,
    parseDeclarations,
    parseShadowLayers,
    readAllCss,
    readCss,
    resolveCascade,
    resolveNumeric,
    resolvePadding,
    selectorSubject,
    shadowExtent,
    splitSelectorList,
    splitWhitespaceTopLevel,
    specificity,
    stripComments,
    toPx,
    type FlatRule
} from './css-helpers';

ensureDistBuilt();

const store = loadTokenStore();
const containerCss = readCss(GLASS_SRC, 'components/container.css');

/* ------------------------------ 作用域解析 ------------------------------ */

/** 去掉伪类/属性选择器，只保留复合选择器主体（`.nue-input:focus-within` → `.nue-input`）。 */
function baseSubject(selector: string): string {
    return selectorSubject(selector).replace(/::?[\w-]+(\([^)]*\))?/g, '');
}

/**
 * 为某条规则构造 `var()` 作用域：
 * - 同名规则（如同一组件的「变量块」+「样式块」）；
 * - 祖先规则（嵌套 `&:focus-within` 需要父级的 `--nue-input-focus-shadow`）。
 *
 * 注意：**不**把 `.nue-input.nue-input--disabled`（它把 focus-shadow 置 none）并进来——
 * 它的 subject 不同，也不会出现在 focus 规则的祖先链上。
 */
function scopeForRule(css: string, rule: FlatRule): Map<string, string> {
    const subjects = new Set<string>();
    for (const ancestor of rule.ancestors) {
        for (const selector of splitSelectorList(ancestor)) subjects.add(baseSubject(selector));
    }
    for (const selector of splitSelectorList(rule.fullSelector)) {
        subjects.add(baseSubject(selector));
    }
    const scope = new Map<string, string>();
    for (const candidate of extractRules(css)) {
        const candidateSubjects = splitSelectorList(candidate.fullSelector).map(baseSubject);
        if (!candidateSubjects.some(subject => subjects.has(subject))) continue;
        for (const declaration of parseDeclarations(candidate.body)) {
            if (declaration.prop.startsWith('--')) scope.set(declaration.prop, declaration.value);
        }
    }
    return scope;
}

/* ------------------------------ S1 ------------------------------ */

/** 可被任意嵌套进玻璃面板、且会画阴影的组件（arch §4.1 固定集合）。 */
const SHADOW_COMPONENT_FILES = [
    'button',
    'button-group',
    'input',
    'textarea',
    'switch',
    'checkbox',
    'div'
] as const;

interface ShadowSource {
    file: string;
    selector: string;
    value: string;
    extent: number;
}

const shadowSources: ShadowSource[] = SHADOW_COMPONENT_FILES.flatMap(file => {
    const css = readCss(GLASS_SRC, `components/${file}.css`);
    return extractRules(css).flatMap(rule => {
        const scope = scopeForRule(css, rule);
        return parseDeclarations(rule.body)
            .filter(declaration => declaration.prop === 'box-shadow')
            .map(declaration => ({
                file,
                selector: rule.fullSelector,
                value: declaration.value,
                extent: shadowExtent(declaration.value, 0, store, scope)
            }));
    });
});

const maxChildExtent = Math.max(...shadowSources.map(source => source.extent));

describe('S1 子元素阴影最大外溢 maxChildExtent', () => {
    it('= 16px（7 类可嵌套组件 + focus 变体，var() 链解到底）', () => {
        expect(
            maxChildExtent,
            `实测 ${maxChildExtent}px；来源：${shadowSources
                .filter(source => source.extent === maxChildExtent)
                .map(source => `${source.file}:${source.selector}`)
                .join(' / ')}`
        ).toBe(16);
    });

    it('focus 变体确实被收集（非空转）：input/textarea 的 :focus-within 各 1 条', () => {
        const focus = shadowSources.filter(source => source.selector.includes(':focus-within'));
        const files = [...new Set(focus.map(source => source.file))].sort();
        expect(files, 'focus 阴影来源').toEqual(['input', 'textarea']);
        for (const source of focus) {
            expect(source.extent, `${source.file} focus extent`).toBe(16);
        }
    });

    it('解析器自证：32 / 16 / 0 / 3 / 0 各口径都对（防「全返回 0」假绿）', () => {
        expect(shadowExtent('0 8px 24px hsl(211, 40%, 10%, 0.1)', 0, store)).toBe(32);
        expect(shadowExtent('0 4px 12px var(--nue-secondary-shadow-color)', 0, store)).toBe(16);
        expect(shadowExtent('inset 0 1px 0 hsl(0, 0%, 100%, 0.55)', 0, store)).toBe(0);
        expect(shadowExtent('0 0 0 3px red', 0, store)).toBe(3);
        expect(shadowExtent('none', 0, store)).toBe(0);
        // 多层取 max 不相加：3 + 16 仍为 16
        expect(
            shadowExtent('0 1px 2px hsl(0, 0%, 0%, 0.1), 0 4px 12px hsl(0, 0%, 0%, 0.2)', 0, store)
        ).toBe(16);
        // rem 换算：0 0.25rem 0.75rem → 4 + 12 = 16
        expect(shadowExtent('0 0.25rem 0.75rem', 0, store)).toBe(4 + 12);
        expect(ROOT_FONT_PX).toBe(16);
    });
});

/* ------------------------------ S2 ------------------------------ */

const CLASS_1_PANELS = [
    { file: 'dialog', selector: '.nue-dialog' },
    { file: 'confirm', selector: '.nue-confirm' },
    { file: 'prompt', selector: '.nue-prompt' },
    { file: 'drawer', selector: '.nue-drawer' }
] as const;

describe('S2 Class-1 面板 padding 预算（min ≥20px 且 ≥ maxChildExtent+4）', () => {
    for (const panel of CLASS_1_PANELS) {
        it(`${panel.selector} 四边最小值 ≥20px 且 ≥${maxChildExtent}+4`, () => {
            const css = readCss(GLASS_SRC, `components/${panel.file}.css`);
            const padding = resolvePadding(css, panel.selector, 0, store);
            const min = Math.min(padding.top, padding.right, padding.bottom, padding.left);
            expect(
                min,
                `${panel.selector} padding = ${JSON.stringify(padding)}，最小值 ${min}px`
            ).toBeGreaterThanOrEqual(20);
            expect(
                min,
                `${panel.selector} padding 必须 ≥ maxChildExtent(${maxChildExtent}) + 4`
            ).toBeGreaterThanOrEqual(maxChildExtent + 4);
        });
    }

    it('变异自证：padding 从 1.25rem 退回 1rem 时 S2 判据会红', () => {
        const mutated = readCss(GLASS_SRC, 'components/dialog.css').replace(
            'padding: 1.25rem',
            'padding: 1rem'
        );
        const padding = resolvePadding(mutated, '.nue-dialog', 0, store);
        expect(Math.min(padding.top, padding.right, padding.bottom, padding.left)).toBe(16);
        expect(16).toBeLessThan(20);
    });

    it('解析器自证：1.25rem=20 / 简写展开 / 长写覆盖', () => {
        expect(toPx(resolveNumeric('1.25rem', 0, store))).toBe(20);
        expect(toPx(resolveNumeric('1rem', 0, store))).toBe(16);
        const synthetic = '.x { padding: 1.25rem; padding-left: 2rem; }';
        expect(resolvePadding(synthetic, '.x', 0, store)).toEqual({
            top: 20,
            right: 20,
            bottom: 20,
            left: 32
        });
        expect(splitWhitespaceTopLevel('1px 2px 3px 4px')).toEqual(['1px', '2px', '3px', '4px']);
    });
});

/* ------------------------------ S3 ------------------------------ */

const CLASS_2_PANELS = [
    { file: 'dropdown', root: '.nue-dropdown' },
    { file: 'tooltip', root: '.nue-tooltip' },
    { file: 'message', root: '.nue-message-node-inner' }
] as const;

describe('S3 Class-2 面（dropdown / tooltip / message）后代 box-shadow = 0', () => {
    for (const panel of CLASS_2_PANELS) {
        it(`${panel.file}.css：仅面板根有 1 条 var(--nue-glass-shadow)，后代 0 条`, () => {
            const css = readCss(GLASS_SRC, `components/${panel.file}.css`);
            const declarations = extractRules(css).flatMap(rule =>
                parseDeclarations(rule.body)
                    .filter(declaration => declaration.prop === 'box-shadow')
                    .map(declaration => ({
                        selectors: splitSelectorList(rule.fullSelector),
                        value: declaration.value
                    }))
            );
            // 只有「选择器列表里全部是面板根」才算出根自身的 box-shadow；
            // 若把根与后代写进同一条分组规则（`.nue-dropdown, .nue-dropdown-item`），
            // 该声明必须按后代计——否则分组就能绕过 S3。
            const isRootOnly = (selectors: string[]) =>
                selectors.length > 0 && selectors.every(selector => selector === panel.root);
            const roots = declarations.filter(item => isRootOnly(item.selectors));
            const descendants = declarations.filter(item => !isRootOnly(item.selectors));

            expect(roots.length, `${panel.root} 的 box-shadow 条数`).toBe(1);
            expect(roots[0]?.value, `${panel.root} 的 box-shadow 值`).toBe(
                'var(--nue-glass-shadow)'
            );
            expect(
                descendants.map(
                    item => `${item.selectors.join(', ')} { box-shadow: ${item.value} }`
                ),
                `${panel.file}.css 的后代不应有 box-shadow（有则上 Class-1，不加豁免）`
            ).toEqual([]);
        });
    }
});

/* ------------------------------ S4–S6 ------------------------------ */

const containerSrc = containerCss;
const containerDist = readCss(GLASS_DIST, 'components/container.css');

function overflowSubjects(css: string): string[] {
    const subjects = new Set<string>();
    for (const rule of extractRules(css)) {
        const declarations = parseDeclarations(rule.body).filter(declaration =>
            ['overflow', 'overflow-x', 'overflow-y'].includes(declaration.prop)
        );
        if (declarations.length === 0) continue;
        for (const selector of splitSelectorList(rule.fullSelector)) {
            subjects.add(selectorSubject(selector));
        }
    }
    return [...subjects].sort();
}

/**
 * S4–S6 全部按**最终计算值**断言（subject + specificity + 源码顺序），
 * 不依赖「某条分组规则存在」——合并/拆分/重排规则既不会假红也不会假绿。
 *
 * T79（2026-10-25，用户要求）：`.nue-content` 不再是滚动容器。
 * 理由：**阴影完整优先于 content 区内滚动**，滚动职责上移到使用方（页面层）；
 * glass README 已把「滚动由使用方承担」写成契约。
 * ⇒ `.nue-content` 必须有意的 `overflow: visible`（本文件显式断言），
 *   S6 除了拦「值对不对」，还拦「有人把滚动职责偷偷塞回 content」——
 *   把它改回 `auto`（哪怕只是不加思考地恢复旧值）S6 立刻红。
 */
describe('S4–S6 包装层 overflow（按最终计算值，src + dist 双证）', () => {
    for (const [label, css] of [
        ['src', containerSrc],
        ['dist', containerDist]
    ] as const) {
        it(`S4 ${label}：.nue-header / .nue-main / .nue-footer 最终 overflow = visible`, () => {
            for (const subject of ['.nue-header', '.nue-main', '.nue-footer']) {
                const { value, matches } = resolveCascade(css, subject, 'overflow');
                expect(
                    value,
                    `${label} ${subject} 最终 overflow=${value ?? '(无声明)'}；候选：${matches
                        .map(match => `${match.selector}→${match.value}`)
                        .join(' / ')}`
                ).toBe('visible');
            }
        });

        it(`S5 ${label}：.nue-container 与 .nue-container--nested 最终 overflow = hidden`, () => {
            for (const subject of ['.nue-container', '.nue-container--nested']) {
                const { value } = resolveCascade(css, subject, 'overflow');
                expect(value, `${label} ${subject} 最终 overflow`).toBe('hidden');
            }
        });

        it(`S6 ${label}：最终 overflow:auto 恰为 .nue-aside；.nue-content 必须 visible`, () => {
            const subjects = overflowSubjects(css);
            expect(
                subjects.length,
                `${label} 带 overflow 声明的 subject 数（非空自证）`
            ).toBeGreaterThan(0);
            const autos = subjects.filter(
                subject => resolveCascade(css, subject, 'overflow').value === 'auto'
            );
            expect(autos, `${label} 最终为 auto 的滚动容器（content 已取消滚动职责）`).toEqual([
                '.nue-aside'
            ]);

            // 显式断言 content = visible（不是「不在 auto 集合里」的宽松写法）：
            // 若有人把滚动职责塞回 content（auto/scroll），这里必须红。
            const content = resolveCascade(css, '.nue-content', 'overflow');
            expect(
                content.value,
                `${label} .nue-content 最终 overflow=${content.value ?? '(无声明)'}；` +
                    'T79 要求 visible（阴影完整优先，滚动由使用方承担）'
            ).toBe('visible');
        });
    }

    it('变异自证：把 .nue-content 改回 auto 后 S6 判据会红（防滚动职责回流）', () => {
        const mutated = containerSrc.replace(
            /(\.nue-content \{[\s\S]*?)overflow: visible/,
            '$1overflow: auto'
        );
        const content = resolveCascade(mutated, '.nue-content', 'overflow');
        expect(content.value).toBe('auto');
        expect(content.value).not.toBe('visible');
        expect(
            [...overflowSubjects(mutated)].filter(
                subject => resolveCascade(mutated, subject, 'overflow').value === 'auto'
            )
        ).toEqual(['.nue-aside', '.nue-content']);
    });

    it('变异自证：把 visible 改成 hidden 后 S4 判据会红', () => {
        const mutated = containerSrc.replace('overflow: visible', 'overflow: hidden');
        expect(resolveCascade(mutated, '.nue-header', 'overflow').value).toBe('hidden');
        expect(resolveCascade(mutated, '.nue-main', 'overflow').value).toBe('hidden');
        expect(resolveCascade(mutated, '.nue-footer', 'overflow').value).toBe('hidden');
    });

    it('自证：级联解析能区分「先 hidden 后被 auto 覆盖」（aside 实测 auto）', () => {
        const { matches } = resolveCascade(containerSrc, '.nue-aside', 'overflow');
        expect(matches.length, 'aside 的 overflow 候选规则数').toBeGreaterThanOrEqual(2);
        expect(matches.map(match => match.value)).toContain('hidden');
        expect(matches.at(-1)?.value).toBe('auto');
        // specificity 同分时按源码顺序（后写的 auto 胜出）；三 compound 300 > 单 compound 100
        expect(specificity('.nue-container > .nue-main > .nue-aside')).toBe(300);
        expect(specificity('.nue-aside')).toBe(100);
    });
});

/* ------------------------------ S7 ------------------------------ */

describe('S7 --nue-glass-shadow 外溢 ≤48px', () => {
    it('解析后最大外溢 ≤48px（非空转：>0）', () => {
        const value = store.raw.get('--nue-glass-shadow');
        expect(value, '--nue-glass-shadow 必须存在').toBeDefined();
        const layers = parseShadowLayers(value as string, 0, store);
        const extent = shadowExtent(value as string, 0, store);
        expect(layers.length, '阴影层数').toBeGreaterThan(0);
        expect(extent, `实测 ${extent}px`).toBeGreaterThan(0);
        expect(extent, `实测 ${extent}px（上限 48）`).toBeLessThanOrEqual(48);
    });
});

/* ------------------------------ S8 ------------------------------ */

const CLIP_PATTERN = /overflow(?:-[xy])?\s*:\s*clip\b|overflow-clip-margin\s*:/g;

function countClip(css: string): number {
    return (stripComments(css).match(CLIP_PATTERN) ?? []).length;
}

describe('S8 overflow:clip / overflow-clip-margin = 0', () => {
    it('src 全量 0 命中', () => {
        const hits = [...readAllCss(GLASS_SRC).entries()]
            .map(([file, css]) => ({ file, count: countClip(css) }))
            .filter(item => item.count > 0);
        expect(hits, 'Safari 不支持 overflow-clip-margin，禁止引入').toEqual([]);
    });

    it('dist 全量 0 命中', () => {
        const hits = [...readAllCss(GLASS_DIST).entries()]
            .map(([file, css]) => ({ file, count: countClip(css) }))
            .filter(item => item.count > 0);
        expect(hits, 'dist 中不得出现 overflow:clip / clip-margin').toEqual([]);
    });

    it('正则自证：合成样本必须命中 3 处（防「扫不到」假绿）', () => {
        expect(
            countClip(
                '.a { overflow: clip } .b { overflow-x: clip } .c { overflow-clip-margin: 16px }'
            )
        ).toBe(3);
    });
});

/* ------------------------------ 回归保护 ------------------------------ */

describe('T77 改动的回归保护（不新增 token / 不影响对比度门禁的输入）', () => {
    it('variables.css 中 --nue-glass-* 仍为 6 个（T77 未新增变量名）', () => {
        const glassNames = [
            ...new Set(
                [
                    ...readCss(GLASS_SRC, 'global/variables.css').matchAll(
                        /(--nue-glass-[\w-]+)\s*:/g
                    )
                ].map(match => match[1])
            )
        ].sort((a, b) => (a ?? '').localeCompare(b ?? ''));
        expect(glassNames).toEqual([
            '--nue-glass-bg',
            '--nue-glass-blur',
            '--nue-glass-border',
            '--nue-glass-scrim',
            '--nue-glass-shadow',
            '--nue-glass-solid'
        ]);
    });

    it('Class-1 面板仍保留 backdrop-filter = var(--nue-glass-blur)（T77 未误伤玻璃面）', () => {
        for (const panel of CLASS_1_PANELS) {
            const css = readCss(GLASS_SRC, `components/${panel.file}.css`);
            const value = extractRules(css)
                .flatMap(rule => parseDeclarations(rule.body))
                .find(declaration => declaration.prop === 'backdrop-filter')?.value;
            expect(value, `${panel.file}.css 的 backdrop-filter`).toBe('var(--nue-glass-blur)');
        }
    });
});