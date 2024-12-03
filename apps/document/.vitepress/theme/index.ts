import DefaultTheme from 'vitepress/theme';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';
import { ElementPlusContainer as UIContainer } from '@vitepress-demo-preview/component';
import '@vitepress-demo-preview/component/bundle/style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('demo-preview', UIContainer);
        app.use(NueUI);
    }
};
