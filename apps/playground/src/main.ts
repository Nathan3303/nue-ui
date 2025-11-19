import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@nue-ui/themes/iconfont/src/iconfont.css';
import '@nue-ui/themes/shadlike/src/index.css';

createApp(App).use(router).mount('#app');
