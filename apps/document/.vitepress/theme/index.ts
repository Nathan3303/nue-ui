import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/style.css';
import NueUI from 'nue-ui';
import './main.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('demo-preview', ElementPlusContainer);
        app.use(NueUI);
    }
};
