/**
 * Glass 主题门禁 · A1–A11 + 对比度矩阵（docs/reports/2026-10-25-T75-arch.md §5.3 / §十）。
 *
 * 核心原则：
 * - 对比度**一律从 token 实算**（`global/variables.css` + 组件规则里的映射），
 *   不写期望快照、不抄 rd-fe 的数字。改低对比色阶或改错映射即红。
 * - 玻璃面按 `--nue-glass-bg` 的实测 alpha 叠**纯白 / 纯黑**两端（AC-09）；
 *   退化态（A8）把底换成 `--nue-glass-solid` 重跑全部配对。
 * - 文本链路上的 `opacity < 1` 先按 `color × Πopacity` 合成再比（A11）：
 *   声明色 800 看似达标、合成后 2.09 的假绿在这里会被抓出来。
 *
 * 覆盖边界（与 arch §5.3 一致，不许含糊）：本文件证明「规则存在、模糊入口全覆盖、
 * 退化后配色达标」，**不证明**浏览器真的这样渲染（jsdom 无 CSS 引擎，浏览器级验证
 * 留给 PM 人工走查）。
 */
import { describe, expect, it } from 'vite-plus/test';
import {
    GLASS_DIST,
    GLASS_SRC,
    SHADLIKE_SRC,
    applyOpacity,
    collectDefinitions,
    collectReferences,
    contrastRatio,
    countModernSyntax,
    degradedSurface,
    ensureDistBuilt,
    extractBlocks,
    extractRules,
    findRules,
    formatRatio,
    glassSurfaces,
    loadTokenStore,
    parseDeclarations,
    parseOpacityLiteral,
    readAllCss,
    readCss,
    resolveColor,
    resolveColorFromName,
    resolvePercent,
    ruleCustomProps,
    ruleProperty,
    splitSelectorList,
    stripComments,
    type DarkSwitch,
    type RGB
} from './css-helpers';

/* ------------------------------ 语料 ------------------------------ */

ensureDistBuilt();
const variablesCss = readCss(GLASS_SRC, 'global/variables.css');
const store = loadTokenStore();

const COMPONENT_FILES = [
    'avatar',
    'badge',
    'breadcrumb',
    'button-group',
    'button',
    'calendar',
    'checkbox',
    'collapse',
    'confirm',
    'container',
    'date-picker',
    'dialog',
    'div',
    'divider',
    'drawer',
    'dropdown',
    'empty',
    'icon',
    'infinite-scroll',
    'input',
    'link',
    'marquee',
    'message',
    'overlay',
    'popup-pool',
    'progress',
    'prompt',
    'select',
    'switch',
    'table',
    'text',
    'textarea',
    'tooltip',
    'scroll-bar'
] as const;
type ComponentFile = (typeof COMPONENT_FILES)[number];

const componentCss = new Map<ComponentFile, string>(
    COMPONENT_FILES.map(name => [name, readCss(GLASS_SRC, `components/${name}.css`)])
);

const cssOf = (file: ComponentFile): string => {
    const css = componentCss.get(file);
    if (css === undefined) throw new Error(`未加载组件样式 ${file}.css`);
    return css;
};

const MODES: readonly DarkSwitch[] = [0, 1];
const modeLabel = (dark: DarkSwitch) => (dark === 0 ? '浅色' : '深色');

/* ------------------------------ 取值辅助 ------------------------------ */

const tokenColor =
    (name: string) =>
    (dark: DarkSwitch): RGB =>
        resolveColorFromName(name, dark, store).rgb;

/** 组件规则里的局部自定义属性 → 颜色。 */
function localColor(
    file: ComponentFile,
    prop: string,
    ...selectors: string[]
): (dark: DarkSwitch) => RGB {
    const scope = ruleCustomProps(cssOf(file), ...selectors);
    if (scope.get(prop) === undefined) {
        throw new Error(`${file}.css 的 ${selectors.join(' / ')} 缺少 --${prop}`);
    }
    return dark => resolveColorFromName(prop, dark, store, scope).rgb;
}

/** 组件规则里的普通 `color` 声明（可携带局部变量作用域）→ 颜色。 */
function declaredColor(
    file: ComponentFile,
    selector: string,
    prop = 'color',
    scopeSelectors: string[] = []
): (dark: DarkSwitch) => RGB {
    const value = ruleProperty(cssOf(file), selector, prop);
    if (value === undefined) throw new Error(`${file}.css 的 ${selector} 缺少 ${prop}`);
    const scope = scopeSelectors.length
        ? ruleCustomProps(cssOf(file), ...scopeSelectors)
        : undefined;
    return dark => resolveColor(value, dark, store, scope).rgb;
}

/** textarea 的 `::placeholder` 是 A11 的关键回归点：颜色 + opacity 必须一起读。 */
const textareaPlaceholderOpacity = (() => {
    const raw = ruleProperty(cssOf('textarea'), '&::placeholder', 'opacity');
    const parsed = raw === undefined ? 1 : parseOpacityLiteral(raw);
    if (parsed === null) throw new Error(`textarea ::placeholder 的 opacity 非字面值：${raw}`);
    return parsed;
})();

/* ------------------------------ 对比度矩阵 ------------------------------ */

interface Pair {
    id: string;
    /** 失败信息里必须能直接定位的 selector / token。 */
    selector: string;
    requirement: string;
    dark: DarkSwitch;
    fg: RGB;
    bg: RGB;
    min: number;
    note: string;
}

interface Surface {
    label: string;
    color: RGB;
}

/** 玻璃面：正常 = 叠纯白/纯黑两端；退化 = `--nue-glass-solid` 单点覆写后的实底。 */
function glassBackdrops(dark: DarkSwitch, degraded: boolean): Surface[] {
    if (degraded) return [{ label: '退化实底', color: degradedSurface(dark, store) }];
    return glassSurfaces(dark, store).map(surface => ({
        label: surface.label,
        color: surface.color
    }));
}

interface TextScenario {
    id: string;
    selector: string;
    color: (dark: DarkSwitch) => RGB;
    /** 文本链路有效 opacity（默认 1）；A11 要求先合成再算对比度。 */
    opacity?: number;
}

/**
 * 玻璃面上的文本 token（26 条）。
 * - 全局 token 直接读令牌；
 * - 组件项读组件规则里的映射（改名/改映射即红）；
 * - message 变体合并基础规则 + 变体规则后取值。
 */
const messageVariant = (variant: string) =>
    localColor(
        'message',
        '--nue-message-node-inner-color',
        '.nue-message-node-inner',
        `.nue-message-node-inner.nue-message-node-inner--${variant}`
    );

const GLASS_TEXT_SCENARIOS: TextScenario[] = [
    {
        id: 'T01',
        selector: '--nue-primary-text-color',
        color: tokenColor('--nue-primary-text-color')
    },
    {
        id: 'T02',
        selector: '--nue-secondary-text-color',
        color: tokenColor('--nue-secondary-text-color')
    },
    { id: 'T03', selector: '--nue-link-color', color: tokenColor('--nue-link-color') },
    {
        id: 'T04',
        selector: '--nue-primary-color-700',
        color: tokenColor('--nue-primary-color-700')
    },
    {
        id: 'T05',
        selector: '--nue-link-hover-color',
        color: tokenColor('--nue-primary-color-800')
    },
    {
        id: 'T06',
        selector: '.nue-dropdown-item',
        color: declaredColor('dropdown', '.nue-dropdown-item')
    },
    {
        id: 'T07',
        selector: '.nue-dropdown__empty-text',
        color: tokenColor('--nue-secondary-text-color')
    },
    {
        id: 'T08',
        selector: '.nue-message-node-inner--success',
        color: messageVariant('success')
    },
    {
        id: 'T09',
        selector: '.nue-message-node-inner--warning',
        color: messageVariant('warning')
    },
    {
        id: 'T10',
        selector: '.nue-message-node-inner--error',
        color: messageVariant('error')
    },
    { id: 'T11', selector: '.nue-message-node-inner--info', color: messageVariant('info') },
    { id: 'T12', selector: '.nue-message-node-inner--log', color: messageVariant('log') },
    {
        id: 'T13',
        selector: '.nue-tooltip__text',
        color: localColor('tooltip', '--nue-tooltip-font-color', '.nue-tooltip')
    },
    {
        id: 'T14',
        selector: '.nue-confirm__content',
        color: declaredColor('confirm', '.nue-confirm__content')
    },
    {
        id: 'T15',
        selector: '.nue-prompt__description',
        color: declaredColor('prompt', '.nue-prompt__description')
    },
    {
        id: 'T16',
        selector: '.nue-prompt__value-error',
        color: declaredColor('prompt', '.nue-prompt__value-error')
    },
    {
        id: 'T17',
        selector: '.nue-input__input',
        color: localColor('input', '--nue-input-color', '.nue-input')
    },
    {
        id: 'T18',
        selector: '.nue-input__input::placeholder',
        color: declaredColor('input', '&::placeholder', 'color', ['.nue-input'])
    },
    {
        id: 'T19',
        selector: '.nue-textarea__textarea',
        color: localColor('textarea', '--nue-textarea-color', '.nue-textarea')
    },
    {
        id: 'T20',
        selector: '.nue-textarea__textarea::placeholder',
        color: declaredColor('textarea', '&::placeholder', 'color', ['.nue-textarea']),
        opacity: textareaPlaceholderOpacity
    },
    {
        id: 'T21',
        selector: '.nue-checkbox__label',
        color: localColor('checkbox', '--nue-checkbox-label-color', '.nue-checkbox')
    },
    {
        id: 'T22',
        selector: '.nue-breadcrumb-item',
        color: localColor('breadcrumb', '--nue-breadcrumb-color', '.nue-breadcrumb')
    },
    {
        id: 'T23',
        selector: '.nue-collapse-item__header',
        color: declaredColor('collapse', '.nue-collapse-item__header')
    },
    {
        id: 'T24',
        selector: '.nue-collapse-item__title',
        color: declaredColor('collapse', '.nue-collapse-item__title')
    },
    {
        id: 'T25',
        selector: '.nue-table__head-cell',
        color: localColor('table', '--nue-table-header-color', '.nue-table')
    },
    {
        id: 'T26',
        selector: '.nue-empty__description',
        color: declaredColor('empty', '.nue-empty__description')
    },
    {
        id: 'T27',
        selector: '.nue-button.nue-button--destructive',
        color: localColor(
            'button',
            '--nue-button-color',
            '.nue-button',
            '.nue-button.nue-button--destructive'
        )
    }
];

interface TextPairScenario extends TextScenario {
    backdrops: (dark: DarkSwitch, degraded: boolean) => Surface[];
    min: number;
}

const glassTextPairs = (): TextPairScenario[] =>
    GLASS_TEXT_SCENARIOS.map(scenario => ({
        ...scenario,
        backdrops: (dark, degraded) => glassBackdrops(dark, degraded),
        min: 4.5
    }));

/** 功能性边框 / 非文本图形：≥3:1（D3 只覆盖功能性，`--nue-divider-color` 豁免）。 */
interface NonTextScenario {
    id: string;
    selector: string;
    color: (dark: DarkSwitch) => RGB;
    min: number;
}

const GLASS_NON_TEXT_SCENARIOS: NonTextScenario[] = [
    { id: 'N01', selector: '--nue-border-color', color: tokenColor('--nue-border-color'), min: 3 },
    {
        id: 'N02',
        selector: '.nue-input（--nue-input-border-color）',
        color: localColor('input', '--nue-input-border-color', '.nue-input'),
        min: 3
    },
    {
        id: 'N03',
        selector: '.nue-textarea（--nue-textarea-border-color）',
        color: localColor('textarea', '--nue-textarea-border-color', '.nue-textarea'),
        min: 3
    },
    {
        id: 'N04',
        selector: '.nue-checkbox__icon（--nue-checkbox-icon-color）',
        color: localColor('checkbox', '--nue-checkbox-icon-color', '.nue-checkbox'),
        min: 3
    },
    {
        id: 'N05',
        selector: '.nue-button--destructive（--nue-button-border-color）',
        color: localColor(
            'button',
            '--nue-button-border-color',
            '.nue-button',
            '.nue-button.nue-button--destructive'
        ),
        min: 3
    }
];

/**
 * 自有不透明底的配对（不参与纯白/纯黑两端合成）。
 *
 * ⚠️ 口径与保留决定（PM 2026-10-25 裁决 A，**不得移除**）：
 * - 这些组件自带不透明底（按钮 / badge / date-picker 面板 / progress 填充），
 *   不属于 arch「玻璃两端」的字面口径，但它们承载的是**真实可见文本**，
 *   AC-08「文本 ≥4.5:1，仅 .other-month / .disabled 豁免」同样适用。
 * - O08 / O09 / O10 是 T75-5 门禁**实算抓到**的真缺陷（4.05 / 4.30），
 *   不是口径问题：把场景删掉只会让门禁变绿、缺陷照旧上线。
 * - 因此保留在矩阵里，等 T75-3e 修复后应自然转绿；若有人再次改成低对比映射，
 *   这三条会立刻变红。
 */
interface OpaqueScenario {
    id: string;
    selector: string;
    color: (dark: DarkSwitch) => RGB;
    background: (dark: DarkSwitch) => RGB;
    min: number;
}

const OPAQUE_SCENARIOS: OpaqueScenario[] = [
    // 语义实心按钮：白字对固定填充（两模式同值，RK-9）
    {
        id: 'O01',
        selector: '.nue-button--success（白字 / 填充）',
        color: localColor(
            'button',
            '--nue-button-color',
            '.nue-button',
            '.nue-button.nue-button--success'
        ),
        background: dark =>
            resolveColorFromName(
                '--nue-button-base-color',
                dark,
                store,
                ruleCustomProps(cssOf('button'), '.nue-button', '.nue-button.nue-button--success')
            ).rgb,
        min: 4.5
    },
    {
        id: 'O02',
        selector: '.nue-button--warning（白字 / 填充）',
        color: localColor(
            'button',
            '--nue-button-color',
            '.nue-button',
            '.nue-button.nue-button--warning'
        ),
        background: dark =>
            resolveColorFromName(
                '--nue-button-base-color',
                dark,
                store,
                ruleCustomProps(cssOf('button'), '.nue-button', '.nue-button.nue-button--warning')
            ).rgb,
        min: 4.5
    },
    {
        id: 'O03',
        selector: '.nue-button--error（白字 / 填充）',
        color: localColor(
            'button',
            '--nue-button-color',
            '.nue-button',
            '.nue-button.nue-button--error'
        ),
        background: dark =>
            resolveColorFromName(
                '--nue-button-base-color',
                dark,
                store,
                ruleCustomProps(cssOf('button'), '.nue-button', '.nue-button.nue-button--error')
            ).rgb,
        min: 4.5
    },
    // Badge：白字对 warning-80
    {
        id: 'O04',
        selector: '.nue-badge__content',
        color: localColor('badge', '--nue-badge-color', '.nue-badge'),
        background: dark =>
            resolveColorFromName(
                '--nue-badge-background-color',
                dark,
                store,
                ruleCustomProps(cssOf('badge'), '.nue-badge')
            ).rgb,
        min: 4.5
    },
    // destructive 的 hover 底（error-10 不透明）
    {
        id: 'O05',
        selector: '.nue-button--destructive:hover（文字 / hover 底）',
        color: localColor(
            'button',
            '--nue-button-hover-color',
            '.nue-button',
            '.nue-button.nue-button--destructive'
        ),
        background: dark =>
            resolveColorFromName(
                '--nue-button-hover-bg-color',
                dark,
                store,
                ruleCustomProps(
                    cssOf('button'),
                    '.nue-button',
                    '.nue-button.nue-button--destructive'
                )
            ).rgb,
        min: 4.5
    },
    {
        id: 'O06',
        selector: '.nue-button--destructive:hover（描边 / hover 底）',
        color: localColor(
            'button',
            '--nue-button-hover-border-color',
            '.nue-button',
            '.nue-button.nue-button--destructive'
        ),
        background: dark =>
            resolveColorFromName(
                '--nue-button-hover-bg-color',
                dark,
                store,
                ruleCustomProps(
                    cssOf('button'),
                    '.nue-button',
                    '.nue-button.nue-button--destructive'
                )
            ).rgb,
        min: 3
    },
    // 默认按钮：文字对其自身白底
    {
        id: 'O07',
        selector: '.nue-button（默认文字 / 自身底）',
        color: localColor('button', '--nue-button-color', '.nue-button'),
        background: dark =>
            resolveColorFromName(
                '--nue-button-base-color',
                dark,
                store,
                ruleCustomProps(cssOf('button'), '.nue-button')
            ).rgb,
        min: 4.5
    },
    // O08（T75-3e）：date-picker 触发器 placeholder，落在 .nue-button 的不透明底上。
    // 修复前 4.05/4.30（primary-500 对 primary-0）；目标 → --nue-secondary-text-color。
    {
        id: 'O08',
        selector: '.nue-date-picker .nue-text--placeholder（按钮底）',
        color: declaredColor('date-picker', '.nue-text--placeholder'),
        background: dark => resolveColorFromName('--nue-primary-color-0', dark, store).rgb,
        min: 4.5
    },
    // O09（T75-3e）：date-picker 时间选择器 label（小时/分钟/秒），
    // 落在 .nue-date-picker-panel 的 primary-0 不透明底上。修复前 4.05/4.30。
    {
        id: 'O09',
        selector: '.nue-calendar-time-picker__label（面板底）',
        color: declaredColor('date-picker', '.nue-calendar-time-picker__label'),
        background: dark =>
            resolveColor(
                ruleProperty(cssOf('date-picker'), '.nue-date-picker-panel', 'background-color')!,
                dark,
                store
            ).rgb,
        min: 4.5
    },
    // O10（T75-3e）：Progress 内嵌文字（showInnerText），白字落在 innerbar 的
    // primary-500 不透明填充上。修复前 4.05/4.30；PM 排除「改文字色」路线
    // （primary-900 对 500 仅 4.37/3.14），改为 innerbar → primary-600（白字 5.81/4.82）。
    {
        id: 'O10',
        selector: '.nue-progress__inner-bar .nue-text',
        color: localColor('progress', '--nue-progress-text-color', '.nue-progress'),
        background: dark =>
            resolveColorFromName(
                '--nue-progress-innerbar-background-color',
                dark,
                store,
                ruleCustomProps(cssOf('progress'), '.nue-progress')
            ).rgb,
        min: 4.5
    }
];

function buildMatrix(degraded: boolean): Pair[] {
    const pairs: Pair[] = [];

    for (const dark of MODES) {
        for (const scenario of glassTextPairs()) {
            const declared = scenario.color(dark);
            const opacity = scenario.opacity ?? 1;
            for (const surface of scenario.backdrops(dark, degraded)) {
                pairs.push({
                    id: `${scenario.id}-${dark}-${surface.label}`,
                    selector: scenario.selector,
                    requirement: 'AC-08（玻璃面文本）',
                    dark,
                    fg: applyOpacity(declared, opacity, surface.color),
                    bg: surface.color,
                    min: scenario.min,
                    note: `${modeLabel(dark)} · ${surface.label}${opacity < 1 ? ` · opacity ${opacity}` : ''}`
                });
            }
        }

        for (const scenario of GLASS_NON_TEXT_SCENARIOS) {
            for (const surface of glassBackdrops(dark, degraded)) {
                pairs.push({
                    id: `${scenario.id}-${dark}-${surface.label}`,
                    selector: scenario.selector,
                    requirement: 'AC-08（功能性边框/非文本图形）',
                    dark,
                    fg: scenario.color(dark),
                    bg: surface.color,
                    min: scenario.min,
                    note: `${modeLabel(dark)} · ${surface.label}`
                });
            }
        }

        // 自有不透明底（语义按钮 / badge / date-picker 面板 / progress 填充）与玻璃底无关，
        // 只在常规矩阵里测一次；退化态重算不重复计入（A8 只重算受 `--nue-glass-bg` 影响的配对）。
        if (!degraded) {
            for (const scenario of OPAQUE_SCENARIOS) {
                pairs.push({
                    id: `${scenario.id}-${dark}`,
                    selector: scenario.selector,
                    requirement: 'AC-08（自有不透明底配对）',
                    dark,
                    fg: scenario.color(dark),
                    bg: scenario.background(dark),
                    min: scenario.min,
                    note: modeLabel(dark)
                });
            }
        }
    }

    return pairs;
}

const MATRIX = buildMatrix(false);
const DEGRADED_MATRIX = buildMatrix(true);

function assertPairs(pairs: Pair[], prefix: string) {
    for (const pair of pairs) {
        it(`${prefix}${pair.id} ${pair.selector}（${pair.note}）`, () => {
            const ratio = contrastRatio(pair.fg, pair.bg);
            expect(
                ratio,
                `${pair.requirement}：${pair.selector} 在 ${pair.note} 下为 ${formatRatio(
                    ratio
                )}，要求 ≥${pair.min}:1`
            ).toBeGreaterThanOrEqual(pair.min);
        });
    }
}

/* ------------------------------ A1–A5：退化规则 ------------------------------ */

const source = stripComments(variablesCss);
const topBlocks = extractBlocks(source);
const degradationBlocks = [
    {
        id: 'A1a',
        label: '@supports not (backdrop-filter: blur(1px))',
        match: (prelude: string) => /@supports\s+not\s*\(\s*backdrop-filter\s*:/.test(prelude)
    },
    {
        id: 'A1b',
        label: '@media (prefers-reduced-transparency: reduce)',
        match: (prelude: string) =>
            prelude.startsWith('@media') &&
            /prefers-reduced-transparency\s*:\s*reduce/.test(prelude)
    },
    {
        id: 'A1c',
        label: '@media (prefers-contrast: more)',
        match: (prelude: string) =>
            prelude.startsWith('@media') && /prefers-contrast\s*:\s*more/.test(prelude)
    }
] as const;

const EXPECTED_DEGRADATION = new Map([
    ['--nue-glass-blur', 'none'],
    ['--nue-glass-bg', 'var(--nue-glass-solid)'],
    ['--nue-glass-border', 'var(--nue-border-color)']
]);

function degradationOverrides(block: { body: string }): Map<string, string> {
    const rootBlocks = extractBlocks(stripComments(block.body)).filter(
        inner => inner.prelude.trim() === ':root'
    );
    const overrides = new Map<string, string>();
    for (const root of rootBlocks) {
        for (const declaration of parseDeclarations(root.body)) {
            overrides.set(declaration.prop, declaration.value);
        }
    }
    return overrides;
}

const foundDegradationBlocks = degradationBlocks.map(block => {
    const matches = topBlocks.filter(topBlock => block.match(topBlock.prelude.trim()));
    return { ...block, matches };
});

describe('A1–A5 退化规则结构（@supports not + reduced-transparency + prefers-contrast）', () => {
    it('A1：三条退化块各恰好 1 个', () => {
        for (const block of foundDegradationBlocks) {
            expect(block.matches.length, `${block.label} 数量`).toBe(1);
        }
    });

    it('A2：每块 :root 覆写 3 条（blur/bg/border），合计 9 条', () => {
        let total = 0;
        for (const block of foundDegradationBlocks) {
            const overrides = degradationOverrides(block.matches[0]!);
            expect([...overrides.keys()].sort(), `${block.label} 覆写变量`).toEqual(
                [...EXPECTED_DEGRADATION.keys()].sort()
            );
            total += overrides.size;
        }
        expect(total, '三条退化块覆写合计').toBe(9);
    });

    it('A3：退化值与 arch §5.2 逐字相等（none / solid / border-color）', () => {
        for (const block of foundDegradationBlocks) {
            const overrides = degradationOverrides(block.matches[0]!);
            for (const [prop, expected] of EXPECTED_DEGRADATION) {
                expect(overrides.get(prop), `${block.label} ${prop}`).toBe(expected);
            }
        }
    });

    it('A4：退化值无 alpha（不含 `/`、不含 4 参数 hsl，解析后 alpha = 1）', () => {
        for (const block of foundDegradationBlocks) {
            const overrides = degradationOverrides(block.matches[0]!);
            for (const [prop, value] of overrides) {
                expect(value, `${block.label} ${prop} 不应含斜杠 alpha`).not.toContain('/');
                expect(value, `${block.label} ${prop} 不应含 4 参数 hsl`).not.toMatch(
                    /hsl\([^)]*,[^)]*,[^)]*,/
                );
                if (value.startsWith('var(')) {
                    for (const dark of MODES) {
                        expect(
                            resolveColor(value, dark, store).alpha,
                            `${block.label} ${prop} 解析后 alpha`
                        ).toBe(1);
                    }
                }
            }
        }
    });

    it('A5：三条退化块的位置都在基值定义之后', () => {
        const basePositions = [...EXPECTED_DEGRADATION.keys()].map(prop => {
            const position = source.indexOf(`${prop}:`);
            expect(position, `基值 ${prop} 必须存在`).toBeGreaterThanOrEqual(0);
            return position;
        });
        const lastBasePosition = Math.max(...basePositions);
        for (const block of foundDegradationBlocks) {
            expect(
                block.matches[0]!.start,
                `${block.label} 的起点 ${block.matches[0]!.start} 必须 > 基值 ${lastBasePosition}`
            ).toBeGreaterThan(lastBasePosition);
        }
    });
});

/* ------------------------------ A6–A7：模糊入口 ------------------------------ */

interface SrcRule {
    file: string;
    selector: string;
    declarations: Array<{ prop: string; value: string }>;
    atRules: string[];
}

const srcRules: SrcRule[] = [...componentCss.entries()].flatMap(([file, css]) =>
    extractRules(css).map(rule => ({
        file: `components/${file}.css`,
        selector: rule.selector,
        declarations: parseDeclarations(rule.body),
        atRules: rule.atRules
    }))
);
const globalRules: SrcRule[] = ['html-reset', 'scrollbar', 'animations', 'variables'].flatMap(
    file =>
        extractRules(readCss(GLASS_SRC, `global/${file}.css`)).map(rule => ({
            file: `global/${file}.css`,
            selector: rule.selector,
            declarations: parseDeclarations(rule.body),
            atRules: rule.atRules
        }))
);
const allSrcRules = [...srcRules, ...globalRules];

const backdropRules = allSrcRules.filter(rule =>
    rule.declarations.some(declaration => declaration.prop === 'backdrop-filter')
);
const EXPECTED_GLASS_CLASSES = [
    '.nue-dialog',
    '.nue-drawer',
    '.nue-dropdown',
    '.nue-tooltip',
    '.nue-message-node-inner',
    '.nue-confirm',
    '.nue-prompt'
] as const;

describe('A6–A7 模糊入口（7 个类名、值只来自 --nue-glass-blur、玻璃底可单点退化）', () => {
    it('A6：全 src 中 backdrop-filter 声明 = 7，值全部为 var(--nue-glass-blur)', () => {
        expect(backdropRules.length, 'src backdrop-filter 声明数').toBe(7);
        for (const rule of backdropRules) {
            const declaration = rule.declarations.find(item => item.prop === 'backdrop-filter');
            expect(declaration?.value, `${rule.file} ${rule.selector}`).toBe(
                'var(--nue-glass-blur)'
            );
        }
    });

    it('A6：模糊半径 ≤24px、饱和度 ≤200%（解析 --nue-glass-blur 实算）', () => {
        const blur = store.raw.get('--nue-glass-blur');
        expect(blur).toBeDefined();
        const radius = /blur\(\s*(\d+(?:\.\d+)?)px\s*\)/.exec(blur as string);
        const saturation = /saturate\(\s*(\d+(?:\.\d+)?)%\s*\)/.exec(blur as string);
        expect(radius, '--nue-glass-blur 必须含 blur(Npx)').not.toBeNull();
        expect(saturation, '--nue-glass-blur 必须含 saturate(N%)').not.toBeNull();
        expect(Number(radius?.[1])).toBeLessThanOrEqual(24);
        expect(Number(saturation?.[1])).toBeLessThanOrEqual(200);
    });

    it('A6：全 dist 中 backdrop-filter 声明 = 7（@supports 条件不算声明），overlay / popup-pool / select / date-picker 各 0', () => {
        let count = 0;
        let webkitCount = 0;
        for (const [file, css] of readAllCss(GLASS_DIST)) {
            for (const rule of extractRules(css)) {
                for (const declaration of parseDeclarations(rule.body)) {
                    if (declaration.prop === 'backdrop-filter') {
                        count++;
                        expect(declaration.value, `${file} ${rule.selector}`).toBe(
                            'var(--nue-glass-blur)'
                        );
                    }
                    if (declaration.prop === '-webkit-backdrop-filter') {
                        webkitCount++;
                        expect(declaration.value, `${file} ${rule.selector}`).toBe(
                            'var(--nue-glass-blur)'
                        );
                    }
                }
            }
        }
        expect(count, 'dist backdrop-filter 声明数').toBe(7);
        expect([0, count], '-webkit- 前缀副本必须与主声明同值（0 或 7）').toContain(webkitCount);
        for (const name of ['overlay', 'popup-pool', 'select', 'date-picker']) {
            const css = readCss(GLASS_DIST, `components/${name}.css`);
            const declarations = extractRules(css)
                .flatMap(rule => parseDeclarations(rule.body))
                .filter(
                    declaration =>
                        declaration.prop === 'backdrop-filter' ||
                        declaration.prop === '-webkit-backdrop-filter'
                );
            expect(declarations.length, `${name}.css 不应有 backdrop-filter`).toBe(0);
        }
    });

    it('A7：7 个玻璃类的 background-color ∈ { --nue-glass-bg, --nue-glass-solid }', () => {
        const selectors = backdropRules.map(rule => rule.selector).sort();
        expect(selectors, 'backdrop-filter 只允许出现在 7 个类名上').toEqual(
            [...EXPECTED_GLASS_CLASSES].sort()
        );
        for (const rule of backdropRules) {
            const background = rule.declarations.find(
                declaration => declaration.prop === 'background-color'
            );
            expect(background, `${rule.selector} 缺 background-color`).toBeDefined();
            expect(
                ['var(--nue-glass-bg)', 'var(--nue-glass-solid)'],
                `${rule.selector} 的 background-color`
            ).toContain(background?.value);
        }
    });
});

/* ------------------------------ A8：退化态对比度 ------------------------------ */

describe('A8 退化态对比度重算（玻璃底换 --nue-glass-solid 后全部受影响配对仍需达标）', () => {
    assertPairs(DEGRADED_MATRIX, 'A8 · ');
});

/* ------------------------------ A9：同链 ≤1 ------------------------------ */

describe('A9 同一叠加链 ≤1 层模糊（4 条嵌套覆盖规则）', () => {
    const parents = ['.nue-dialog', '.nue-drawer', '.nue-confirm', '.nue-prompt'] as const;

    it('4 条嵌套覆盖规则存在，且各自含 blur=none + bg=solid', () => {
        const found: string[] = [];
        for (const rule of srcRules) {
            const selectors = splitSelectorList(rule.selector);
            const parent = parents.find(candidate =>
                selectors.includes(`${candidate} .nue-dropdown`)
            );
            if (!parent) continue;
            const declarations = new Map(
                rule.declarations
                    .filter(declaration => declaration.prop.startsWith('--'))
                    .map(declaration => [declaration.prop, declaration.value])
            );
            expect(selectors, `${parent} 的嵌套覆盖必须同时命中 dropdown 与 tooltip`).toContain(
                `${parent} .nue-tooltip`
            );
            expect(declarations.get('--nue-glass-blur'), `${parent} blur`).toBe('none');
            expect(declarations.get('--nue-glass-bg'), `${parent} bg`).toBe(
                'var(--nue-glass-solid)'
            );
            found.push(parent);
        }
        expect(found.sort(), '嵌套覆盖规则数').toEqual([...parents].sort());
    });

    it('全 src 中不存在其它把 --nue-glass-blur 置 none 的组件规则（单点退化不被滥用）', () => {
        const extra = allSrcRules.filter(
            rule =>
                !rule.file.endsWith('variables.css') &&
                rule.declarations.some(
                    declaration =>
                        declaration.prop === '--nue-glass-blur' &&
                        declaration.value.trim() === 'none'
                ) &&
                !parents.some(parent => rule.selector.includes(`${parent} .nue-dropdown`))
        );
        expect(
            extra.map(rule => `${rule.file} ${rule.selector}`),
            '除 4 条嵌套覆盖外不应有别的 blur:none'
        ).toEqual([]);
    });
});

/* ------------------------------ A10：现代语法 ------------------------------ */

describe('A10 现代语法 / will-change 必须为 0（跨行正则）', () => {
    it('src 全量：hsl(from …) / color(from …) / cos / sin / tan / oklch / will-change = 0', () => {
        const css = [
            ...componentCss.values(),
            ...['variables', 'html-reset', 'scrollbar', 'animations'].map(name =>
                readCss(GLASS_SRC, `global/${name}.css`)
            )
        ].join('\n');
        const counts = countModernSyntax(css);
        for (const [label, count] of Object.entries(counts)) {
            expect(count, `src ${label}`).toBe(0);
        }
    });

    it('跨行正则能力自证：单行写法会漏掉的 hsl(\\n from …) 必须被计数', () => {
        const sample = 'color: hsl(\n    from var(--x) h s l\n);';
        expect(countModernSyntax(sample)['hsl(from …)']).toBe(1);
        // 真实对照：shadlike 的 button.css(6) + link.css(7) = 13 处均为跨行写法。
        const shadlikeReference =
            readCss(SHADLIKE_SRC, 'components/button.css') +
            readCss(SHADLIKE_SRC, 'components/link.css');
        expect(
            countModernSyntax(shadlikeReference)['hsl(from …)'],
            'shadlike button + link 的 hsl(from …) 计数（跨行正则应 ≥13）'
        ).toBeGreaterThanOrEqual(13);
    });
});

/* ------------------------------ A11：opacity ------------------------------ */

interface OpacityWhitelistEntry {
    file: string;
    selector: string;
    reason: string;
}

/**
 * A11 白名单：**只**接受「非文本 / 瞬态 / 隐藏」三类。
 * `.disabled` / `--disabled` / `--loading` 由选择器规则自动放行（1.4.3 禁用态豁免）。
 * 任何新增的文本 opacity < 1 都不在此表 → 直接红。
 */
const OPACITY_WHITELIST: OpacityWhitelistEntry[] = [
    {
        file: 'components/message.css',
        selector: '.nue-message-node-inner',
        reason: '未 push 时隐藏（瞬态，--push 时 opacity: 1）'
    },
    {
        file: 'components/collapse.css',
        selector: '.nue-collapse-item__content',
        reason: '折叠收起时隐藏（瞬态）'
    },
    {
        file: 'components/icon.css',
        selector: '.icon-blank::before',
        reason: '空白图标占位（非文本）'
    },
    {
        file: 'components/infinite-scroll.css',
        selector: '.nue-infinite-scroll__trigger-bar',
        reason: '不可见命中区（非文本）'
    },
    {
        file: 'components/marquee.css',
        selector: '.nue-marquee__track',
        reason: '走马灯轨道（非文本容器，关键帧内由 0 → 1 接管）'
    },
    {
        file: 'components/table.css',
        selector: '.nue-table__sort-icon',
        reason: '排序图标（非文本图形）'
    },
    {
        file: 'components/textarea.css',
        selector: '.nue-textarea__backend-textarea',
        reason: '隐藏镜像 textarea（不可见）'
    },
    {
        file: 'components/scroll-bar.css',
        selector: '.nue-scroll-bar__track',
        reason: '滚动条 0/1 瞬态（非文本）'
    }
];

const DISABLED_SELECTOR_PATTERN = /\.disabled\b|--disabled\b|--loading\b/;

interface OpacityViolation {
    file: string;
    selector: string;
    value: string;
}

function scanOpacityViolations(): { violations: OpacityViolation[]; matched: Set<string> } {
    const violations: OpacityViolation[] = [];
    const matched = new Set<string>();
    const scan = (file: string, css: string) => {
        for (const rule of extractRules(css)) {
            for (const declaration of parseDeclarations(rule.body)) {
                if (declaration.prop !== 'opacity') continue;
                const literal = parseOpacityLiteral(declaration.value);
                if (literal !== null && literal >= 1) continue;
                if (rule.atRules.some(atRule => atRule.startsWith('@keyframes'))) continue;
                if (DISABLED_SELECTOR_PATTERN.test(rule.selector)) continue;
                const entry = OPACITY_WHITELIST.find(
                    candidate =>
                        candidate.file === file && rule.selector.includes(candidate.selector)
                );
                if (entry) {
                    matched.add(`${entry.file}::${entry.selector}`);
                    continue;
                }
                violations.push({
                    file,
                    selector: rule.selector,
                    value: declaration.value
                });
            }
        }
    };
    for (const [file, css] of componentCss) scan(`components/${file}.css`, css);
    for (const name of ['variables', 'html-reset', 'scrollbar', 'animations']) {
        scan(`global/${name}.css`, readCss(GLASS_SRC, `global/${name}.css`));
    }
    return { violations, matched };
}

describe('A11 文本链路 opacity（白名单外一律红；解析到 opacity 必须合成后再比）', () => {
    const { violations, matched } = scanOpacityViolations();

    it('白名单外的 opacity < 1 命中数 = 0', () => {
        expect(
            violations.map(item => `${item.file} ${item.selector} { opacity: ${item.value} }`),
            'A11：文本链路上的 opacity < 1 只允许 .disabled/--disabled/--loading、瞬态 keyframes 与白名单中的非文本/隐藏项'
        ).toEqual([]);
    });

    it('白名单 8 项全部命中实际声明（防止白名单过期后变相放行）', () => {
        expect([...matched].sort()).toEqual(
            OPACITY_WHITELIST.map(entry => `${entry.file}::${entry.selector}`).sort()
        );
    });

    it('textarea ::placeholder 的 opacity 必须为 1（F2 回归：0.36 会让 8.94 变 2.44）', () => {
        const raw = ruleProperty(cssOf('textarea'), '&::placeholder', 'opacity');
        expect(raw, 'textarea ::placeholder 必须显式写 opacity: 1').toBe('1');
        expect(textareaPlaceholderOpacity).toBe(1);
    });

    it('input ::placeholder 不得引入 opacity 弱化（无声明 = 1）', () => {
        expect(ruleProperty(cssOf('input'), '&::placeholder', 'opacity')).toBeUndefined();
    });

    it('textarea placeholder 合成后对玻璃两端 ≥4.5（不是用声明色直接比）', () => {
        for (const dark of MODES) {
            const color = resolveColor(
                ruleProperty(cssOf('textarea'), '&::placeholder', 'color')!,
                dark,
                store,
                ruleCustomProps(cssOf('textarea'), '.nue-textarea')
            ).rgb;
            for (const surface of glassSurfaces(dark, store)) {
                const composited = applyOpacity(color, textareaPlaceholderOpacity, surface.color);
                const ratio = contrastRatio(composited, surface.color);
                expect(
                    ratio,
                    `textarea placeholder（${modeLabel(dark)} · ${surface.label}）合成后 ${formatRatio(
                        ratio
                    )}`
                ).toBeGreaterThanOrEqual(4.5);
            }
        }
    });
});

/* ------------------------------ 对比度矩阵 ------------------------------ */

describe('AC-08 / AC-09 玻璃面对比度矩阵（从 token 实算，无快照）', () => {
    it('矩阵规模 ≥130 组', () => {
        expect(MATRIX.length, `实际配对 ${MATRIX.length} 组`).toBeGreaterThanOrEqual(130);
    });

    assertPairs(MATRIX, '');
});

/* ------------------------------ 变量完整性（A6/A10 的配套） ------------------------------ */

describe('AC-10 / AC-12 变量引用完整性（悬空 = 0）', () => {
    it('全 src 引用未定义 = 0（shadlike 的 2 处悬空不得继承）', () => {
        const allCss = [
            ...componentCss.values(),
            ...['variables', 'html-reset', 'scrollbar', 'animations'].map(name =>
                readCss(GLASS_SRC, `global/${name}.css`)
            )
        ].join('\n');
        const defined = new Set(collectDefinitions(allCss));
        const dangling = collectReferences(allCss).filter(name => !defined.has(name));
        expect(dangling.sort(), '引用但未定义的自定义属性').toEqual([]);
    });

    it('--nue-glass-* 只允许 6 个基元（bg/blur/border/solid/scrim/shadow）', () => {
        const allCss = [...componentCss.values(), readCss(GLASS_SRC, 'global/variables.css')].join(
            '\n'
        );
        const glassNames = collectDefinitions(allCss)
            .filter(name => name.startsWith('--nue-glass-'))
            .sort();
        expect(glassNames).toEqual([
            '--nue-glass-bg',
            '--nue-glass-blur',
            '--nue-glass-border',
            '--nue-glass-scrim',
            '--nue-glass-shadow',
            '--nue-glass-solid'
        ]);
    });
});

/* ------------------------------ 退化态数值兜底 ------------------------------ */

describe('退化态 token 数值（A3/A4 的实算补充）', () => {
    it('退化后玻璃底为不透明实底，且双模式 alpha 均为 1', () => {
        for (const dark of MODES) {
            const solid = resolveColorFromName('--nue-glass-solid', dark, store);
            expect(solid.alpha, `${modeLabel(dark)} --nue-glass-solid alpha`).toBe(1);
            const border = resolveColorFromName('--nue-border-color', dark, store);
            expect(border.alpha, `${modeLabel(dark)} --nue-border-color alpha`).toBe(1);
        }
    });

    it('退化块的 border 值与基值边框一致（装饰高光在退化时让位于功能性边框）', () => {
        for (const block of foundDegradationBlocks) {
            const overrides = degradationOverrides(block.matches[0]!);
            const degradedBorder = overrides.get('--nue-glass-border');
            expect(degradedBorder).toBe('var(--nue-border-color)');
            expect(ruleProperty(cssOf('input'), '.nue-input', 'border')).toContain(
                'var(--nue-input-border-color)'
            );
        }
    });
});

/* 让 `findRules` 参与类型检查（同时验证 7 个玻璃类在源码里各自只有一条主规则）。 */
describe('玻璃类规则唯一性（防止同一类名写两条 blur）', () => {
    it('每个玻璃类名的 backdrop-filter 仅 1 处', () => {
        for (const selector of EXPECTED_GLASS_CLASSES) {
            const count = allSrcRules.filter(
                rule =>
                    rule.selector === selector &&
                    rule.declarations.some(declaration => declaration.prop === 'backdrop-filter')
            ).length;
            expect(count, `${selector} 的 backdrop-filter 声明数`).toBe(1);
        }
        expect(findRules(cssOf('overlay'), '.nue-overlay').length).toBeGreaterThan(0);
        // 变量解析器覆盖百分比 calc（A5 只查位置，这里补一个行为断言）
        expect(resolvePercent('calc(30% + var(--nue-dark-switch) * 45%)', 1, store)).toBe(75);
    });
});