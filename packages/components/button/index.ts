import { withInstall } from "@nue-ui/utils";
import Button from "./button.vue";
import type { ButtonPropsType, ButtonEmitsType, ButtonSize } from "./types";

export const NueButton = withInstall(Button);
export type { ButtonPropsType, ButtonEmitsType, ButtonSize };
