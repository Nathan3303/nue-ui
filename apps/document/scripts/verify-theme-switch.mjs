/**
 * 文档站主题切换自证（Issue #83 AC-03）。
 *
 * 断言三件事：
 * 1. 首屏引导脚本只写一条主题 link，href 指向 `/themes/<slug>/index.css`；
 * 2. 引导脚本恢复已保存的选择（glass）而不是默认 shadlike；
 * 3. 连续切换多次后，DOM 中主题 link **始终恰好 1 条**，且指向最后选择的主题。
 *
 * 以及与构建产物的绑定：public/themes/<slug>/index.css 必须存在，且其相对 @import 均可解析。
 *
 * 运行：`node apps/document/scripts/verify-theme-switch.mjs`
 */
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import {
    THEME_LINK_SELECTOR,
    THEME_STORAGE_KEY,
    applyThemeCss,
    createThemeBootScript,
    themeHref
} from '../.vitepress/theme/theme-css.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, '..');
const base = '/nue-ui/';
const boot = createThemeBootScript(base);

let failures = 0;
/** @param {boolean} ok @param {string} label @param {string} [detail] */
function check(ok, label, detail = '') {
    if (!ok) failures += 1;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  — ${detail}` : ''}`);
}

function freshDom() {
    return new JSDOM('<!doctype html><html><head></head><body></body></html>', {
        url: `http://localhost${base}`,
        runScripts: 'outside-only'
    });
}

const links = dom => [...dom.window.document.querySelectorAll(THEME_LINK_SELECTOR)];

// 1. 默认（无存储）：只有一条 shadlike link
{
    const dom = freshDom();
    dom.window.eval(boot);
    const found = links(dom);
    check(found.length === 1, '默认首屏：主题 link 恰好 1 条', `实际 ${found.length} 条`);
    check(
        found[0]?.getAttribute('href') === themeHref('shadlike', base),
        '默认首屏：href 指向构建产物 shadlike',
        found[0]?.getAttribute('href')
    );
    check(
        dom.window.document.documentElement.getAttribute('data-nue-theme') === 'shadlike',
        '默认首屏：html[data-nue-theme]=shadlike'
    );
}

// 2. 已保存 glass：首屏直接是 glass（无 FOUC 的前提）
{
    const dom = freshDom();
    dom.window.localStorage.setItem(THEME_STORAGE_KEY, 'glass');
    dom.window.eval(boot);
    const found = links(dom);
    check(found.length === 1, '恢复首屏：主题 link 恰好 1 条', `实际 ${found.length} 条`);
    check(
        found[0]?.getAttribute('href') === themeHref('glass', base),
        '恢复首屏：href 指向 glass',
        found[0]?.getAttribute('href')
    );
    check(
        dom.window.document.documentElement.getAttribute('data-nue-theme') === 'glass',
        '恢复首屏：html[data-nue-theme]=glass'
    );
}

// 3. 运行时连续切换：始终只有一条 link
{
    const dom = freshDom();
    dom.window.eval(boot);
    const doc = dom.window.document;
    const sequence = ['glass', 'shadlike', 'glass', 'glass', 'shadlike'];
    let maxLinks = 0;
    for (const theme of sequence) {
        applyThemeCss(doc, theme, base);
        maxLinks = Math.max(maxLinks, links(dom).length);
        const current = links(dom);
        if (current.length !== 1 || current[0].getAttribute('href') !== themeHref(theme, base)) {
            check(false, `切换序列中断于 ${theme}`, `links=${current.length}`);
            break;
        }
    }
    check(maxLinks === 1, '切换 N 次：主题 link 峰值 = 1', `峰值 ${maxLinks}`);
    check(
        links(dom).length === 1 &&
            links(dom)[0].getAttribute('href') === themeHref('shadlike', base),
        '切换结束：只剩最后选择的主题 link',
        links(dom)[0]?.getAttribute('href')
    );
    check(
        doc.documentElement.getAttribute('data-nue-theme') === 'shadlike',
        '切换结束：html[data-nue-theme] 同步'
    );
    const overrides = doc.getElementById('nue-doc-theme-overrides');
    check(overrides !== null, '覆盖样式随 link 一并注入（--nue-dark-switch / 字体）');
}

// 3b. 引导脚本幂等：dev 下 head 由客户端补注入，脚本可能执行两次
{
    const dom = freshDom();
    dom.window.eval(boot);
    dom.window.eval(boot);
    check(
        links(dom).length === 1,
        '引导脚本执行两次：主题 link 仍为 1 条',
        `实际 ${links(dom).length} 条`
    );
    check(
        dom.window.document.querySelectorAll('#nue-doc-theme-overrides').length === 1,
        '引导脚本执行两次：覆盖样式仍为 1 份'
    );
}

// 4. 与构建产物绑定：public/themes/*/index.css 存在且 @import 可解析
for (const theme of ['shadlike', 'glass']) {
    const entry = resolve(appRoot, 'public/themes', theme, 'index.css');
    let css = '';
    try {
        css = await readFile(entry, 'utf8');
    } catch {
        check(false, `构建产物缺失：public/themes/${theme}/index.css`);
        continue;
    }
    const imports = [...css.matchAll(/@import\s+['"]([^'"]+)['"]/g)].map(match => match[1]);
    let missing = [];
    for (const specifier of imports) {
        const target = resolve(dirname(entry), specifier);
        try {
            await stat(target);
        } catch {
            missing.push(specifier);
        }
    }
    check(
        imports.length > 0 && missing.length === 0,
        `产物接线：${theme} 的 @import 全部可解析`,
        `共 ${imports.length} 条`
    );
}

if (failures > 0) {
    // 用异常而非 process.exit：仓库 lint 未声明 node globals（不为此改根配置）
    throw new Error(`主题切换自证失败：${failures} 项`);
}
console.log('\n主题切换自证通过：DOM 中始终只有一个主题 link，且样式来自构建产物。');