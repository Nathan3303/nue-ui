import DefaultTheme from "vitepress/theme";
import nueui from "nue-ui";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(nueui);
    },
};
