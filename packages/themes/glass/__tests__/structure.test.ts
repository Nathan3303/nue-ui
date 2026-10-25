/**
 * Glass 主题门禁 · 结构断言（AC-05 / AC-10 / AC-12 / AC-13 / AC-15）。
 *
 * 与 `contrast.test.ts` 的分工：
 * - 对比度 / A1–A11 在 `contrast.test.ts`；
 * - 本文件只锁**结构数字**：7 条 `backdrop-filter`、424 个 `--nue-*` 定义名、
 *   0 悬空、34 个组件 import、6 个 `--nue-glass-*` 基元、dist 体积与文件数。
 *
 * 所有数字来自实读源码 / `dist`，不写死 rd-fe 的快照；`418` 这个基线也从
 * shadlike 源码现算（AC-12 要求 glass ⊇ shadlike），只有 424 / 7 / 41 等
 * **契约常量**才写死。
 */
import { describe, expect, it } from 'vite-plus/test';
import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import {
    GLASS_DIST,
    GLASS_SRC,
    SHADLIKE_SRC,
    collectDefinitions,
    collectReferences,
    ensureDistBuilt,
    extractBlocks,
    extractRules,
    listCssFiles,
    parseDeclarations,
    readAllCss,
    readCss,
    splitSelectorList,
    stripComments
} from './css-helpers';

const GLASS_PRIMITIVES = [
    '--nue-glass-bg',
    '--nue-glass-blur',
    '--nue-glass-border',
    '--nue-glass-scrim',
    '--nue-glass-shadow',
    '--nue-glass-solid'
] as const;

const compareText = (a: string | undefined, b: string | undefined) =>
    (a ?? '').localeCompare(b ?? '');

ensureDistBuilt();

const glassFiles = readAllCss(GLASS_SRC);
const shadlikeFiles = readAllCss(SHADLIKE_SRC);

const glassCss = [...glassFiles.values()].join('\n');
const shadlikeCss = [...shadlikeFiles.values()].join('\n');

const glassDefinitions = new Set(collectDefinitions(glassCss));
const shadlikeDefinitions = new Set(collectDefinitions(shadlikeCss));

const distFiles = listCssFiles(GLASS_DIST).map(path => ({
    path,
    name: relative(GLASS_DIST, path),
    size: readFileSync(path).length,
    css: readFileSync(path, 'utf8')
}));
const distTotal = distFiles.reduce((sum, file) => sum + file.size, 0);
const distGzip = gzipSync(
    Buffer.concat(
        [...distFiles]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(file => readFileSync(file.path))
    ),
    { level: 9 }
).length;
const distMax = Math.max(...distFiles.map(file => file.size));

/* ------------------------------ AC-05 / AC-13 ------------------------------ */

describe('AC-05 / AC-13 模糊入口结构（7 条声明，overlay/popup-pool/select/date-picker 各 0）', () => {
    const EXPECTED = [
        '.nue-dialog',
        '.nue-drawer',
        '.nue-dropdown',
        '.nue-tooltip',
        '.nue-message-node-inner',
        '.nue-confirm',
        '.nue-prompt'
    ] as const;

    const declarationsOf = (css: string) =>
        extractRules(css)
            .flatMap(rule =>
                parseDeclarations(rule.body).map(declaration => ({
                    selector: rule.selector,
                    ...declaration
                }))
            )
            .filter(declaration => declaration.prop === 'backdrop-filter');

    it('src：backdrop-filter 声明恰好 7 条，且落在 7 个类名上', () => {
        const declarations = declarationsOf(glassCss);
        expect(declarations.length, 'src backdrop-filter 声明数').toBe(7);
        expect(
            declarations.map(declaration => declaration.selector).sort(),
            '7 个承载类名'
        ).toEqual([...EXPECTED].sort());
        for (const declaration of declarations) {
            expect(declaration.value, `${declaration.selector} 的值`).toBe('var(--nue-glass-blur)');
        }
    });

    it('dist：backdrop-filter 声明恰好 7 条（`@supports not (...)` 条件不计）', () => {
        const declarations = distFiles.flatMap(file =>
            declarationsOf(file.css).map(declaration => ({
                file: file.name,
                ...declaration
            }))
        );
        expect(declarations.length, 'dist backdrop-filter 声明数').toBe(7);
        for (const declaration of declarations) {
            expect(declaration.value, `${declaration.file} ${declaration.selector}`).toBe(
                'var(--nue-glass-blur)'
            );
        }
        // `@supports not (backdrop-filter: blur(1px))` 只出现在 variables.css 的条件里，
        // 不是声明；若解析器误把条件当声明，这里会变成 8。
        const supportsCondition = /@supports\s+not\s*\(\s*backdrop-filter/;
        expect(
            supportsCondition.test(readCss(GLASS_SRC, 'global/variables.css')),
            '退化条件必须保留'
        ).toBe(true);
    });

    it('overlay / popup-pool / select / date-picker 的 backdrop-filter = 0', () => {
        for (const name of ['overlay', 'popup-pool', 'select', 'date-picker']) {
            const declarations = declarationsOf(readCss(GLASS_SRC, `components/${name}.css`));
            expect(
                declarations.map(declaration => declaration.selector),
                `${name}.css 不应有 backdrop-filter`
            ).toEqual([]);
            const distCss = distFiles.find(file => file.name === `components/${name}.css`);
            expect(distCss, `dist/components/${name}.css 必须存在`).toBeDefined();
            expect(
                declarationsOf(distCss!.css).length,
                `dist/components/${name}.css 不应有 backdrop-filter`
            ).toBe(0);
        }
    });

    it('模糊参数上限：blur ≤24px、saturate ≤200%', () => {
        const blur = glassDefinitions.has('--nue-glass-blur')
            ? readCss(GLASS_SRC, 'global/variables.css').match(
                  /--nue-glass-blur\s*:\s*([^;]+)/
              )?.[1]
            : undefined;
        const radius = /blur\(\s*(\d+(?:\.\d+)?)px\s*\)/.exec(blur ?? '');
        const saturation = /saturate\(\s*(\d+(?:\.\d+)?)%\s*\)/.exec(blur ?? '');
        expect(radius, '--nue-glass-blur 必须含 blur(Npx)').not.toBeNull();
        expect(saturation, '--nue-glass-blur 必须含 saturate(N%)').not.toBeNull();
        expect(Number(radius?.[1]), 'blur 上限 24px').toBeLessThanOrEqual(24);
        expect(Number(saturation?.[1]), 'saturate 上限 200%').toBeLessThanOrEqual(200);
    });
});

/* ------------------------------ AC-10 / AC-12 ------------------------------ */

describe('AC-10 / AC-12 变量契约（424 定义名、⊇418、0 悬空、6 个 glass 基元）', () => {
    it('全 src 定义名 = 424（= shadlike 418 + 6 个 glass 基元）', () => {
        expect(glassDefinitions.size, 'glass 定义名总数').toBe(424);
        expect(shadlikeDefinitions.size, 'shadlike 基线定义名（现算）').toBe(418);
    });

    it('glass 定义名 ⊇ shadlike 418（改名 / 删名即红）', () => {
        const missing = [...shadlikeDefinitions].filter(name => !glassDefinitions.has(name));
        expect(missing.sort(), 'glass 缺少的 shadlike 定义名').toEqual([]);
    });

    it('glass 比 shadlike 多出的名字恰好是 6 个 --nue-glass-* 基元', () => {
        const extra = [...glassDefinitions].filter(name => !shadlikeDefinitions.has(name)).sort();
        expect(extra).toEqual([...GLASS_PRIMITIVES].sort());
    });

    it('引用未定义 = 0（shadlike 的 --nue-hsl-90 / --nue-text-font-style 不得继承）', () => {
        const dangling = collectReferences(glassCss).filter(name => !glassDefinitions.has(name));
        expect(dangling.sort(), '引用但未定义').toEqual([]);
        // 反向自证：同一套检查在 shadlike 上确实能抓到 2 个悬空（防「0 悬空」假绿灯）。
        const shadlikeDangling = collectReferences(shadlikeCss).filter(
            name => !shadlikeDefinitions.has(name)
        );
        expect(
            shadlikeDangling.length,
            'shadlike 的悬空引用（>0 才能证明本检查有效）'
        ).toBeGreaterThan(0);
    });

    it('主门禁：global/variables.css 定义名 = 149（143 + 6），新增名仅 --nue-glass-*', () => {
        const glassGlobal = new Set(collectDefinitions(readCss(GLASS_SRC, 'global/variables.css')));
        const shadlikeGlobal = new Set(
            collectDefinitions(readCss(SHADLIKE_SRC, 'global/variables.css'))
        );
        expect(glassGlobal.size, 'glass 全局定义名').toBe(149);
        expect(shadlikeGlobal.size, 'shadlike 全局定义名').toBe(143);
        const missing = [...shadlikeGlobal].filter(name => !glassGlobal.has(name));
        expect(missing, '全局层缺失名').toEqual([]);
        const extra = [...glassGlobal].filter(name => !shadlikeGlobal.has(name)).sort();
        expect(extra, '全局层新增名必须是 6 个 glass 基元').toEqual([...GLASS_PRIMITIVES].sort());
    });

    it('组件层：每个文件的定义名 ⊆ shadlike 同文件 ∪ 6 个 glass 基元', () => {
        const problems: string[] = [];
        for (const [file, css] of glassFiles) {
            if (file.startsWith('global/') || file === 'index.css' || file.endsWith('index.css')) {
                continue;
            }
            const base = new Set(collectDefinitions(shadlikeFiles.get(file) ?? ''));
            for (const name of collectDefinitions(css)) {
                if (base.has(name)) continue;
                if ((GLASS_PRIMITIVES as readonly string[]).includes(name)) continue;
                problems.push(`${file}: ${name}`);
            }
        }
        expect(problems.sort(), '组件层改名 / 发明非 glass 名').toEqual([]);
    });

    it('组件层出现的 --nue-glass-* 必须在 6 个基元白名单内（不得发明第 7 个）', () => {
        const problems: string[] = [];
        for (const [file, css] of glassFiles) {
            if (file.startsWith('global/')) continue;
            for (const name of collectDefinitions(css)) {
                if (!name.startsWith('--nue-glass-')) continue;
                if ((GLASS_PRIMITIVES as readonly string[]).includes(name)) continue;
                problems.push(`${file}: ${name}`);
            }
        }
        expect(problems.sort(), '组件层发明的 glass 变量').toEqual([]);
    });

    it('--nue-glass-* 全量只有 6 个（AC-10 前缀白名单）', () => {
        const glassNames = [...glassDefinitions].filter(name => name.startsWith('--nue-glass-'));
        expect(glassNames.sort()).toEqual([...GLASS_PRIMITIVES].sort());
    });
});

/* ------------------------------ 退化结构 ------------------------------ */

describe('退化的结构口径（3 块 × 3 条，且位于基值之后）', () => {
    const source = stripComments(readCss(GLASS_SRC, 'global/variables.css'));
    const blocks = extractBlocks(source);
    const matchers = [
        /@supports\s+not\s*\(\s*backdrop-filter\s*:/,
        /@media\s*\(\s*prefers-reduced-transparency\s*:\s*reduce\s*\)/,
        /@media\s*\(\s*prefers-contrast\s*:\s*more\s*\)/
    ];

    it('三条退化块各 1 个，每块 :root 覆写 3 条，合计 9 条', () => {
        let total = 0;
        for (const matcher of matchers) {
            const matches = blocks.filter(block => matcher.test(block.prelude.trim()));
            expect(matches.length, `${matcher} 块数`).toBe(1);
            const root = extractBlocks(stripComments(matches[0]!.body)).find(
                inner => inner.prelude.trim() === ':root'
            );
            expect(root, `${matcher} 缺 :root`).toBeDefined();
            const declarations = parseDeclarations(root!.body);
            expect(declarations.length, `${matcher} 覆写条数`).toBe(3);
            total += declarations.length;
        }
        expect(total, '三块合计覆写').toBe(9);
    });

    it('三条退化块的位置都在基值定义之后（同 specificity 靠后者赢）', () => {
        const lastBase = Math.max(
            ...['--nue-glass-blur:', '--nue-glass-bg:', '--nue-glass-border:'].map(prop =>
                source.indexOf(prop)
            )
        );
        expect(lastBase, '基值必须存在').toBeGreaterThanOrEqual(0);
        for (const matcher of matchers) {
            const block = blocks.find(candidate => matcher.test(candidate.prelude.trim()));
            expect(block!.start, `${matcher} 位置`).toBeGreaterThan(lastBase);
        }
    });

    it('退化块的值：none / var(--nue-glass-solid) / var(--nue-border-color)', () => {
        for (const matcher of matchers) {
            const block = blocks.find(candidate => matcher.test(candidate.prelude.trim()))!;
            const root = extractBlocks(stripComments(block.body)).find(
                inner => inner.prelude.trim() === ':root'
            )!;
            const values = new Map(
                parseDeclarations(root.body).map(declaration => [
                    declaration.prop,
                    declaration.value
                ])
            );
            expect(values.get('--nue-glass-blur')).toBe('none');
            expect(values.get('--nue-glass-bg')).toBe('var(--nue-glass-solid)');
            expect(values.get('--nue-glass-border')).toBe('var(--nue-border-color)');
        }
    });
});

/* ------------------------------ 接线 / 文件树 ------------------------------ */

describe('文件树与 import 接线（34 个组件 import、41 个 CSS 文件）', () => {
    it('components/index.css 恰好 34 条 @import，且每条都能解析到文件', () => {
        const indexCss = readCss(GLASS_SRC, 'components/index.css');
        const imports = [...indexCss.matchAll(/@import\s+['"]\.\/([^'"]+)['"]/g)].map(
            match => match[1]
        );
        expect(imports.length, 'components @import 数').toBe(34);

        const componentFiles = listCssFiles(resolve(GLASS_SRC, 'components'))
            .map(path => relative(resolve(GLASS_SRC, 'components'), path))
            .filter(file => file !== 'index.css')
            .sort();
        expect(componentFiles.length, 'src/components/*.css（不含 index）').toBe(34);
        expect(
            imports.map(file => file?.replace(/\.css$/, '')).sort(compareText),
            'import 清单应与 34 个组件文件一一对应'
        ).toEqual(componentFiles.map(file => file.replace(/\.css$/, '')).sort());
    });

    it('src 全量 41 个 CSS 文件（1 根 + 2 层 index + 4 global + 34 组件）', () => {
        expect(glassFiles.size, 'src CSS 文件数').toBe(41);
        const expected =
            1 + // index.css
            1 + // components/index.css
            1 + // global/index.css
            4 + // variables / html-reset / scrollbar / animations
            34; // 组件
        expect(expected).toBe(41);
        expect(
            [...glassFiles.keys()].filter(file => file.startsWith('global/')).length,
            'global 目录文件数'
        ).toBe(5);
    });

    it('dist 文件数 = 41，且目录结构与 src 同构', () => {
        expect(distFiles.length, 'dist CSS 文件数').toBe(41);
        expect(distFiles.map(file => file.name).sort()).toEqual([...glassFiles.keys()].sort());
    });
});

/* ------------------------------ AC-15 体积 ------------------------------ */

describe('AC-15 dist 体积（≤125,000 B / gzip ≤16,000 B / 单文件 ≤10,000 B / 41 文件）', () => {
    it('dist 总字节 ≤ 125,000', () => {
        expect(distTotal, `dist 总量 ${distTotal} B`).toBeLessThanOrEqual(125_000);
    });

    it('全量拼接 gzip -9 ≤ 16,000', () => {
        expect(distGzip, `gzip ${distGzip} B`).toBeLessThanOrEqual(16_000);
    });

    it('单文件最大 ≤ 10,000 B', () => {
        const largest = distFiles.reduce((max, file) => (file.size > max.size ? file : max));
        expect(largest.size, `最大文件 ${largest.name} = ${largest.size} B`).toBeLessThanOrEqual(
            10_000
        );
        expect(distMax).toBeLessThanOrEqual(10_000);
    });

    it('dist/index.css 保留 @import（消费方按文件树加载，未内联）', () => {
        const indexCss = distFiles.find(file => file.name === 'index.css');
        expect(indexCss, 'dist/index.css 必须存在').toBeDefined();
        expect(indexCss!.css).toContain('@import');
        expect(indexCss!.size, 'dist/index.css 体积（同 shadlike 的 62 B 量级）').toBeLessThan(200);
    });
});

/* ------------------------------ 嵌套覆盖（AC-13 的 4 条） ------------------------------ */

describe('AC-13 同链 ≤1：dialog / drawer / confirm / prompt 各 1 条后代覆盖', () => {
    it('4 条覆盖规则各自把 blur 置 none、bg 置 solid', () => {
        const parents = ['.nue-dialog', '.nue-drawer', '.nue-confirm', '.nue-prompt'];
        const found: string[] = [];
        for (const [file, css] of glassFiles) {
            if (!file.startsWith('components/')) continue;
            for (const rule of extractRules(css)) {
                const selectors = splitSelectorList(rule.selector);
                const parent = parents.find(candidate =>
                    selectors.includes(`${candidate} .nue-dropdown`)
                );
                if (!parent) continue;
                const declarations = new Map(
                    parseDeclarations(rule.body)
                        .filter(declaration => declaration.prop.startsWith('--'))
                        .map(declaration => [declaration.prop, declaration.value])
                );
                expect(selectors, `${file} ${parent}`).toContain(`${parent} .nue-tooltip`);
                expect(declarations.get('--nue-glass-blur'), `${file} ${parent} blur`).toBe('none');
                expect(declarations.get('--nue-glass-bg'), `${file} ${parent} bg`).toBe(
                    'var(--nue-glass-solid)'
                );
                found.push(parent);
            }
        }
        expect(found.sort(), '嵌套覆盖规则').toEqual([...parents].sort());
    });
});

/* ------------------------------ 自证：解析器不是空转 ------------------------------ */

describe('结构断言自证（防止解析器空转导致假绿）', () => {
    it('解析器自证：variables.css 读出 149 个定义名；select.css 为无局部变量的薄封装', () => {
        expect(shadlikeDefinitions.size).toBe(418);
        expect(
            collectDefinitions(readCss(GLASS_SRC, 'global/variables.css')).length,
            'variables.css 定义名'
        ).toBe(149);
        expect(
            collectDefinitions(readCss(GLASS_SRC, 'components/select.css')),
            'select.css 不定义局部变量（浮层由 dropdown.css 承担）'
        ).toEqual([]);
    });
});