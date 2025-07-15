import DefaultTheme from 'vitepress/theme';
import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/bundle/style.css';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';
import './main.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(NueUI);
        app.component('demo-preview', ElementPlusContainer);
    }
};
