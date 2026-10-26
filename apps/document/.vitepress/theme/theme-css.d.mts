/** `theme-css.mjs` 的类型声明（实现是纯 JS，供 Node 自证脚本与浏览器共用）。 */
export type DocTheme = 'shadlike' | 'glass';

export const THEME_STORAGE_KEY: string;
export const THEME_LINK_SELECTOR: string;
export const THEME_LINK_ID: string;
export const THEME_OVERRIDES_ID: string;
export const DEFAULT_THEME: DocTheme;
export const THEMES: readonly DocTheme[];
export const DOC_OVERRIDES_CSS: string;

export function isDocTheme(value: unknown): value is DocTheme;
export function themeHref(theme: DocTheme, base: string): string;
export function readStoredTheme(storage: Storage | null | undefined): DocTheme;
export function applyThemeCss(doc: Document, theme: DocTheme, base: string): HTMLLinkElement;
export function createThemeBootScript(base: string): string;