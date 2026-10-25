/**
 * Glass 主题门禁测试的 CSS 解析 / 颜色求值helper。
 *
 * 设计约束（见 docs/reports/2026-10-25-T75-arch.md §3.4）：
 * - 只解析本项目实际使用的语法子集：`var()` 链、`hsl(h, s, l[, a])`、
 *   `calc(A% ± var(--nue-dark-switch) * B%)`、纯数字/百分比、`#rgb/#rrggbb`。
 * - 遇到 `hsl(from …)` / `color(from …)` 等相对颜色语法 **直接抛错**：
 *   glass 的规则 1 禁止这类语法，解析器能力与实现约束互为看守。
 * - 对比度公式与 shadlike `__tests__/contrast.test.ts` 逐字同构（WCAG 2.1），
 *   但**不抽公共包**（抽包要改 shadlike 测试，越 N3 边界）。
 *
 * 解析器刻意**不依赖单行正则**：`hsl(` 与 `from` 之间可能换行（shadlike 的
 * button.css 6 处 + link.css 7 处就是这样），凡是判现代语法的正则都必须跨行。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

/* ------------------------------ 路径锚点 ------------------------------ */

// vitest 的 root 固定为仓库根目录（见根 vitest.config.ts）。
export const REPO_ROOT = process.cwd();
export const GLASS_DIR = resolve(REPO_ROOT, 'packages/themes/glass');
export const GLASS_SRC = resolve(GLASS_DIR, 'src');
export const GLASS_DIST = resolve(GLASS_DIR, 'dist');
export const SHADLIKE_SRC = resolve(REPO_ROOT, 'packages/themes/shadlike/src');

/** 递归列出目录下所有 `.css` 文件（含子目录）。 */
export function listCssFiles(dir: string): string[] {
    const entries = readdirSync(dir, { withFileTypes: true });
    return entries
        .flatMap(entry => {
            const path = join(dir, entry.name);
            return entry.isDirectory() ? listCssFiles(path) : path.endsWith('.css') ? [path] : [];
        })
        .sort();
}

export function readCss(dir: string, file: string): string {
    return readFileSync(resolve(dir, file), 'utf8');
}

/** 门禁测试要读 `dist/`：缺失时给出可执行的构建命令，而不是 ENOENT。 */
export function ensureDistBuilt(): void {
    try {
        readdirSync(GLASS_DIST);
    } catch {
        throw new Error(
            'glass dist/ 不存在：先执行 `pnpm --filter nue-ui-theme-glass build`（AC-05 / AC-15 门禁读取 dist）'
        );
    }
}

export function readAllCss(dir: string): Map<string, string> {
    return new Map(
        listCssFiles(dir).map(path => [relative(dir, path), readFileSync(path, 'utf8')])
    );
}

/* ------------------------------ CSS 结构 ------------------------------ */

export interface CssBlock {
    /** 花括号前的文本（选择器或 at-rule 条件）。 */
    prelude: string;
    /** 花括号内部文本。 */
    body: string;
    /** prelude 在原字符串中的起点。 */
    start: number;
    /** 左花括号在原字符串中的下标。 */
    bodyStart: number;
    /** 右花括号在原字符串中的下标。 */
    bodyEnd: number;
}

export interface FlatRule {
    /** 去掉嵌套前导组合符后的选择器；at-rule 不产出规则。 */
    selector: string;
    body: string;
    start: number;
    /** 祖先 at-rule 条件（由外到内），用于识别 `@keyframes` 内的瞬态规则。 */
    atRules: string[];
}

export function stripComments(css: string): string {
    return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/** 扫出同一层的花括号块（按花括号配平，忽略引号内的花括号——玻璃主题不用字符串花括号）。 */
export function extractBlocks(source: string): CssBlock[] {
    const blocks: CssBlock[] = [];
    let depth = 0;
    let preludeStart = 0;
    let bodyStart = 0;
    for (let i = 0; i < source.length; i++) {
        const char = source.charAt(i);
        if (char === '{') {
            if (depth === 0) bodyStart = i + 1;
            depth++;
        } else if (char === '}') {
            depth--;
            if (depth === 0) {
                blocks.push({
                    prelude: source.slice(preludeStart, bodyStart - 1),
                    body: source.slice(bodyStart, i),
                    start: preludeStart,
                    bodyStart,
                    bodyEnd: i
                });
                preludeStart = i + 1;
            }
        } else if (char === ';' && depth === 0) {
            // 顶层的 @import / @charset 等无块语句：跳过。
            preludeStart = i + 1;
        }
    }
    return blocks;
}

export function normalizeSelector(selector: string): string {
    return selector
        .trim()
        .replace(/^[>+~]\s*/, '')
        .replace(/\s+/g, ' ');
}

/** 把逗号选择器列表拆成单个选择器（`a, b` → `['a', 'b']`，括号内逗号不拆）。 */
export function splitSelectorList(selector: string): string[] {
    return splitTopLevel(selector, ',').map(normalizeSelector);
}

function isAtRule(prelude: string): boolean {
    return prelude.trim().startsWith('@');
}

/** 递归展开所有规则（含 at-rule 内部、嵌套规则），selector 保留原始层级文本。 */
export function extractRules(css: string): FlatRule[] {
    const source = stripComments(css);
    const rules: FlatRule[] = [];
    const walk = (text: string, offset: number, atRules: string[]) => {
        for (const block of extractBlocks(text)) {
            const prelude = block.prelude.trim().replace(/\s+/g, ' ');
            if (isAtRule(prelude)) {
                walk(block.body, offset + block.bodyStart, [...atRules, prelude]);
            } else {
                rules.push({
                    selector: normalizeSelector(prelude),
                    body: block.body,
                    start: offset + block.start,
                    atRules
                });
                walk(block.body, offset + block.bodyStart, atRules);
            }
        }
    };
    walk(source, 0, []);
    return rules;
}

export interface Declaration {
    prop: string;
    value: string;
    /** 声明在原字符串中的起点。 */
    start: number;
}

/** 只解析块内**顶层**声明（遇到嵌套 `{` 即停止），返回 `prop: value`。 */
export function parseDeclarations(body: string, offset = 0): Declaration[] {
    const declarations: Declaration[] = [];
    let depth = 0;
    let segmentStart = 0;
    const flush = (end: number) => {
        const segment = body.slice(segmentStart, end);
        const colon = segment.indexOf(':');
        if (colon > 0 && !segment.includes('{')) {
            const prop = segment.slice(0, colon).trim();
            const value = segment.slice(colon + 1).trim();
            if (prop) declarations.push({ prop, value, start: offset + segmentStart });
        }
    };
    for (let i = 0; i < body.length; i++) {
        const char = body.charAt(i);
        if (char === '{') depth++;
        else if (char === '}') depth--;
        else if (char === ';' && depth === 0) {
            flush(i);
            segmentStart = i + 1;
        }
    }
    flush(body.length);
    return declarations;
}

/** 某条规则（同名规则可能多条）内所有顶层声明。 */
export function ruleDeclarations(css: string, selector: string): Declaration[] {
    const normalized = normalizeSelector(selector);
    return extractRules(css)
        .filter(rule => rule.selector === normalized)
        .flatMap(rule => parseDeclarations(rule.body, rule.start));
}

export function findRules(css: string, selector: string): FlatRule[] {
    const normalized = normalizeSelector(selector);
    return extractRules(css).filter(rule => rule.selector === normalized);
}

/** 取规则的顶层自定义属性（同名规则合并，后者覆盖前者）。 */
export function ruleCustomProps(css: string, ...selectors: string[]): Map<string, string> {
    const props = new Map<string, string>();
    for (const selector of selectors) {
        for (const declaration of ruleDeclarations(css, selector)) {
            if (declaration.prop.startsWith('--')) props.set(declaration.prop, declaration.value);
        }
    }
    return props;
}

/** 取某条规则里某个普通属性（如 `background-color` / `color` / `backdrop-filter`）。 */
export function ruleProperty(css: string, selector: string, prop: string): string | undefined {
    const declarations = ruleDeclarations(css, selector).filter(item => item.prop === prop);
    return declarations.at(-1)?.value;
}

/* ------------------------------ 令牌收集 ------------------------------ */

const DEFINITION_PATTERN = /(?:^|[\s;{])(--[\w-]+)\s*:/g;
const REFERENCE_PATTERN = /var\(\s*(--[\w-]+)/g;

/**
 * 全量定义名（`--nue-` 前缀，与 arch §二 的口径一致）。
 * 只认 `--nue-*`：breadcrumb/input 的 `--icon-size` 等非契约名不计入 424。
 */
export function collectDefinitions(css: string): string[] {
    const names = new Set<string>();
    for (const match of stripComments(css).matchAll(DEFINITION_PATTERN)) {
        const name = match[1];
        if (name?.startsWith('--nue-')) names.add(name);
    }
    return [...names];
}

/** 全量 `var()` 引用名（含 `var(--x, fallback)` 的首参）。 */
export function collectReferences(css: string): string[] {
    const names = new Set<string>();
    for (const match of stripComments(css).matchAll(REFERENCE_PATTERN)) {
        const name = match[1];
        if (name) names.add(name);
    }
    return [...names];
}

export interface TokenStore {
    raw: Map<string, string>;
}

/** 只取 `global/variables.css` 中最先出现的 `:root` 基值（退化块里的覆写不覆盖基值）。 */
export function loadTokenStore(): TokenStore {
    const css = readCss(GLASS_SRC, 'global/variables.css');
    const raw = new Map<string, string>();
    for (const rule of extractRules(css)) {
        if (rule.selector !== ':root') continue;
        for (const declaration of parseDeclarations(rule.body)) {
            if (declaration.prop.startsWith('--') && !raw.has(declaration.prop)) {
                raw.set(declaration.prop, declaration.value);
            }
        }
    }
    return { raw };
}

/* ------------------------------ 表达式求值 ------------------------------ */

export type DarkSwitch = 0 | 1;

export interface Numeric {
    value: number;
    /** `'%'` / `'px'` / `'rem'` / `''` 等；颜色求值只用到 `%` 与空单位。 */
    unit: string;
}

export type Lookup = (name: string) => string;

function makeLookup(dark: number, store: TokenStore, scope?: Map<string, string>): Lookup {
    return (name: string) => {
        if (name === '--nue-dark-switch') return String(dark);
        const scoped = scope?.get(name);
        if (scoped !== undefined) return scoped;
        const global = store.raw.get(name);
        if (global === undefined) throw new Error(`找不到令牌 ${name}`);
        return global;
    };
}

/**
 * 求值数值表达式，支持：
 * `calc(30% + var(--nue-dark-switch) * 45%)`、`calc(var(--nue-dark-prefix) * 10)`、
 * 纯数字 / 百分比、`var()` 链。
 */
export function resolveNumeric(
    expression: string,
    dark: number,
    store: TokenStore,
    scope?: Map<string, string>
): Numeric {
    const lookup = makeLookup(dark, store, scope);
    let index = 0;
    const input = expression.trim();
    const skip = () => {
        while (index < input.length && /\s/.test(input.charAt(index))) index++;
    };
    const parseExpression = (): Numeric => {
        let left = parseProduct();
        skip();
        while (input.charAt(index) === '+' || input.charAt(index) === '-') {
            const operator = input.charAt(index++);
            const right = parseProduct();
            if (left.unit !== right.unit) {
                throw new Error(
                    `单位不一致：${left.unit} ${operator} ${right.unit}（${expression}）`
                );
            }
            left = {
                value: operator === '+' ? left.value + right.value : left.value - right.value,
                unit: left.unit
            };
            skip();
        }
        return left;
    };
    const parseProduct = (): Numeric => {
        let left = parseAtom();
        skip();
        while (input.charAt(index) === '*' || input.charAt(index) === '/') {
            const operator = input.charAt(index++);
            const right = parseAtom();
            if (operator === '*') {
                if (left.unit !== '' && right.unit !== '') {
                    throw new Error(`不支持带单位相乘（${expression}）`);
                }
                left = {
                    value: left.value * right.value,
                    unit: left.unit || right.unit
                };
            } else {
                if (right.unit !== '') throw new Error(`除数不能带单位（${expression}）`);
                left = { value: left.value / right.value, unit: left.unit };
            }
            skip();
        }
        return left;
    };
    const parseAtom = (): Numeric => {
        skip();
        if (input.startsWith('calc(', index)) {
            index += 'calc('.length;
            const value = parseExpression();
            skip();
            if (input.charAt(index) !== ')') throw new Error(`calc 括号未闭合：${expression}`);
            index++;
            return value;
        }
        if (input.startsWith('var(', index)) {
            index += 'var('.length;
            skip();
            const nameMatch = /^(--[\w-]+)/.exec(input.slice(index));
            if (!nameMatch?.[1]) throw new Error(`var() 缺少变量名：${expression}`);
            const name = nameMatch[1];
            index += name.length;
            skip();
            if (input.charAt(index) === ',') {
                // fallback：仅当变量未定义时才生效；此处直接跳过 fallback。
                let depth = 0;
                while (index < input.length) {
                    const char = input.charAt(index);
                    if (char === '(') depth++;
                    if (char === ')') {
                        if (depth === 0) break;
                        depth--;
                    }
                    index++;
                }
            }
            skip();
            if (input.charAt(index) !== ')') throw new Error(`var() 括号未闭合：${expression}`);
            index++;
            return resolveNumeric(lookup(name), dark, store, scope);
        }
        if (input.charAt(index) === '(') {
            index++;
            const value = parseExpression();
            skip();
            if (input.charAt(index) !== ')') throw new Error(`括号未闭合：${expression}`);
            index++;
            return value;
        }
        const unary = input.charAt(index) === '-' ? -1 : 1;
        if (unary === -1) index++;
        const numberMatch = /^(?:\d+\.?\d*|\.\d+)(%|px|rem|ms|s)?/.exec(input.slice(index));
        if (!numberMatch) throw new Error(`无法求值的表达式：${expression}（位置 ${index}）`);
        index += numberMatch[0].length;
        return {
            value: unary * Number.parseFloat(numberMatch[0]),
            unit: numberMatch[1] ?? ''
        };
    };
    const result = parseExpression();
    skip();
    if (index !== input.length) throw new Error(`表达式有残留：${expression}（位置 ${index}）`);
    return result;
}

export function resolveNumber(
    expression: string,
    dark: number,
    store: TokenStore,
    scope?: Map<string, string>
): number {
    const result = resolveNumeric(expression, dark, store, scope);
    if (result.unit !== '') throw new Error(`期望无单位数值，实际 ${expression}`);
    return result.value;
}

export function resolvePercent(
    expression: string,
    dark: number,
    store: TokenStore,
    scope?: Map<string, string>
): number {
    const result = resolveNumeric(expression, dark, store, scope);
    if (result.unit !== '%') throw new Error(`期望百分比，实际 ${expression}`);
    return result.value;
}

/* ------------------------------ 颜色求值 ------------------------------ */

export type RGB = [number, number, number];
export interface RGBA {
    rgb: RGB;
    alpha: number;
}

export function hslToRgb(hue: number, saturation: number, lightness: number): RGB {
    const h = ((hue % 360) + 360) % 360;
    const s = saturation;
    const l = lightness;
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

export function relativeLuminance([r, g, b]: RGB): number {
    const channel = (value: number) => {
        const v = value / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: RGB, b: RGB): number {
    const first = relativeLuminance(a);
    const second = relativeLuminance(b);
    const hi = Math.max(first, second);
    const lo = Math.min(first, second);
    return (hi + 0.05) / (lo + 0.05);
}

/** 把带 alpha 的前景叠到底色上（source-over，先取整到 0–255）。 */
export function blend(fg: RGB, bg: RGB, alpha: number): RGB {
    return fg.map((channel, i) =>
        Math.round(channel * alpha + (bg[i] as number) * (1 - alpha))
    ) as RGB;
}

/** 半透明颜色叠到不透明底色。 */
export function compositeColor(fg: RGBA, backdrop: RGB): RGB {
    return blend(fg.rgb, backdrop, fg.alpha);
}

/** 文本链路 `opacity < 1` 的合成：`color × opacity` 叠到底色（A11 口径）。 */
export function applyOpacity(color: RGB, opacity: number, backdrop: RGB): RGB {
    if (opacity >= 1) return color;
    return blend(color, backdrop, opacity);
}

/** 按逗号切分（忽略括号内的逗号）。 */
export function splitTopLevel(input: string, separator = ','): string[] {
    const parts: string[] = [];
    let depth = 0;
    let start = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        if (char === '(') depth++;
        else if (char === ')') depth--;
        else if (char === separator && depth === 0) {
            parts.push(input.slice(start, i));
            start = i + 1;
        }
    }
    parts.push(input.slice(start));
    return parts.map(part => part.trim()).filter(part => part.length > 0);
}

function extractVarName(expression: string): string {
    const match = /^var\(\s*(--[\w-]+)/.exec(expression.trim());
    if (!match?.[1]) throw new Error(`期望 var() 引用，实际：${expression}`);
    return match[1];
}

function parseHex(value: string): RGBA {
    const hex = value.slice(1);
    const expand = (text: string) => (text.length === 1 ? text + text : text);
    if (hex.length === 3 || hex.length === 4) {
        const [r, g, b, a] = hex.split('').map(expand);
        return {
            rgb: [Number.parseInt(r!, 16), Number.parseInt(g!, 16), Number.parseInt(b!, 16)],
            alpha: a ? Number.parseInt(a, 16) / 255 : 1
        };
    }
    if (hex.length === 6 || hex.length === 8) {
        return {
            rgb: [
                Number.parseInt(hex.slice(0, 2), 16),
                Number.parseInt(hex.slice(2, 4), 16),
                Number.parseInt(hex.slice(4, 6), 16)
            ],
            alpha: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1
        };
    }
    throw new Error(`无法解析的十六进制颜色：${value}`);
}

function parseHslArguments(inner: string): string[] {
    if (inner.includes(',')) return splitTopLevel(inner, ',');
    const slash = splitTopLevel(inner, '/');
    const channels = slash[0]?.split(/\s+/).filter(Boolean) ?? [];
    if (slash[1]) channels.push(slash[1]);
    return channels;
}

/**
 * 把颜色表达式求值成 RGBA。
 * 支持 `var()` 链、`hsl(h, s%, l%[, a])`（逗号或空格语法）、`#rgb/#rrggbb[aa]`。
 */
export function resolveColor(
    expression: string,
    dark: number,
    store: TokenStore,
    scope?: Map<string, string>
): RGBA {
    const raw = expression.replace(/!important\s*$/, '').trim();
    if (/^(hsl|color)\(\s*from/i.test(raw)) {
        throw new Error(`glass 禁止相对颜色语法：${raw}`);
    }
    if (raw.startsWith('var(')) {
        return resolveColorFromName(extractVarName(raw), dark, store, scope);
    }
    if (raw === 'transparent') {
        return { rgb: [0, 0, 0], alpha: 0 };
    }
    if (raw.startsWith('#')) return parseHex(raw);
    if (raw.startsWith('hsl(')) {
        const inner = raw.slice(4, raw.lastIndexOf(')'));
        const args = parseHslArguments(inner);
        if (args.length < 3) throw new Error(`hsl() 参数不足：${raw}`);
        const hue = resolveNumber(args[0] as string, dark, store, scope);
        const saturation = resolvePercent(args[1] as string, dark, store, scope) / 100;
        const lightness = resolvePercent(args[2] as string, dark, store, scope) / 100;
        const alphaExpression = args[3];
        const alpha =
            alphaExpression === undefined
                ? 1
                : (() => {
                      const resolved = resolveNumeric(alphaExpression, dark, store, scope);
                      return resolved.unit === '%' ? resolved.value / 100 : resolved.value;
                  })();
        return { rgb: hslToRgb(hue, saturation, lightness), alpha };
    }
    throw new Error(`无法解析的颜色表达式：${raw}`);
}

export function resolveColorFromName(
    name: string,
    dark: number,
    store: TokenStore,
    scope?: Map<string, string>
): RGBA {
    const value = scope?.get(name) ?? store.raw.get(name);
    if (value === undefined) throw new Error(`找不到颜色令牌 ${name}`);
    return resolveColor(value, dark, store, scope);
}

/* ------------------------------ 玻璃表面 ------------------------------ */

export const WHITE: RGB = [255, 255, 255];
export const BLACK: RGB = [0, 0, 0];

/** 玻璃底 `--nue-glass-bg` 叠到纯白 / 纯黑两种极端背景上（AC-09 口径）。 */
export function glassSurfaces(
    dark: number,
    store: TokenStore,
    backgroundToken = '--nue-glass-bg'
): Array<{ label: string; color: RGB; rgba: RGBA }> {
    const rgba = resolveColorFromName(backgroundToken, dark, store);
    return [
        { label: '叠纯白', color: compositeColor(rgba, WHITE), rgba },
        { label: '叠纯黑', color: compositeColor(rgba, BLACK), rgba }
    ];
}

/** 退化态：`--nue-glass-bg` 被 `var(--nue-glass-solid)` 单点覆写后的表面（A8）。 */
export function degradedSurface(dark: number, store: TokenStore): RGB {
    const solid = resolveColorFromName(
        extractVarName(store.raw.get('--nue-glass-solid') ?? ''),
        dark,
        store
    );
    return compositeColor(solid, WHITE);
}

/* ------------------------------ opacity ------------------------------ */

/** 把 `opacity` 声明的值解析成 0–1；`var()`/`unset` 等非字面值返回 null。 */
export function parseOpacityLiteral(value: string): number | null {
    const raw = value.replace(/!important/g, '').trim();
    const match = /^(\d*\.?\d+)%?$/.exec(raw);
    if (!match) return null;
    const parsed = Number.parseFloat(match[1] as string);
    return raw.endsWith('%') ? parsed / 100 : parsed;
}

/* ------------------------------ 现代语法 ------------------------------ */

/**
 * AC-16 / A10 的现代语法清单。**全部跨行安全**：
 * `hsl(` 与 `from` 之间可以换行（glass 目标 0，但同一正则要能在 shadlike 抓出 13 处）。
 */
export const MODERN_SYNTAX_PATTERNS: Record<string, RegExp> = {
    'hsl(from …)': /hsl\s*\(\s*from\b/g,
    'color(from …)': /color\s*\(\s*from\b/g,
    'cos()': /\bcos\s*\(/g,
    'sin()': /\bsin\s*\(/g,
    'tan()': /\btan\s*\(/g,
    'oklch()': /\boklch\s*\(/g,
    'will-change': /\bwill-change\s*:/g
};

export function countModernSyntax(css: string): Record<string, number> {
    const source = stripComments(css);
    const counts: Record<string, number> = {};
    for (const [label, pattern] of Object.entries(MODERN_SYNTAX_PATTERNS)) {
        counts[label] = (source.match(pattern) ?? []).length;
    }
    return counts;
}

/* ------------------------------ 断言辅助 ------------------------------ */

/** 格式化对比度，便于失败信息直接读出「实测 < 期望」。 */
export function formatRatio(value: number): string {
    return `${value.toFixed(2)}:1`;
}