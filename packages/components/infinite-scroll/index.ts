import { withInstall } from '@nue-ui/utils';
import InfiniteScroll from './infinite-scroll.vue';
import type { InfiniteScrollPropsType, InfiniteScrollEmitsType } from './types';

export const NueInfiniteScroll = withInstall(InfiniteScroll);
export type { InfiniteScrollPropsType, InfiniteScrollEmitsType };
