import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import NueUI from 'nue-ui';
// import 'nue-ui/dist/index.css';
import '@nue-ui/theme/index.css';

createApp(App).use(router).mount('#app');
