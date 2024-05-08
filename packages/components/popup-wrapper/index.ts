import PopupWrapper from "./src/popup-wrapper.vue";
import { usePopupWrapper, createPopupWrapper } from "./src/popup-wrapper";
import type { popupWrapperFunctions } from "./src/popup-wrapper";
import { withInstall } from "@nue-ui/utils";

export const NuePopupWrapper = withInstall(PopupWrapper);
export { usePopupWrapper, createPopupWrapper };
export type { popupWrapperFunctions };
