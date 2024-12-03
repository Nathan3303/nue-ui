import { withInstall } from '@nue-ui/utils';
import PopupWrapper from './popup-wrapper.vue';
import {
    usePopupWrapper,
    createPopupWrapper,
    getPopupWrapper
} from './popup-wrapper';
import type { popupWrapperFunctions } from './types';

export const NuePopupWrapper = withInstall(PopupWrapper);
export { usePopupWrapper, createPopupWrapper, getPopupWrapper };
export type { popupWrapperFunctions };
