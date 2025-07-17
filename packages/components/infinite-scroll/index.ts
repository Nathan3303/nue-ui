import { withInstall } from '@nue-ui/utils';
import InfiniteScroll from './infinite-scroll.vue';
import type { NueInfiniteScrollProps, NueInfiniteScrollEmits } from './types';

export const NueInfiniteScroll = withInstall(InfiniteScroll);
export type { NueInfiniteScrollProps, NueInfiniteScrollEmits };
