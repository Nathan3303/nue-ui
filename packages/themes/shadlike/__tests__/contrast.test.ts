/**
 * 主题语义色对比度「防退化自检」。
 *
 * 判据（WCAG 2.1）：
 * - 正文/图标等文本：对比度 ≥ 4.5:1（1.4.3 AA）
 * - 边框/图形等非文本：对比度 ≥ 3:1（1.4.11 AA）
 *
 * 实现方式：直接解析主题源码 `src/global/variables.css` 的令牌定义与
 * `src/components/message.css` 的映射，再按 `--nue-dark-switch` 的 0/1 两套阶梯
 * 实算对比度。**不做期望值快照**——任何把映射改回低对比色阶、或改动共享色阶
 * 导致配对比度下降的行为都会让本测试失败。
 *
 * 注意：本文件只覆盖 `message.css`（本次修复范围）。其余组件若存在不达标配对，
 * 需要先修复再纳入，否则本自检无法保持常绿。
 */
import { describe, it, expect } from 'vite-plus/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type RGB = [number, number, number];
type DarkSwitch = 0 | 1;

// vitest 的 root 固定为仓库根目录（见根 vitest.config.ts）。
const srcDir = resolve(process.cwd(), 'packages/themes/shadlike/src');
const variablesCss = readFileSync(`${srcDir}/global/variables.css`, 'utf8');
const messageCss = readFileSync(`${srcDir}/components/message.css`, 'utf8');

/* ------------------------------ 颜色计算 ------------------------------ */

function hslToRgb(hue: number, saturation: number, lightness: number): RGB {
    const h = ((hue % 360) + 360) % 360;
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let rgb: RGB;
    if (h < 60) rgb = [c, x, 0];
    else if (h < 120) rgb = [x, c, 0];
    else if (h < 180) rgb = [0, c, x];
    else if (h < 240) rgb = [0, x, c];
    else if (h < 300) rgb = [x, 0, c];
    else rgb = [c, 0, x];
    return rgb.map(channel => Math.round((channel + m) * 255)) as RGB;
}

function relativeLuminance([r, g, b]: RGB): number {
    const channel = (value: number) => {
        const v = value / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(a: RGB, b: RGB): number {
    const first = relativeLuminance(a);
    const second = relativeLuminance(b);
    const hi = Math.max(first, second);
    const lo = Math.min(first, second);
    return (hi + 0.05) / (lo + 0.05);
}

/* ------------------------------ CSS 解析 ------------------------------ */

interface CssRule {
    selector: string;
    body: string;
}

function stripComments(css: string): string {
    return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/** 提取顶层规则（按花括号配平，忽略规则内部嵌套）。 */
function extractRules(css: string): CssRule[] {
    const source = stripComments(css);
    const rules: CssRule[] = [];
    let depth = 0;
    let selectorStart = 0;
    let bodyStart = 0;
    for (let i = 0; i < source.length; i++) {
        const char = source.charAt(i);
        if (char === '{') {
            if (depth === 0) bodyStart = i + 1;
            depth++;
        } else if (char === '}') {
            depth--;
            if (depth === 0) {
                rules.push({
                    selector: source.slice(selectorStart, bodyStart - 1).trim(),
                    body: source.slice(bodyStart, i)
                });
                selectorStart = i + 1;
            }
        }
    }
    return rules;
}

/** 只取规则体开头的自定义属性声明，忽略其后的嵌套规则。 */
function parseDeclarations(body: string): Map<string, string> {
    const declarations = new Map<string, string>();
    const flat = body.split('{')[0] ?? '';
    const pattern = /--([\w-]+)\s*:\s*([^;]+)/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(flat)) !== null) {
        const [, name, value] = match;
        if (name && value) declarations.set(name, value.trim());
    }
    return declarations;
}

const variableTokens = parseDeclarations(
    extractRules(variablesCss)
        .map(rule => rule.body)
        .join('\n')
);

/* ------------------------------ 令牌求值 ------------------------------ */

function varName(expression: string): string {
    const match = expression.trim().match(/^var\(--([\w-]+)\)$/);
    if (!match || !match[1]) throw new Error(`期望 var() 引用，实际为：${expression}`);
    return match[1];
}

function readToken(name: string): string {
    const value = variableTokens.get(name);
    if (value === undefined) throw new Error(`variables.css 中找不到令牌 --${name}`);
    return value;
}

/** 求值百分比：支持 `50%`、`var(--x)`、`calc(A% ± var(--nue-dark-switch) * B%)`。 */
function resolvePercent(expression: string, dark: DarkSwitch): number {
    const value = expression.trim();
    if (value.startsWith('var(')) return resolvePercent(readToken(varName(value)), dark);
    const calc = value.match(
        /^calc\(\s*(-?[\d.]+)%\s*([+-])\s*var\(--nue-dark-switch\)\s*\*\s*(-?[\d.]+)%\s*\)$/
    );
    if (calc) {
        const [, base, operator, delta] = calc;
        return Number(base) + (operator === '+' ? 1 : -1) * dark * Number(delta);
    }
    const plain = value.match(/^(-?[\d.]+)%$/);
    if (plain) return Number(plain[1]);
    throw new Error(`无法求值的百分比表达式：${expression}`);
}

function resolveNumber(expression: string): number {
    const value = expression.trim();
    if (value.startsWith('var(')) return resolveNumber(readToken(varName(value)));
    const parsed = Number(value);
    if (Number.isNaN(parsed)) throw new Error(`无法求值的数值表达式：${expression}`);
    return parsed;
}

function resolveColorToken(name: string, dark: DarkSwitch): RGB {
    const value = readToken(name);
    if (value.startsWith('var(')) return resolveColorToken(varName(value), dark);
    const hsl = value.match(/^hsl\(\s*(.+?)\s*,\s*(.+?)\s*,\s*(.+?)\s*\)$/);
    const [, hue, saturation, lightness] = hsl ?? [];
    if (!hue || !saturation || !lightness) {
        throw new Error(`令牌 --${name} 不是可解析的 hsl() 颜色：${value}`);
    }
    return hslToRgb(
        resolveNumber(hue),
        resolvePercent(saturation, dark),
        resolvePercent(lightness, dark)
    );
}

/* ------------------------------ 断言数据 ------------------------------ */

const VARIANTS = ['success', 'warning', 'error', 'info', 'log'] as const;

const messageRules = extractRules(messageCss);
const baseRule = messageRules.find(rule => rule.selector === '.nue-message-node-inner');
if (!baseRule) throw new Error('message.css 中找不到 .nue-message-node-inner 基础规则');
const baseDeclarations = parseDeclarations(baseRule.body);

interface VariantColors {
    text: RGB;
    background: RGB;
    border: RGB;
}

function resolveVariant(variant: (typeof VARIANTS)[number], dark: DarkSwitch): VariantColors {
    const selector = `.nue-message-node-inner.nue-message-node-inner--${variant}`;
    const rule = messageRules.find(item => item.selector === selector);
    if (!rule) throw new Error(`message.css 中找不到变体规则 ${selector}`);
    const declarations = new Map([...baseDeclarations, ...parseDeclarations(rule.body)]);
    const token = (suffix: string) => {
        const value = declarations.get(`nue-message-node-inner-${suffix}`);
        if (value === undefined)
            throw new Error(`变体 ${variant} 缺少 --nue-message-node-inner-${suffix}`);
        return varName(value);
    };
    return {
        text: resolveColorToken(token('color'), dark),
        background: resolveColorToken(token('background-color'), dark),
        border: resolveColorToken(token('border-color'), dark)
    };
}

/* ------------------------------ 用例 ------------------------------ */

describe('主题语义色对比度自检', () => {
    describe('NueMessage 变体（解析 message.css 实算）', () => {
        for (const variant of VARIANTS) {
            for (const dark of [0, 1] as const) {
                const mode = dark === 0 ? '浅色' : '深色';
                it(`${variant} 在${mode}下文字 ≥4.5:1 且边框 ≥3:1`, () => {
                    const { text, background, border } = resolveVariant(variant, dark);
                    const textRatio = contrastRatio(text, background);
                    const borderRatio = contrastRatio(border, background);
                    expect(
                        textRatio,
                        `${variant}(${mode}) 文字对比度 ${textRatio.toFixed(2)}:1 < 4.5:1`
                    ).toBeGreaterThanOrEqual(4.5);
                    expect(
                        borderRatio,
                        `${variant}(${mode}) 边框对比度 ${borderRatio.toFixed(2)}:1 < 3:1`
                    ).toBeGreaterThanOrEqual(3);
                });
            }
        }
    });
});