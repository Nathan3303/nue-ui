/**
 * 文档站主题切换 · 唯一实现点（纯 JS，便于 Node 侧自证脚本直接 import）。
 *
 * 约束（Issue #83）：
 * - 两套主题都作用在 `:root` / `.nue-*`，**不可同时生效** ⇒ DOM 中同一时刻只允许一个主题 link；
 * - 首屏不得 FOUC ⇒ 由内联引导脚本在样式生效前写入选择（见 `createThemeBootScript`）；
 * - 样式来自主题包构建产物 ⇒ 由 `scripts/sync-themes.mjs` 把 `dist/` 整体复制到
 *   `public/themes/<slug>/`，运行时只引用 `/themes/<slug>/index.css`。
 */

/** 当前主题的存储键。 */
export const THEME_STORAGE_KEY = 'nue-doc-theme';
/** 主题 link 的唯一标记（切换时按此选择器清理，而不是靠 id 猜）。 */
export const THEME_LINK_SELECTOR = 'link[data-nue-theme-css]';
export const THEME_LINK_ID = 'nue-doc-theme-css';
export const THEME_OVERRIDES_ID = 'nue-doc-theme-overrides';
export const DEFAULT_THEME = 'shadlike';
export const THEMES = /** @type {const} */ (['shadlike', 'glass']);

/** 文档站运行时必须补的覆盖：把 NueUI 暗色开关与字体接到 VitePress 上。
 *  必须在主题 CSS **之后**注入（主题 CSS 定义 `:root{--nue-dark-switch:0}`）。 */
export const DOC_OVERRIDES_CSS =
    ':root{--nue-primary-font-family:var(--vp-font-family-base)}.dark:root{--nue-dark-switch:1}';

/**
 * @param {unknown} value
 * @returns {value is 'shadlike' | 'glass'}
 */
export function isDocTheme(value) {
    return value === 'shadlike' || value === 'glass';
}

/**
 * 主题 CSS 的公开路径（VitePress `base` 以 `/` 结尾）。
 * @param {'shadlike' | 'glass'} theme
 * @param {string} base
 */
export function themeHref(theme, base) {
    return `${base}themes/${theme}/index.css`;
}

/**
 * 读取已保存的主题（localStorage 不可用时回落到默认值）。
 * @param {Storage | null | undefined} storage
 */
export function readStoredTheme(storage) {
    try {
        const stored = storage?.getItem(THEME_STORAGE_KEY);
        if (isDocTheme(stored)) return stored;
    } catch {
        /* 隐私模式 / 禁用存储：落回默认主题 */
    }
    return DEFAULT_THEME;
}

/** @param {Document} doc */
function ensureOverrides(doc) {
    if (doc.getElementById(THEME_OVERRIDES_ID)) return;
    const style = doc.createElement('style');
    style.id = THEME_OVERRIDES_ID;
    style.textContent = DOC_OVERRIDES_CSS;
    doc.head.appendChild(style);
}

/**
 * 切到指定主题：**先移除所有主题 link，再插入唯一一条**。
 * @param {Document} doc
 * @param {'shadlike' | 'glass'} theme
 * @param {string} base
 */
export function applyThemeCss(doc, theme, base) {
    for (const stale of doc.querySelectorAll(THEME_LINK_SELECTOR)) stale.remove();

    const link = doc.createElement('link');
    link.id = THEME_LINK_ID;
    link.rel = 'stylesheet';
    link.href = themeHref(theme, base);
    link.setAttribute('data-nue-theme-css', theme);
    doc.head.appendChild(link);

    ensureOverrides(doc);
    doc.documentElement.setAttribute('data-nue-theme', theme);
    return link;
}

/**
 * 生成首屏内联脚本：在 `<head>` 解析阶段同步写好 link 与覆盖样式，
 * 浏览器首帧即等待该样式表，因此不会先闪 shadlike 再跳 glass。
 * @param {string} base
 */
export function createThemeBootScript(base) {
    const hrefPrefix = JSON.stringify(`${base}themes/`);
    const storageKey = JSON.stringify(THEME_STORAGE_KEY);
    const defaults = JSON.stringify(DEFAULT_THEME);
    const overrides = JSON.stringify(DOC_OVERRIDES_CSS);
    return `(function(){try{
var d=document,t=${defaults};
try{var s=localStorage.getItem(${storageKey});if(s==='shadlike'||s==='glass')t=s;}catch(e){}
var h=d.head||d.documentElement,want=${hrefPrefix}+t+'/index.css';
var cur=d.querySelectorAll(${JSON.stringify(THEME_LINK_SELECTOR)}),has=false;
for(var i=0;i<cur.length;i++){if(cur[i].getAttribute('href')===want){has=true;}else{cur[i].remove();}}
if(!has){
var l=d.createElement('link');l.id=${JSON.stringify(THEME_LINK_ID)};l.rel='stylesheet';
l.href=want;l.setAttribute('data-nue-theme-css',t);h.appendChild(l);
}
if(!d.getElementById(${JSON.stringify(THEME_OVERRIDES_ID)})){
var o=d.createElement('style');o.id=${JSON.stringify(THEME_OVERRIDES_ID)};o.textContent=${overrides};h.appendChild(o);
}
d.documentElement.setAttribute('data-nue-theme',t);
}catch(e){}})();`;
}