import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'nue-ui-theme-shadlike/dist/all.css';
import 'nue-ui-iconfont/dist/index.css';

createApp(App).use(router).mount('#app');
