import DefaultTheme from "vitepress/theme";
import nueui from "nue-ui";
import "nue-ui/dist/index.css";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(nueui);
    },
};
