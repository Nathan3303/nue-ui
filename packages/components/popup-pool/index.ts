import { withInstall } from '@nue-ui/utils';
import PopupPool from './popup-pool.vue';
import { usePopupPool } from './popup-pool';

export const NuePopupPool = withInstall(PopupPool);
export { usePopupPool };
