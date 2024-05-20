import DefaultTheme from "vitepress/theme";
import nueui from "../../../core/index";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) { app.use(nueui) },
};
