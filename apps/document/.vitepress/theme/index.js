import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import NueUI from 'nue-ui';
import Layout from './Layout.vue';

import '@vitepress-demo-preview/component/dist/style.css';
import 'nue-ui-iconfont/dist/iconfont.css';

// 主题 CSS **不走打包导入**（Issue #83）：两套主题都作用在 :root / .nue-*，同时存在会互相覆盖，
// 而打包进 bundle 的 CSS 运行时无法单独移除。改为运行时 <link>：
// - 首屏：.vitepress/config.mts 的内联引导脚本按 localStorage 写入唯一一条 link（无 FOUC）
// - 切换：ThemeSwitch.vue → applyThemeCss()（先移除旧 link，再插入新 link）
// 两份 CSS 由 scripts/sync-themes.mjs 从主题包 dist/ 复制到 public/themes/<slug>/。
//
// 本文件刻意保持 JS（而非 .ts）：它只做资源装配，全部符号由 Vite 解析（.vue / 包内 CSS），
// 而仓库 lint 的独立 TS 检查器没有这些模块声明。

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.component('demo-preview', ElementPlusContainer);
        app.use(NueUI);
    }
};