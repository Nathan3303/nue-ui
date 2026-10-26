import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@nue-ui/themes/iconfont/src/iconfont.css';
// 主题二选一：playground 现引用 glass 主题（AC-11）
// import '@nue-ui/themes/shadlike/src/index.css';
import '@nue-ui/themes/glass/src/index.css';
// 演示站外壳：外壳锁 100vh，滚动落在 content / aside 内部（0.2.2 滚动契约）
import './playground.css';

createApp(App).use(router).mount('#app');