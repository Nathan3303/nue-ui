import { withInstall } from '@nue-ui/utils';
import Container from './container.vue';
import Header from './header.vue';
import Main from './main.vue';
import Aside from './aside.vue';
import Separator from './separator.vue';
import Content from './content.vue';
import Footer from './footer.vue';

export const NueContainer = withInstall(Container);
export const NueHeader = withInstall(Header);
export const NueMain = withInstall(Main);
export const NueAside = withInstall(Aside);
export const NueSeparator = withInstall(Separator);
export const NueContent = withInstall(Content);
export const NueFooter = withInstall(Footer);
export type * from './types';
