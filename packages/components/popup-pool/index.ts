import { withInstall } from '@nue-ui/utils';
import PopupPool from './popup-pool.vue';
import { usePopupPool, createPopupPool, getPopupPool } from './popup-pool';
import type { NuePopupPoolMethods } from './types';

export const NuePopupPool = withInstall(PopupPool);
export { usePopupPool, createPopupPool, getPopupPool };
export type { NuePopupPoolMethods };
