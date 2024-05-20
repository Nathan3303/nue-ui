import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import NueUI from "../../core/index";

createApp(App).use(NueUI).use(router).mount("#app");
