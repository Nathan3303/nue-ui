import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../../shadlike/index.ts';
import '@nue-ui/assets/';

createApp(App).use(router).mount('#app');
