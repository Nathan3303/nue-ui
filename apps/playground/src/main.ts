import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';

createApp(App).use(NueUI).use(router).mount('#app');
