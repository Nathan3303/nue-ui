import { withInstall } from "@nue-ui/utils";
import Button from "./button.vue";
import type { ButtonPropsType, ButtonEmitsType } from "./types";

export const NueButton = withInstall(Button);
export type { ButtonPropsType, ButtonEmitsType };
