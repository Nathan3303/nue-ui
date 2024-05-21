import Header from "./header.vue";
import Container from "./container.vue";
import Main from "./main.vue";
import Footer from "./footer.vue";
import { withInstall } from "@nue-ui/utils";
import type {
    ContainerPropsType,
    HeaderPropsType,
    MainPropsType,
} from "./types";

export const NueHeader = withInstall(Header);
export const NueContainer = withInstall(Container);
export const NueMain = withInstall(Main);
export const NueFooter = withInstall(Footer);
export type { ContainerPropsType, HeaderPropsType, MainPropsType };
