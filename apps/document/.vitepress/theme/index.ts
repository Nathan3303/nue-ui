import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import NueUI from 'nue-ui';
import type { App } from 'vue';

import '@vitepress-demo-preview/component/style.css';
import 'nue-ui-iconfont/dist/iconfont.css';
import 'nue-ui-theme-shadlike/dist/index.css';
import './main.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: { app: App }) {
        app.component('demo-preview', ElementPlusContainer);
        app.use(NueUI);
    }
};
