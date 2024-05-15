import Header from "./src/header.vue";
import Container from "./src/container.vue";
import Main from "./src/main.vue";
import Footer from "./src/footer.vue";
import { withInstall } from "@nue-ui/utils";

export const NueHeader = withInstall(Header);
export const NueContainer = withInstall(Container);
export const NueMain = withInstall(Main);
export const NueFooter = withInstall(Footer);
