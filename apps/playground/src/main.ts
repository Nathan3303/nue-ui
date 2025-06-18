import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@nue-ui/theme/shadlike';

createApp(App).use(router).mount('#app');
