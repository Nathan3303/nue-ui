import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@nue-ui/assets/';
import 'nue-ui-theme-shadlike/dist/all.css';

createApp(App).use(router).mount('#app');
